import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/layout/NavBar'

export const metadata: Metadata = {
  title: 'AI 제안서 생성기',
  description: 'URL을 입력하면 AI가 전문적인 제안서를 자동으로 생성합니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  )
}
