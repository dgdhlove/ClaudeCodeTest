import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('proposals')
    .select('id, source_url, result, created_at')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: '목록을 불러오지 못했습니다' }, { status: 500 })
  }

  return NextResponse.json({ proposals: data })
}
