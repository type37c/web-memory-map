import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient()
  
  // Get map with nodes and edges
  const { data: map, error: mapError } = await supabase
    .from('maps')
    .select('*')
    .eq('id', id)
    .single()

  if (mapError || !map) {
    return NextResponse.json({ error: 'Map not found' }, { status: 404 })
  }

  const { data: nodes } = await supabase
    .from('nodes')
    .select('*')
    .eq('map_id', id)

  const { data: edges } = await supabase
    .from('edges')
    .select('*')
    .eq('map_id', id)

  return NextResponse.json({
    ...map,
    nodes: nodes || [],
    edges: edges || []
  })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient()
  const updates = await request.json()

  const { data, error } = await supabase
    .from('maps')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ map: data })
}