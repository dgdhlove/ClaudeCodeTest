import { NextRequest, NextResponse } from 'next/server'
import { fetchPageContent } from '@/lib/fetchPageContent'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL이 필요합니다' }, { status: 400 })
    }
    const content = await fetchPageContent(url)
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다' }, { status: 500 })
  }
}
