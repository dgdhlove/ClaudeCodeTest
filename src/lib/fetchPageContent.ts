export async function fetchPageContent(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ProposalBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      return `[URL 가져오기 실패: HTTP ${res.status}]`
    }

    const html = await res.text()

    // Remove script, style, nav, footer, header blocks
    let text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<header[\s\S]*?<\/header>/gi, '')

    // Strip remaining HTML tags
    text = text.replace(/<[^>]+>/g, ' ')

    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")

    // Collapse whitespace
    text = text.replace(/\s+/g, ' ').trim()

    // Truncate to ~8000 chars
    if (text.length > 8000) {
      text = text.slice(0, 8000) + '...'
    }

    return text || '[페이지 내용을 추출할 수 없습니다]'
  } catch {
    return '[URL 가져오기 오류: 접근할 수 없는 URL입니다]'
  }
}
