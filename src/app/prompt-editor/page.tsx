import PageWrapper from '@/components/layout/PageWrapper'
import PromptEditor from '@/components/prompt/PromptEditor'

export default function PromptEditorPage() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">프롬프트 편집</h1>
        <p className="text-gray-500 text-sm">AI가 제안서를 생성할 때 사용하는 기본 지시문을 수정합니다.</p>
      </div>
      <PromptEditor />
    </PageWrapper>
  )
}
