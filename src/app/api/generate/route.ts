import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { fetchPageContent } from '@/lib/fetchPageContent'
import { generateProposal } from '@/lib/openrouter'

export const maxDuration = 60

const DEFAULT_PROMPT = `당신은 전문 비즈니스 제안서 작성 전문가입니다. 제공된 웹사이트 내용을 바탕으로 구조화된 한국어 비즈니스 제안서를 작성하세요. 다음 항목을 포함하세요: 요약, 문제 정의, 제안 솔루션, 가치 제안, 구현 일정, 예상 비용. 마크다운 형식(## 헤더 사용)으로 작성하고 전문적이고 간결하게 작성하세요.`

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL이 필요합니다' }, { status: 400 })
    }

    const supabase = getSupabase()

    // 1. Get base prompt from Supabase
    const { data: promptData } = await supabase
      .from('prompt_config')
      .select('base_prompt')
      .eq('id', 1)
      .single()
    const systemPrompt = promptData?.base_prompt || DEFAULT_PROMPT

    // 2. Fetch page content
    const pageContent = await fetchPageContent(url)

    // 3. Generate proposal via OpenRouter
    const proposal = await generateProposal(pageContent, systemPrompt)

    // 4. Save to Supabase
    const { data: saved, error: saveError } = await supabase
      .from('proposals')
      .insert({
        source_url: url,
        page_content: pageContent,
        prompt_used: systemPrompt,
        result: proposal,
      })
      .select('id')
      .single()

    if (saveError) {
      console.error('Supabase save error:', saveError)
    }

    return NextResponse.json({ proposal, id: saved?.id || null })
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
