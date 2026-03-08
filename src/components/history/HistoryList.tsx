'use client'

import { useEffect, useState } from 'react'
import { Proposal } from '@/types'
import HistoryItem from './HistoryItem'

export default function HistoryList() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/proposals')
      .then((r) => r.json())
      .then((d) => {
        setProposals(d.proposals || [])
        setLoading(false)
      })
      .catch(() => {
        setError('목록을 불러오지 못했습니다')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-white/60 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>
  }

  if (proposals.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        아직 생성된 제안서가 없습니다
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {proposals.map((p) => (
        <HistoryItem key={p.id} proposal={p} />
      ))}
    </div>
  )
}
