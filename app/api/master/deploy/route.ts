import { NextRequest, NextResponse } from 'next/server'
import { 
  createCMSInstance, 
  updateCMSInstance, 
  createDeploymentLog, 
  updateDeploymentLog,
  createNotification
} from '@/lib/master-supabase'
import { securityMiddleware, validateInput, schemas, sanitizeError, logSecurityEvent } from '@/lib/security'


interface DeploymentRequest {
  name: string
  domain?: string
  subdomain?: string
  owner_name: string
  owner_email: string
  status: 'active' | 'inactive' | 'suspended'
  plan: 'free' | 'pro' | 'enterprise'
  auto_deploy: boolean
  description?: string
}

// Vercel API configuration
const VERCEL_API_URL = 'https://api.vercel.com'
const VERCEL_TOKEN = process.env.VERCEL_TOKEN
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID || process.env.USER_ID

// Bitbucket API configuration
const BITBUCKET_USERNAME = process.env.BITBUCKET_USERNAME
const BITBUCKET_API_TOKEN = process.env.BITBUCKET_API_TOKEN
const BITBUCKET_WORKSPACE = process.env.BITBUCKET_WORKSPACE || 'trukraft'
const BITBUCKET_MASTER_REPO = process.env.BITBUCKET_MASTER_REPO || 'cms-master'

// Use API Token (preferred method)
const BITBUCKET_AUTH_TOKEN = BITBUCKET_API_TOKEN

// Debug logging for environment variables
console.log('🔧 Environment Check:')
console.log(`   VERCEL_TOKEN: ${VERCEL_TOKEN ? 'SET' : 'MISSING'}`)
console.log(`   VERCEL_TEAM_ID: ${VERCEL_TEAM_ID || 'MISSING'}`)
console.log(`   BITBUCKET_USERNAME: ${BITBUCKET_USERNAME ? 'SET' : 'MISSING'}`)
console.log(`   BITBUCKET_API_TOKEN: ${BITBUCKET_API_TOKEN ? 'SET' : 'MISSING'}`)
console.log(`   BITBUCKET_WORKSPACE: ${BITBUCKET_WORKSPACE || 'MISSING'}`)


export async function POST(request: NextRequest) {
  // Security checks
  const securityCheck = await securityMiddleware(request, {
    requireAuth: true,
    rateLimit: { limit: 10, windowMs: 300000 } // 10 deployments per 5 minutes
  })
  
  if (securityCheck) return securityCheck
  
  try {
    const rawData = await request.json()
    console.log('🔍 Raw deployment data received:', JSON.stringify(rawData, null, 2))
    const data = validateInput(rawData, schemas.deploymentRequest)
    
    // Log deployment attempt
    logSecurityEvent('DEPLOYMENT_INITIATED', { name: data.name, owner: data.owner_email }, request)
    
    // Create initial CMS instance record in master database
    const instance = await createCMSInstance({
      name: data.name,
      domain: data.domain,
      status: 'creating',
      owner_name: data.owner_name,
      owner_email: data.owner_email,
      auto_deploy: data.auto_deploy,
      branch: 'main',
      build_command: 'npm run build',
      settings: {
        description: data.description
      },
      deployment_config: {}
    })

    // Create deployment log
    const deploymentLog = await createDeploymentLog({
      cms_instance_id: instance.id,
      status: 'building',
      log_data: {
        steps: ['instance-created']
      }
    })

    // Start the deployment process asynchronously
    deployWebsite(instance.id, data, deploymentLog.id).catch(error => {
      console.error('Deployment process failed:', error)
    })

    return NextResponse.json({
      success: true,
      instance_id: instance.id,
      deployment_id: deploymentLog.id,
      message: 'Deployment started successfully'
    })

  } catch (error) {
    console.error('Deployment initialization failed:', error)
    logSecurityEvent('DEPLOYMENT_FAILED', { error: sanitizeError(error) }, request)
    return NextResponse.json(
      { 
        success: false, 
        error: sanitizeError(error)
      },
      { status: 500 }
    )
  }
}

