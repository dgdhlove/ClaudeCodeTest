'use client'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'

interface ProposalOutputProps {
  proposal: string
}

export default function ProposalOutput({ proposal }: ProposalOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(proposal)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <GlassCard className="mt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-gray-900">생성된 제안서</h2>
        <Button variant="outline" onClick={handleCopy} className="text-xs px-3 py-1.5 h-auto">
          {copied ? '복사됨 ✓' : '복사'}
        </Button>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
        {proposal}
      </div>
    </GlassCard>
  )
}
