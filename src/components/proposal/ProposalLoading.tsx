import GlassCard from '@/components/ui/GlassCard'

export default function ProposalLoading() {
  return (
    <GlassCard className="mt-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-5 h-5 border-2 border-gray-200 border-t-coral rounded-full animate-spin" />
        <span className="text-sm font-medium text-gray-500">AI가 제안서를 작성하고 있습니다...</span>
      </div>
      <div className="space-y-3">
        {[80, 60, 90, 50, 70].map((w, i) => (
          <div
            key={i}
            className="h-3 bg-gray-100 rounded-full animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </GlassCard>
  )
}