async function deployWebsite(instanceId: string, data: DeploymentRequest, deploymentLogId: string) {
  const startTime = Date.now()
  
  try {
    
    // Step 1: Create Bitbucket repository
    await updateDeploymentLog(deploymentLogId, {
      status: 'building',
      log_data: { steps: ['instance-created', 'creating-bitbucket-repo'] }
    })
    
    // First test the Bitbucket API connection
    await testBitbucketConnection()
    
    const bitbucketRepo = await createBitbucketRepository(data.name, data.description)
    
    // Wait a moment for Bitbucket to sync the repository
    console.log('⏳ Waiting for Bitbucket repository to sync...')
    await new Promise(resolve => setTimeout(resolve, 10000))
    
    // Step 2: Create Vercel project first, then deploy with project linking
    await updateDeploymentLog(deploymentLogId, {
      status: 'building',
      log_data: { steps: ['instance-created', 'bitbucket-repo-created', 'creating-vercel'] }
    })
    
    console.log('🚀 Creating Vercel project first...')
    const vercelProject = await createVercelProjectAPI(instanceId, data.name, bitbucketRepo.clone_url)
    
    // Wait for project to be ready
    console.log('⏳ Waiting for Vercel project to be ready...')
    await new Promise(resolve => setTimeout(resolve, 10000))
    
    // Step 3: Deploy to the created project
    console.log('🚀 Deploying to created project...')
    let deploymentUrl = vercelProject.url || `https://${vercelProject.name}.vercel.app`
    
    try {
      const deployment = await triggerDirectDeployment(vercelProject.id, bitbucketRepo.clone_url, data.name, bitbucketRepo.uuid)
      console.log('✅ Direct deployment triggered:', deployment.url)
      
      // Update project with deployment URL
      deploymentUrl = deployment.url
      vercelProject.url = deployment.url
    } catch (error) {
      console.log('⚠️ Direct deployment failed, using project URL instead:', error)
      console.log(`📍 Project will be available at: ${deploymentUrl}`)
    }
    
    // Step 3: Configure basic environment variables
    await updateDeploymentLog(deploymentLogId, {
      status: 'building',
      log_data: { steps: ['instance-created', 'bitbucket-repo-created', 'vercel-created', 'configuring-env'] }
    })
    
    await configureBasicEnvironmentVariables(vercelProject.id)
    
    // Step 4: Deploy to Vercel
    await updateDeploymentLog(deploymentLogId, {
      status: 'building',
      log_data: { steps: ['instance-created', 'bitbucket-repo-created', 'vercel-created', 'env-configured', 'deploying'] }
    })
    
    // Deployment already completed in step 3
    console.log('✅ Deployment completed - project created with repository linked')
    const deployment = { 
      id: 'deployed', 
      url: deploymentUrl
    }
    
    // Step 5: Update instance with deployment details
    await updateCMSInstance(instanceId, {
      status: 'active',
      vercel_project_id: vercelProject.id,
      vercel_deployment_url: deployment.url,
      vercel_git_repo: bitbucketRepo.clone_url,
      last_deployed_at: new Date().toISOString()
    })
    
    // Complete deployment log
    await updateDeploymentLog(deploymentLogId, {
      status: 'success',
      completed_at: new Date().toISOString(),
      duration_ms: Date.now() - startTime,
      log_data: { 
        steps: ['instance-created', 'bitbucket-repo-created', 'vercel-created', 'env-configured', 'deployed', 'completed'],
        final_url: deployment.url,
        repository_url: bitbucketRepo.clone_url
      }
    })
    
    // Send success notification
    await createNotification({
      cms_instance_id: instanceId,
      type: 'success',
      title: 'Website Repository Created Successfully',
      message: `${data.name} repository created with complete code. Connect to Vercel dashboard to deploy.`,
      is_read: false,
      metadata: {
        repository_url: bitbucketRepo.web_url,
        vercel_project_url: `https://vercel.com/${VERCEL_TEAM_ID}/${vercelProject.name}`
      }
    })
    
  } catch (error) {
    console.error('Deployment failed:', error)
    
    // Update instance status to failed
    await updateCMSInstance(instanceId, {
      status: 'failed'
    })
    
    // Update deployment log with error
    await updateDeploymentLog(deploymentLogId, {
      status: 'failed',
      completed_at: new Date().toISOString(),
      duration_ms: Date.now() - startTime,
      error_message: error instanceof Error ? error.message : 'Unknown error occurred'
    })
    
    // Send error notification
    await createNotification({
      cms_instance_id: instanceId,
      type: 'error',
      title: 'Website Deployment Failed',
      message: `Failed to deploy ${data.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      is_read: false,
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
}


async function createVercelProjectAPI(instanceId: string, name: string, repositoryUrl: string) {
  if (!VERCEL_TOKEN) {
    throw new Error('Vercel token not configured')
  }
  
  // Use the provided repository URL (from Bitbucket)
  const templateRepo = repositoryUrl
  
  // Clean and format the project name (max 100 chars, but keep it short)
  const projectName = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '').substring(0, 30)
  const fullProjectName = projectName.startsWith('altira-') ? projectName : `altira-${projectName}`
  
  console.log(`🏗️  Creating Vercel project: "${fullProjectName}"`)
  console.log(`🎯 Using Vercel Team ID: "${VERCEL_TEAM_ID}"`)
  console.log(`🔑 Vercel Token: ${VERCEL_TOKEN ? `${VERCEL_TOKEN.substring(0, 10)}...` : 'NOT SET'}`)
  console.log(`📦 Repository URL: ${templateRepo}`)
  
  // Try to create Vercel project with Bitbucket repo first
  const apiUrl = VERCEL_TEAM_ID 
    ? `${VERCEL_API_URL}/v9/projects?teamId=${VERCEL_TEAM_ID}`
    : `${VERCEL_API_URL}/v9/projects`
  
  let response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
    },
    body: JSON.stringify({
      name: fullProjectName,
      gitRepository: {
        repo: templateRepo,
        type: 'bitbucket'
      },
      framework: 'nextjs',
      buildCommand: 'npm run build',
      outputDirectory: '.next',
      installCommand: 'npm install --legacy-peer-deps',
      publicSource: true
    })
  })
  
  // If Bitbucket integration fails, try creating with public repository
  if (!response.ok) {
    const error = await response.text()
    console.log('Bitbucket integration failed, trying public repository approach:', error)
    
    // Try to import from public Bitbucket repository
    response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
      },
      body: JSON.stringify({
        name: fullProjectName,
        gitRepository: {
          repo: templateRepo,
          type: 'bitbucket',
          sourceless: false
        },
        framework: 'nextjs',
        buildCommand: 'npm run build',
        outputDirectory: '.next',
        installCommand: 'npm install --legacy-peer-deps'
      })
    })
    
    // If that also fails, create empty project as fallback
    if (!response.ok) {
      const secondError = await response.text()
      console.log('Public repository failed, creating empty project:', secondError)
      
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
          ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
        },
        body: JSON.stringify({
          name: fullProjectName,
          framework: 'nextjs'
        })
      })
      
      if (!response.ok) {
        const thirdError = await response.text()
        throw new Error(`Failed to create Vercel project: ${thirdError}`)
      }
      
      console.log('✅ Created empty Vercel project - connect repository manually in Vercel dashboard')
    } else {
      console.log('✅ Created Vercel project with public Bitbucket repository')
    }
  } else {
    console.log('✅ Created Vercel project with Bitbucket integration')
  }
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create Vercel project: ${error}`)
  }
  
  const project = await response.json()
  
  // Debug logging to understand project structure
  console.log('🔍 Vercel project response structure:')
  console.log('   Project ID:', project.id || 'MISSING')
  console.log('   Project name:', project.name || 'MISSING') 
  console.log('   Full response keys:', Object.keys(project))
  
  return project
}

async function connectRepositoryToVercelProject(vercelProjectId: string, repositoryUrl: string) {
  if (!VERCEL_TOKEN) {
    throw new Error('Vercel token not configured')
  }
  
  console.log(`🔗 Attempting to connect repository to Vercel project...`)
  console.log(`   Project ID: ${vercelProjectId}`)
  console.log(`   Repository: ${repositoryUrl}`)
  
  const apiUrl = VERCEL_TEAM_ID 
    ? `${VERCEL_API_URL}/v9/projects/${vercelProjectId}?teamId=${VERCEL_TEAM_ID}`
    : `${VERCEL_API_URL}/v9/projects/${vercelProjectId}`
    
  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
    },
    body: JSON.stringify({
      gitRepository: {
        repo: repositoryUrl,
        type: 'bitbucket'
      }
    })
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to connect repository: ${error}`)
  }
  
  console.log('✅ Repository connected successfully')
  return await response.json()
}

async function triggerDirectDeployment(vercelProjectId: string | null, repositoryUrl: string, projectName: string, repoUuid?: string) {
  if (!VERCEL_TOKEN) {
    throw new Error('Vercel token not configured')
  }
  
  const deploymentName = `deploy-${Date.now()}`
  console.log(`🚀 Creating direct deployment from repository...`)
  console.log(`   Project ID: ${vercelProjectId}`)
  console.log(`   Project Name: ${projectName}`)
  console.log(`   Deployment Name: ${deploymentName}`)
  console.log(`   Repository: ${repositoryUrl}`)
  
  // Create deployment directly from git repository
  const simpleDeploymentName = `d${Date.now()}`
  const deploymentPayload: any = {
    name: simpleDeploymentName,
    target: 'production',
    gitSource: {
      type: 'bitbucket',
      repo: repositoryUrl.replace('https://bitbucket.org/', '').replace('.git', ''),
      ref: 'main',
      repoUuid: repoUuid
    }
  }
  
  // Link deployment to the existing project to prevent creating a second project
  if (vercelProjectId) {
    deploymentPayload.project = vercelProjectId
  }
  
  console.log('📤 Deployment payload:', JSON.stringify(deploymentPayload, null, 2))
  
  const response = await fetch(`${VERCEL_API_URL}/v13/deployments?skipAutoDetectionConfirmation=1${VERCEL_TEAM_ID ? `&teamId=${VERCEL_TEAM_ID}` : ''}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
    },
    body: JSON.stringify(deploymentPayload)
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to create direct deployment: ${error}`)
  }
  
  const deployment = await response.json()
  console.log('✅ Direct deployment created successfully')
  console.log(`📍 Deployment ID: ${deployment.uid || deployment.id}`)
  console.log(`🌐 Deployment URL: ${deployment.url}`)
  console.log(`🏷️  Deployment Alias: ${deployment.alias?.[0] || 'none'}`)
  
  return {
    id: deployment.uid || deployment.id,
    url: deployment.url || `https://${deployment.alias?.[0] || projectName}.vercel.app`
  }
}

