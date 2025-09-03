// Test script to check if theme import works
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

console.log('🧪 Testing theme import...');

// Check if the auto-register file exists
const autoRegisterPath = './themes/base-theme/auto-register.tsx';
try {
  const content = readFileSync(autoRegisterPath, 'utf-8');
  console.log('✅ auto-register.tsx file exists and is readable');
  console.log('📄 File length:', content.length, 'characters');
  
  // Check if it has the expected exports
  if (content.includes('export const componentInfo')) {
    console.log('✅ componentInfo export found');
  } else {
    console.log('❌ componentInfo export NOT found');
  }
  
  if (content.includes('export const getComponent')) {
    console.log('✅ getComponent export found');
  } else {
    console.log('❌ getComponent export NOT found');
  }
  
  // Count components
  const componentMatches = content.match(/import\s+\w+,\s*{\s*metadata\s+as\s+\w+Metadata\s*}/g);
  if (componentMatches) {
    console.log('✅ Found', componentMatches.length, 'component imports');
  } else {
    console.log('❌ No component imports found');
  }
  
} catch (error) {
  console.log('❌ Failed to read auto-register.tsx:', error.message);
}
