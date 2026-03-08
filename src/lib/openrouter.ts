export async function generateProposal(
  pageContent: string,
  systemPrompt: string
): Promise<string> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': appUrl,
      'X-Title': 'AI Proposal Generator',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-4-6',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `다음은 웹사이트 내용입니다:\n\n${pageContent}\n\n이 내용을 바탕으로 전문적인 제안서를 작성해 주세요.`,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenRouter 오류: ${res.status} ${err}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('응답에서 내용을 찾을 수 없습니다')
  return content
}