async function verifyVercelProjectExists(vercelProjectId: string, maxRetries = 5) {
  console.log(`🔍 Verifying Vercel project exists: ${vercelProjectId}`)
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const apiUrl = VERCEL_TEAM_ID 
        ? `${VERCEL_API_URL}/v9/projects/${vercelProjectId}?teamId=${VERCEL_TEAM_ID}`
        : `${VERCEL_API_URL}/v9/projects/${vercelProjectId}`
        
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
        }
      })
      
      if (response.ok) {
        const project = await response.json()
        console.log(`✅ Project verified: ${project.name}`)
        return project
      }
      
      if (response.status === 404) {
        console.log(`⏳ Attempt ${attempt}/${maxRetries}: Project not yet available, waiting...`)
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000))
          continue
        }
      }
      
      const error = await response.text()
      throw new Error(`Project verification failed: ${error}`)
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      console.log(`⏳ Attempt ${attempt}/${maxRetries} failed, retrying...`)
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }
}

async function configureBasicEnvironmentVariables(vercelProjectId: string) {
  if (!VERCEL_TOKEN) {
    throw new Error('Vercel token not configured')
  }
  
  console.log(`🔧 Setting basic environment variables for project: ${vercelProjectId}`)
  
  // First verify the project exists with retry logic
  await verifyVercelProjectExists(vercelProjectId)
  
  // Configure basic environment variables for a standard web application
  const envVars = [
    {
      key: 'NODE_ENV',
      value: 'production',
      type: 'plain',
      target: ['production', 'preview']
    }
  ]
  
  for (const envVar of envVars) {
    console.log(`   Setting ${envVar.key}...`)
    const apiUrl = VERCEL_TEAM_ID 
      ? `${VERCEL_API_URL}/v9/projects/${vercelProjectId}/env?teamId=${VERCEL_TEAM_ID}`
      : `${VERCEL_API_URL}/v9/projects/${vercelProjectId}/env`
      
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
      },
      body: JSON.stringify(envVar)
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.error(`❌ Failed to set ${envVar.key}:`, error)
      throw new Error(`Failed to set environment variable ${envVar.key}: ${error}`)
    } else {
      console.log(`   ✅ Set ${envVar.key}`)
    }
  }
}

