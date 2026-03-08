import { ReactNode } from 'react'

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {children}
    </main>
  )
}
