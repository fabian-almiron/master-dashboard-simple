import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'createTemplate':
        const { data: template, error: templateError } = await supabaseAdmin
          .from('templates')
          .insert([data])
          .select()
          .single()

        if (templateError) {
          return NextResponse.json({ error: templateError.message }, { status: 400 })
        }

        return NextResponse.json({ template })

      case 'createTemplateBlock':
        const { data: block, error: blockError } = await supabaseAdmin
          .from('template_blocks')
          .insert([data])
          .select()
          .single()

        if (blockError) {
          return NextResponse.json({ error: blockError.message }, { status: 400 })
        }

        return NextResponse.json({ block })

      case 'updateTemplateBlock':
        const { id, ...updates } = data
        const { data: updatedBlock, error: updateError } = await supabaseAdmin
          .from('template_blocks')
          .update(updates)
          .eq('id', id)
          .select()
          .single()

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 400 })
        }

        return NextResponse.json({ block: updatedBlock })

      case 'deleteTemplateBlock':
        const { error: deleteError } = await supabaseAdmin
          .from('template_blocks')
          .delete()
          .eq('id', data.id)

        if (deleteError) {
          return NextResponse.json({ error: deleteError.message }, { status: 400 })
        }

        return NextResponse.json({ success: true })

      case 'getTemplateBlocks':
        const { data: blocks, error: getError } = await supabaseAdmin
          .from('template_blocks')
          .select('*')
          .eq('template_id', data.templateId)
          .order('order_index', { ascending: true })

        if (getError) {
          return NextResponse.json({ error: getError.message }, { status: 400 })
        }

        return NextResponse.json({ blocks })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const templateId = searchParams.get('templateId')

    if (!templateId) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 })
    }

    const { data: blocks, error } = await supabaseAdmin
      .from('template_blocks')
      .select('*')
      .eq('template_id', templateId)
      .order('order_index', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ blocks })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