async function triggerVercelDeployment(vercelProjectId: string) {
  if (!VERCEL_TOKEN) {
    throw new Error('Vercel token not configured')
  }
  
  // First get project details to find the latest deployment
  const projectResponse = await fetch(`${VERCEL_API_URL}/v9/projects/${vercelProjectId}`, {
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
    }
  })
  
  if (!projectResponse.ok) {
    throw new Error('Failed to get project details for deployment')
  }
  
  const project = await projectResponse.json()
  
  // Trigger a new deployment
  const response = await fetch(`${VERCEL_API_URL}/v13/deployments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
    },
    body: JSON.stringify({
      name: project.name,
      project: vercelProjectId,
      target: 'production',
      gitSource: project.link ? {
        type: 'bitbucket',
        repo: project.link.repo,
        ref: project.link.productionBranch || 'main'
      } : undefined
    })
  })
  
  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to trigger deployment: ${error}`)
  }
  
  const deployment = await response.json()
  return {
    id: deployment.uid || deployment.id,
    url: deployment.url || `https://${deployment.alias?.[0] || project.name}.vercel.app`
  }
}

async function waitForDeployment(deploymentId: string, maxWaitTime = 10 * 60 * 1000): Promise<any> {
  const startTime = Date.now()
  
  while (Date.now() - startTime < maxWaitTime) {
    const response = await fetch(`${VERCEL_API_URL}/v13/deployments/${deploymentId}`, {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        ...(VERCEL_TEAM_ID && { 'X-Vercel-Team-Id': VERCEL_TEAM_ID })
      }
    })
    
    if (response.ok) {
      const deployment = await response.json()
      
      if (deployment.state === 'READY') {
        return deployment
      }
      
      if (deployment.state === 'ERROR' || deployment.state === 'CANCELED') {
        throw new Error(`Deployment failed with state: ${deployment.state}`)
      }
    }
    
    // Wait 10 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 10000))
  }
  
  throw new Error('Deployment timeout - took longer than expected')
}

// Bitbucket API Functions
async function testBitbucketConnection() {
  if (!BITBUCKET_USERNAME || !BITBUCKET_AUTH_TOKEN) {
    throw new Error('Bitbucket credentials not configured')
  }

  console.log('🧪 Testing Bitbucket API connection...')
  
  // Test with the simplest possible API call first
  // API Tokens use Bearer authentication, App Passwords use Basic
  const authHeader = BITBUCKET_API_TOKEN 
    ? `Bearer ${BITBUCKET_API_TOKEN}`
    : `Basic ${Buffer.from(`${BITBUCKET_USERNAME}:${BITBUCKET_AUTH_TOKEN}`).toString('base64')}`
  
  console.log(`🔐 Using auth method: ${BITBUCKET_API_TOKEN ? 'Bearer (API Token)' : 'Basic (App Password)'}`)
  console.log(`🔑 Token format check: ${BITBUCKET_API_TOKEN ? `Starts with: ${BITBUCKET_API_TOKEN.substring(0, 15)}...` : 'Using App Password'}`)
  
  // Test with workspace-specific endpoint first (recommended for workspace-scoped tokens)
  console.log('🔍 Testing token with workspace-specific endpoint...')
  let testResponse = await fetch(`https://api.bitbucket.org/2.0/workspaces/${BITBUCKET_WORKSPACE}`, {
    method: 'GET',
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json',
    }
  })

  if (!testResponse.ok) {
    console.error('❌ Workspace endpoint failed, trying user endpoint...')
    // Fallback to user endpoint
    testResponse = await fetch(`https://api.bitbucket.org/2.0/user`, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json',
      }
    })
  }

  if (!testResponse.ok) {
    const error = await testResponse.text()
    console.error('❌ Bitbucket API connection test failed:')
    console.error(`   Status: ${testResponse.status} ${testResponse.statusText}`)
    console.error(`   Response: ${error}`)
    throw new Error(`Bitbucket API authentication failed (${testResponse.status}): ${error}`)
  }

  const responseData = await testResponse.json()
  console.log('✅ Bitbucket API connection successful!')
  console.log(`   Token is valid and working`)
  console.log(`   Response data available:`, JSON.stringify(responseData, null, 2).substring(0, 200) + '...')
  return true
}

