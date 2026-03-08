'use client'

import { useEffect, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

export default function PromptEditor() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/prompt')
      .then((r) => r.json())
      .then((d) => {
        setPrompt(d.base_prompt || '')
        setLoading(false)
      })
      .catch(() => {
        setError('프롬프트를 불러오지 못했습니다')
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setError('')
    setSaving(true)
    try {
      const res = await fetch('/api/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base_prompt: prompt }),
      })
      if (!res.ok) throw new Error('저장 실패')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('저장에 실패했습니다')
    } finally {
      setSaving(false)
    }
  }

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-gray-900">기본 AI 프롬프트</h2>
          <p className="text-xs text-gray-500 mt-0.5">제안서 생성 시 사용되는 시스템 프롬프트입니다</p>
        </div>
        <Button onClick={handleSave} loading={saving} className="text-sm">
          {saved ? '저장됨 ✓' : '저장'}
        </Button>
      </div>

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      {loading ? (
        <div className="h-48 bg-gray-100 rounded-xl animate-pulse" />
      ) : (
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={10}
          placeholder="AI 프롬프트를 입력하세요..."
          className="font-mono text-xs"
        />
      )}
    </GlassCard>
  )
}
