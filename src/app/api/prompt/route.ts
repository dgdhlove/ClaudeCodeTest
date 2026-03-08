import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('prompt_config')
    .select('base_prompt')
    .eq('id', 1)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: '프롬프트를 불러오지 못했습니다' }, { status: 500 })
  }

  return NextResponse.json({ base_prompt: data.base_prompt })
}

export async function POST(req: NextRequest) {
  const { base_prompt } = await req.json()

  if (!base_prompt || typeof base_prompt !== 'string') {
    return NextResponse.json({ error: '프롬프트 내용이 필요합니다' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase
    .from('prompt_config')
    .upsert({ id: 1, base_prompt, updated_at: new Date().toISOString() })

  if (error) {
    return NextResponse.json({ error: '저장에 실패했습니다' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