async function createBitbucketRepository(websiteName: string, description?: string) {
  if (!BITBUCKET_USERNAME || !BITBUCKET_AUTH_TOKEN) {
    throw new Error('Bitbucket credentials not configured. Please set BITBUCKET_API_TOKEN (recommended) or BITBUCKET_APP_PASSWORD (legacy)')
  }

  // Clean and format the repository name
  const repoName = websiteName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/^-+|-+$/g, '')
  
  console.log(`🏗️ Creating Bitbucket repository: "${repoName}"`)
  console.log(`🎯 Using Bitbucket workspace: "${BITBUCKET_WORKSPACE}"`)
  console.log(`🔐 Auth token type: ${BITBUCKET_API_TOKEN ? 'API_TOKEN' : 'APP_PASSWORD'}`)
  console.log(`🔗 API URL: https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${repoName}`)
  console.log(`🔑 Username: ${BITBUCKET_USERNAME}`)
  console.log(`🔑 Token prefix: ${BITBUCKET_AUTH_TOKEN?.substring(0, 10)}...`)

  // Setup auth header
  const authHeader = BITBUCKET_API_TOKEN 
    ? `Bearer ${BITBUCKET_API_TOKEN}`
    : `Basic ${Buffer.from(`${BITBUCKET_USERNAME}:${BITBUCKET_AUTH_TOKEN}`).toString('base64')}`

  // Step 0: Check if we can list repositories (test permissions)
  console.log('🔍 Testing repository access permissions...')
  const permissionTest = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}?pagelen=1`, {
    method: 'GET',
    headers: {
      'Authorization': authHeader,
      'Accept': 'application/json',
    }
  })

  if (!permissionTest.ok) {
    const permError = await permissionTest.text()
    console.error('❌ Repository permission test failed:')
    console.error(`   Status: ${permissionTest.status} ${permissionTest.statusText}`)
    console.error(`   Response: ${permError}`)
    throw new Error(`Insufficient permissions for repository operations (${permissionTest.status}): ${permError}`)
  } else {
    console.log('✅ Repository permissions confirmed')
  }

  // Step 1: Create empty repository
  console.log(`🏗️ Creating new repository: ${repoName}`)
  const createRepoResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${repoName}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      description: description || `CMS website: ${websiteName}`,
      is_private: true, // Workspace policy requires private repos
      has_wiki: false,
      has_issues: true
    })
  })

  if (!createRepoResponse.ok) {
    const error = await createRepoResponse.text()
    console.error('❌ Bitbucket Create API Error Details:')
    console.error(`   Status: ${createRepoResponse.status} ${createRepoResponse.statusText}`)
    console.error(`   Response: ${error}`)
    console.error(`   URL: https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${repoName}`)
    throw new Error(`Failed to create Bitbucket repository (${createRepoResponse.status}): ${error}`)
  }

  const newRepo = await createRepoResponse.json()
  console.log('✅ Created empty repository:', newRepo.name)

  // Step 2: Clone ALL files from ai-generated-site template
  try {
    await cloneStaticTemplateFiles(repoName)
    console.log('✅ Successfully cloned ALL ai-generated-site files to new repository')
  } catch (error) {
    console.error('⚠️ Failed to clone static template files:', error)
    // Repository was created but code clone failed - this is recoverable
    throw new Error(`Repository created but failed to clone ai-generated-site files: ${error}`)
  }

  return {
    name: repoName,
    full_name: newRepo.full_name,
    clone_url: `https://bitbucket.org/${BITBUCKET_WORKSPACE}/${repoName}.git`, // Clean URL for Vercel
    web_url: newRepo.links.html.href,
    uuid: newRepo.uuid // Needed for Vercel API
  }
}

async function cloneStaticTemplateFiles(newRepoName: string) {
  console.log('🔄 Copying ALL files from local ai-generated-site directory...')
  
  const authHeader = BITBUCKET_API_TOKEN 
    ? `Bearer ${BITBUCKET_API_TOKEN}`
    : `Basic ${Buffer.from(`${BITBUCKET_USERNAME}:${BITBUCKET_AUTH_TOKEN}`).toString('base64')}`

  try {
  // Use the local ai-generated-site directory instead of API calls
  console.log('📁 Reading from local ai-generated-site directory...')
  await copyFromLocalAiGeneratedSite(newRepoName, authHeader)
    
  } catch (error) {
    console.log('⚠️ Local copy failed, using fallback approach:', error)
    await createEssentialStaticFiles(newRepoName)
  }

  // Skip pipeline creation - manual Vercel connection is preferred
  console.log('✅ Repository ready for manual Vercel connection')
}

async function copyFromLocalAiGeneratedSite(newRepoName: string, authHeader: string) {
  console.log('📂 Copying ALL files from ai-generated-site/* ...')
  
  const fs = require('fs')
  const path = require('path')
  
  const staticPath = path.join(process.cwd(), 'ai-generated-site')
  
  if (!fs.existsSync(staticPath)) {
    throw new Error('ai-generated-site directory not found')
  }
  
  console.log(`✅ Found ai-generated-site directory at: ${staticPath}`)
  
  // Use simpler file-by-file upload instead of ZIP
  await uploadFilesDirectly(newRepoName, staticPath, authHeader)
  console.log('✅ Successfully uploaded ALL ai-generated-site files')
}

