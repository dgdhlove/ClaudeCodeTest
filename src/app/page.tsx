'use client'

import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import GlassCard from '@/components/ui/GlassCard'
import UrlInputForm from '@/components/proposal/UrlInputForm'
import ProposalOutput from '@/components/proposal/ProposalOutput'
import ProposalLoading from '@/components/proposal/ProposalLoading'

export default function Home() {
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 제안서 생성기</h1>
        <p className="text-gray-500 text-sm">URL을 입력하면 AI가 전문적인 비즈니스 제안서를 자동으로 작성합니다.</p>
      </div>

      {/* Input Card */}
      <GlassCard>
        <h2 className="font-semibold text-gray-900 mb-4 text-sm">웹사이트 URL 입력</h2>
        <UrlInputForm onResult={setProposal} onLoading={setLoading} />
      </GlassCard>

      {/* Output */}
      {loading && <ProposalLoading />}
      {!loading && proposal && <ProposalOutput proposal={proposal} />}

      {/* Empty state */}
      {!loading && !proposal && (
        <div className="mt-8 text-center py-16 text-gray-400 text-sm">
          URL을 입력하고 제안서 생성 버튼을 눌러주세요
        </div>
      )}
    </PageWrapper>
  )
}
