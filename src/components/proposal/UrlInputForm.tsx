'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface UrlInputFormProps {
  onResult: (proposal: string) => void
  onLoading: (loading: boolean) => void
}

export default function UrlInputForm({ onResult, onLoading }: UrlInputFormProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('http:// 또는 https://로 시작하는 URL을 입력해 주세요')
      return
    }

    setLoading(true)
    onLoading(true)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '제안서 생성에 실패했습니다')
      onResult(data.proposal)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setLoading(false)
      onLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          error={error}
          disabled={loading}
        />
      </div>
      <Button type="submit" loading={loading} className="shrink-0 h-[42px]">
        제안서 생성
      </Button>
    </form>
  )
}
