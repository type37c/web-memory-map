import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createSupabaseServerClient()
  
  const { data: maps, error } = await supabase
    .from('maps')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ maps })
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient()
  const { name, is_public = false } = await request.json()

  // For anonymous users, create without user_id
  const { data: map, error } = await supabase
    .from('maps')
    .insert({
      name,
      is_public,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ map })
}