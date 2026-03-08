import { Proposal } from '@/types'
import GlassCard from '@/components/ui/GlassCard'

interface HistoryItemProps {
  proposal: Proposal
}

export default function HistoryItem({ proposal }: HistoryItemProps) {
  const date = new Date(proposal.created_at).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
  const preview = proposal.result.slice(0, 150) + (proposal.result.length > 150 ? '...' : '')

  return (
    <GlassCard className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-2">
        <a
          href={proposal.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-coral hover:underline truncate max-w-xs"
        >
          {proposal.source_url}
        </a>
        <span className="text-xs text-gray-400 shrink-0">{date}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{preview}</p>
    </GlassCard>
  )
}