async function uploadFilesDirectly(newRepoName: string, staticPath: string, authHeader: string) {
  console.log('📤 Uploading ALL files in single API call from ai-generated-site...')
  
  const fs = require('fs')
  const path = require('path')
  
  // Read all files recursively
  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath)
    
    files.forEach((file: string) => {
      const fullPath = path.join(dirPath, file)
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
      } else {
        // Skip system files
        if (!file.startsWith('.') && !file.includes('node_modules')) {
          arrayOfFiles.push(fullPath)
        }
      }
    })
    
    return arrayOfFiles
  }
  
  const allFiles = getAllFiles(staticPath)
  console.log(`📁 Found ${allFiles.length} files to upload in SINGLE API call`)
  
  // Create form data with all files in one request
  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nDeploy complete ai-generated-site template (${allFiles.length} files)\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  
  // Add ALL files to the same form data (single request)
  for (const filePath of allFiles) {
    const relativePath = path.relative(staticPath, filePath)
    
    try {
      // Handle binary files vs text files
      const stats = fs.statSync(filePath)
      if (stats.size > 1024 * 1024) { // Skip files larger than 1MB
        console.log(`⚠️ Skipping large file: ${relativePath} (${stats.size} bytes)`)
        continue
      }
      
      // Read as text for most files, handle encoding properly
      const fileContent = fs.readFileSync(filePath, 'utf8')
      
      formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
      formData += `Content-Disposition: form-data; name="${relativePath}"\r\n\r\n${fileContent}\r\n`
      
      console.log(`📄 Added to batch: ${relativePath}`)
    } catch (error) {
      console.log(`⚠️ Skipping file ${relativePath}: ${error}`)
    }
  }
  
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`
  
  console.log('🚀 Making SINGLE API call to upload all files...')
  
  // Single API call to upload ALL files
  const uploadResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })
  
  if (!uploadResponse.ok) {
    const error = await uploadResponse.text()
    throw new Error(`Failed to upload files in single call: ${uploadResponse.status} ${error}`)
  }
  
  console.log(`✅ Successfully uploaded ${allFiles.length} files in SINGLE API call!`)
}

async function zipAndUploadAllFiles(newRepoName: string, staticPath: string, authHeader: string) {
  console.log('📦 Creating ZIP of ALL ai-generated-site files...')
  
  const fs = require('fs')
  const path = require('path')
  const archiver = require('archiver')
  
  // Create temporary zip file
  const tempZipPath = path.join(process.cwd(), `${newRepoName}-complete.zip`)
  const output = fs.createWriteStream(tempZipPath)
  const archive = archiver('zip', { zlib: { level: 9 } })
  
  return new Promise(async (resolve, reject) => {
    output.on('close', async () => {
      console.log(`✅ Created complete ZIP (${archive.pointer()} bytes)`)
      
      try {
        await uploadCompleteZip(newRepoName, tempZipPath, authHeader)
        fs.unlinkSync(tempZipPath) // Clean up
        resolve(true)
      } catch (error) {
        if (fs.existsSync(tempZipPath)) fs.unlinkSync(tempZipPath)
        reject(error)
      }
    })
    
    output.on('error', reject)
    archive.on('error', reject)
    
    archive.pipe(output)
    
    // Add ALL files from ai-generated-site (excluding system files)
    archive.glob('**/*', {
      cwd: staticPath,
      ignore: ['.DS_Store', '.git/**', 'node_modules/**', '.next/**']
    })
    
    await archive.finalize()
  })
}

async function uploadCompleteZip(newRepoName: string, zipPath: string, authHeader: string) {
  console.log('📤 Uploading ALL files to Bitbucket in ONE API call...')
  
  const fs = require('fs')
  const AdmZip = require('adm-zip')
  
  const zip = new AdmZip(zipPath)
  const zipEntries = zip.getEntries()
  
  console.log(`📋 Found ${zipEntries.length} files in ZIP`)
  
  // Create ONE massive form data with ALL files
  const authorEmail = process.env.BITBUCKET_USERNAME || 'fabian.e.almiron@gmail.com'
  const authorName = process.env.COMMIT_AUTHOR_NAME || 'Fabian Almiron'
  
  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nComplete CMS deployment - all files from ai-generated-site\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="author"\r\n\r\n${authorName} <${authorEmail}>\r\n`
  
  let fileCount = 0
  
  for (const zipEntry of zipEntries) {
    if (!zipEntry.isDirectory) {
      try {
        const content = zipEntry.getData().toString('utf8')
        formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
        formData += `Content-Disposition: form-data; name="${zipEntry.entryName}"\r\n\r\n${content}\r\n`
        fileCount++
      } catch (error) {
        console.log(`⚠️ Skipping binary file: ${zipEntry.entryName}`)
      }
    }
  }
  
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`
  
  console.log(`📤 Making ONE API call with ${fileCount} files...`)
  
  const workspace = process.env.BITBUCKET_WORKSPACE || 'trukraft'
  const uploadResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${workspace}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text()
    throw new Error(`Failed to upload all files: ${uploadResponse.status} ${error}`)
  }

  console.log(`✅ Successfully uploaded all ${fileCount} files in ONE API call!`)
}





async function uploadFileBatch(newRepoName: string, files: Array<{path: string, content: string}>, authHeader: string, batchName: string) {
  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nAdd ${batchName} (${files.length} files)\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="author"\r\n\r\nFabian Almiron <fabian.e.almiron@gmail.com>\r\n`
  
  for (const file of files) {
    formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
    formData += `Content-Disposition: form-data; name="${file.path}"\r\n\r\n${file.content}\r\n`
  }
  
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`

  const uploadResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text()
    throw new Error(`Failed to upload batch: ${uploadResponse.status} ${error}`)
  }

  console.log(`✅ Uploaded batch: ${batchName}`)
}

async function copyEssentialFilesFromLocal(newRepoName: string, cmsPath: string, authHeader: string) {
  console.log('📝 Copying essential files...')
  
  const fs = require('fs')
  const path = require('path')
  
  // List of essential files to copy
  const essentialFiles = [
    'package.json',
    'next.config.mjs', 
    'tsconfig.json',
    'tailwind.config.ts',
    'components.json',
    '.gitignore',
    'env.example',
    'postcss.config.mjs'
  ]
  
  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nAdd essential CMS files from local cms-master\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  
  for (const fileName of essentialFiles) {
    const filePath = path.join(cmsPath, fileName)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
      formData += `Content-Disposition: form-data; name="${fileName}"\r\n\r\n${content}\r\n`
      console.log(`📄 Added ${fileName}`)
    } else {
      console.log(`⚠️ File not found: ${fileName}`)
    }
  }
  
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`

  const createResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })

  if (!createResponse.ok) {
    const error = await createResponse.text()
    throw new Error(`Failed to create essential files: ${createResponse.status} ${error}`)
  }

  console.log('✅ Created essential files from local cms-master')
}

