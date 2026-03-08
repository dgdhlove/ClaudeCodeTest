'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: '홈' },
  { href: '/history', label: '히스토리' },
  { href: '/prompt-editor', label: '프롬프트 편집' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-gray-900 text-sm tracking-tight">
          AI 제안서 생성기
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'text-coral bg-coral/5'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
