import PageWrapper from '@/components/layout/PageWrapper'
import HistoryList from '@/components/history/HistoryList'

export default function HistoryPage() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">제안서 히스토리</h1>
        <p className="text-gray-500 text-sm">최근 생성된 제안서 20개를 확인합니다.</p>
      </div>
      <HistoryList />
    </PageWrapper>
  )
}
