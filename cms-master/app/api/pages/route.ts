import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'getPageById':
        const { data: page, error: pageError } = await supabaseAdmin
          .from('pages')
          .select('*')
          .eq('id', data.pageId)
          .single()

        if (pageError) {
          return NextResponse.json({ error: pageError.message }, { status: 400 })
        }

        return NextResponse.json({ page })

      case 'createPage':
        const { data: newPage, error: createPageError } = await supabaseAdmin
          .from('pages')
          .insert([data])
          .select()
          .single()

        if (createPageError) {
          return NextResponse.json({ error: createPageError.message }, { status: 400 })
        }

        return NextResponse.json({ page: newPage })

      case 'updatePage':
        const { pageId, ...pageUpdates } = data
        const { data: updatedPage, error: updatePageError } = await supabaseAdmin
          .from('pages')
          .update(pageUpdates)
          .eq('id', pageId)
          .select()
          .single()

        if (updatePageError) {
          return NextResponse.json({ error: updatePageError.message }, { status: 400 })
        }

        return NextResponse.json({ page: updatedPage })

      case 'getPageBySlug':
        const { data: pageBySlug, error: slugError } = await supabaseAdmin
          .from('pages')
          .select('*')
          .eq('slug', data.slug)
          .eq('site_id', data.siteId)
          .single()

        if (slugError) {
          return NextResponse.json({ error: slugError.message }, { status: 400 })
        }

        return NextResponse.json({ page: pageBySlug })

      case 'getPagesBySite':
        const { data: pagesBySite, error: siteError } = await supabaseAdmin
          .from('pages')
          .select('*')
          .eq('site_id', data.siteId)
          .order('created_at', { ascending: false })

        if (siteError) {
          return NextResponse.json({ error: siteError.message }, { status: 400 })
        }

        return NextResponse.json({ pages: pagesBySite || [] })

      case 'getPageBlocks':
        const { data: pageBlocks, error: getError } = await supabaseAdmin
          .from('page_blocks')
          .select('*')
          .eq('page_id', data.pageId)
          .order('order_index', { ascending: true })

        if (getError) {
          return NextResponse.json({ error: getError.message }, { status: 400 })
        }

        return NextResponse.json({ blocks: pageBlocks })

      case 'createPageBlock':
        const { data: newBlock, error: createError } = await supabaseAdmin
          .from('page_blocks')
          .insert([data])
          .select()
          .single()

        if (createError) {
          return NextResponse.json({ error: createError.message }, { status: 400 })
        }

        return NextResponse.json({ block: newBlock })

      case 'updatePageBlock':
        const { id, ...blockUpdates } = data
        const { data: updatedBlock, error: updateError } = await supabaseAdmin
          .from('page_blocks')
          .update(blockUpdates)
          .eq('id', id)
          .select()
          .single()

        if (updateError) {
          return NextResponse.json({ error: updateError.message }, { status: 400 })
        }

        return NextResponse.json({ block: updatedBlock })

      case 'deletePageBlock':
        const { error: deleteError } = await supabaseAdmin
          .from('page_blocks')
          .delete()
          .eq('id', data.id)

        if (deleteError) {
          return NextResponse.json({ error: deleteError.message }, { status: 400 })
        }

        return NextResponse.json({ success: true })

      case 'reorderPageBlocks':
        // Handle bulk reordering of blocks
        const { blocks: reorderBlocks } = data
        const reorderUpdates = reorderBlocks.map((block: any) => ({
          id: block.id,
          order_index: block.order
        }))

        const { error: reorderError } = await supabaseAdmin
          .from('page_blocks')
          .upsert(reorderUpdates, { onConflict: 'id' })

        if (reorderError) {
          return NextResponse.json({ error: reorderError.message }, { status: 400 })
        }

        return NextResponse.json({ success: true })

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
    const pageId = searchParams.get('pageId')
    const action = searchParams.get('action')

    if (action === 'getPageBlocks' && pageId) {
      const { data: blocks, error } = await supabaseAdmin
        .from('page_blocks')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index', { ascending: true })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ blocks })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