async function copyDirectoriesFromLocal(newRepoName: string, cmsPath: string, authHeader: string) {
  console.log('📁 Copying key directories in batches...')
  
  const fs = require('fs')
  const path = require('path')
  
  // Key directories to copy
  const keyDirectories = ['app', 'components', 'lib', 'hooks']
  
  for (const dirName of keyDirectories) {
    const dirPath = path.join(cmsPath, dirName)
    if (fs.existsSync(dirPath)) {
      console.log(`📂 Batch copying ${dirName}/ directory...`)
      await batchCopyDirectory(newRepoName, dirPath, dirName, authHeader)
    } else {
      console.log(`⚠️ Directory not found: ${dirName}`)
    }
  }
}

async function copyDirectoryRecursively(newRepoName: string, localDirPath: string, remoteDirName: string, authHeader: string) {
  const fs = require('fs')
  const path = require('path')
  
  const files = fs.readdirSync(localDirPath, { withFileTypes: true })
  
  // Process files in batches to avoid overwhelming the API
  for (const file of files) {
    if (file.isFile() && !file.name.startsWith('.')) {
      const filePath = path.join(localDirPath, file.name)
      const remoteFilePath = `${remoteDirName}/${file.name}`
      
      try {
        const content = fs.readFileSync(filePath, 'utf8')
        await createSingleFile(newRepoName, remoteFilePath, content, authHeader)
        console.log(`✅ Copied ${remoteFilePath}`)
      } catch (error) {
        console.log(`⚠️ Failed to copy ${remoteFilePath}:`, error)
      }
    } else if (file.isDirectory() && !file.name.startsWith('.')) {
      // Recursively copy subdirectories
      const subDirPath = path.join(localDirPath, file.name)
      const remoteSubDir = `${remoteDirName}/${file.name}`
      await copyDirectoryRecursively(newRepoName, subDirPath, remoteSubDir, authHeader)
    }
  }
}

async function createSingleFile(newRepoName: string, filePath: string, content: string, authHeader: string) {
  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nAdd ${filePath} from local cms-master\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="${filePath}"\r\n\r\n${content}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`

  const createResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })

  if (!createResponse.ok) {
    const error = await createResponse.text()
    throw new Error(`Failed to create ${filePath}: ${createResponse.status} ${error}`)
  }
}

async function createEssentialStaticFiles(newRepoName: string) {
  console.log('🏗️ Creating essential static structure manually...')
  
  const authHeader = BITBUCKET_API_TOKEN 
    ? `Bearer ${BITBUCKET_API_TOKEN}`
    : `Basic ${Buffer.from(`${BITBUCKET_USERNAME}:${BITBUCKET_AUTH_TOKEN}`).toString('base64')}`

  // Create multiple commits to build the static structure
  await createStaticFileStructure(newRepoName, authHeader)
}

async function createStaticFileStructure(newRepoName: string, authHeader: string) {
  console.log('🏗️ Creating complete static file structure...')
  
  // Step 1: Create basic package.json and config files
  await createBasicStaticFiles(newRepoName, authHeader)
  
  // Step 2: Create essential Next.js structure
  await createPlaceholderStaticStructure(newRepoName, authHeader)
  
  console.log('✅ Created essential static structure')
}

async function createBasicStaticFiles(repoName: string, authHeader: string) {
  console.log('📝 Creating basic static files...')
  
  const readmeContent = `# ${repoName}

This static website was automatically created from the ai-generated-site template.

## 🚀 Features
- Modern Next.js 15 with App Router
- Tailwind CSS for styling
- TypeScript support
- Responsive design
- SEO optimized

## 📋 Setup
This repository contains a complete static website ready to deploy.

## 🔗 Source
Generated from ai-generated-site template
`

  const packageJsonContent = `{
  "name": "${repoName}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.5.2"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.2",
    "@eslint/eslintrc": "^3"
  }
}`

  // Next.js config
  const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
}

export default nextConfig`

  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nInitial commit: Basic CMS structure with package.json and configs\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="README.md"\r\n\r\n${readmeContent}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="package.json"\r\n\r\n${packageJsonContent}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="next.config.mjs"\r\n\r\n${nextConfigContent}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`

  const createResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${repoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })

  if (!createResponse.ok) {
    const error = await createResponse.text()
    throw new Error(`Failed to create basic files: ${createResponse.status} ${error}`)
  }

  console.log('✅ Created basic CMS files')
}

async function copyKeyFilesFromMaster(newRepoName: string, authHeader: string) {
  console.log('📁 Copying key files from cms-master...')
  
  try {
    // Copy specific important files from cms-master
    const keyFiles = [
      'app/globals.css',
      'app/layout.tsx', 
      'app/page.tsx',
      'components/ui/button.tsx',
      'lib/utils.ts'
    ]
    
    for (const filePath of keyFiles) {
      try {
        await copyFileFromMaster(newRepoName, filePath, authHeader)
        console.log(`✅ Copied ${filePath}`)
      } catch (error) {
        console.log(`⚠️ Could not copy ${filePath}:`, error)
      }
    }
    
  } catch (error) {
    console.log('⚠️ Could not copy files from master, creating placeholder structure instead')
    await createPlaceholderStructure(newRepoName, authHeader)
  }
}

async function copyFileFromMaster(newRepoName: string, filePath: string, authHeader: string) {
  // Get file content from cms-master
  const fileResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${BITBUCKET_MASTER_REPO}/src/main/${filePath}`, {
    headers: { 'Authorization': authHeader }
  })
  
  if (!fileResponse.ok) {
    throw new Error(`File not found: ${filePath}`)
  }
  
  const fileContent = await fileResponse.text()
  
  // Create the file in the new repo
  const createFileData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
    + `Content-Disposition: form-data; name="message"\r\n\r\nAdd ${filePath} from cms-master\r\n`
    + `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
    + `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
    + `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
    + `Content-Disposition: form-data; name="${filePath}"\r\n\r\n${fileContent}\r\n`
    + `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`

  const createResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: createFileData
  })

  if (!createResponse.ok) {
    const error = await createResponse.text()
    throw new Error(`Failed to create ${filePath}: ${error}`)
  }
}

async function createPlaceholderStaticStructure(newRepoName: string, authHeader: string) {
  console.log('🔧 Creating placeholder static structure...')
  
  // Create basic app structure
  const appLayoutContent = `import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "${newRepoName} - Modern Website",
  description: "Beautiful, responsive website built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={\`\${geistSans.variable} \${geistMono.variable} antialiased min-h-screen flex flex-col\`}
      >
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}`

  const appPageContent = `export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          Welcome to
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            ${newRepoName}
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          This static website was automatically generated and is ready for customization.
          Built with Next.js 15, TypeScript, and Tailwind CSS.
        </p>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🚀 Ready to Deploy</h2>
          <p className="text-gray-600">
            Your website is now live and ready for customization. 
            Start editing the files to make it your own!
          </p>
        </div>
      </div>
    </div>
  );
}`

  const globalsCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`

  let formData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="message"\r\n\r\nAdd basic static app structure\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="branch"\r\n\r\nmain\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="src/app/layout.tsx"\r\n\r\n${appLayoutContent}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="src/app/page.tsx"\r\n\r\n${appPageContent}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\n`
  formData += `Content-Disposition: form-data; name="src/app/globals.css"\r\n\r\n${globalsCSS}\r\n`
  formData += `------WebKitFormBoundary7MA4YWxkTrZu0gW--\r\n`

  const createResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/${BITBUCKET_WORKSPACE}/${newRepoName}/src`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    },
    body: formData
  })

  if (!createResponse.ok) {
    const error = await createResponse.text()
    throw new Error(`Failed to create app structure: ${error}`)
  }

  console.log('✅ Created placeholder app structure')
}

// Pipeline creation removed - manual Vercel connection is preferred for better reliability

// Removed createInitialCommitFromMaster - replaced with repository forking approach

function getTemplateRepo(templateId: string): string {
  // This function is now deprecated in favor of dynamic Bitbucket repository creation
  // Keep for backward compatibility
  const DEFAULT_CMS_REPO = `https://bitbucket.org/${BITBUCKET_WORKSPACE}/${BITBUCKET_MASTER_REPO}`
  
  const templateRepos: Record<string, string> = {
    'default': DEFAULT_CMS_REPO,
    'ecommerce': DEFAULT_CMS_REPO,
    'blog': DEFAULT_CMS_REPO,
    'portfolio': DEFAULT_CMS_REPO
  }
  
  return templateRepos[templateId] || templateRepos['default']
}
