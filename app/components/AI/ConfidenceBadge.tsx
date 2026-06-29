'use client'

interface ConfidenceBadgeProps {
  score: number
  reasoning?: string
  className?: string
}

export default function ConfidenceBadge({ score, reasoning, className = '' }: ConfidenceBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    return 'text-red-400 bg-red-500/10 border-red-500/20'
  }

  const getLabel = (score: number) => {
    if (score >= 90) return 'High Confidence'
    if (score >= 70) return 'Medium Confidence'
    return 'Low Confidence'
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getColor(score)} ${className}`}>
      <span className="text-sm font-medium">{score}%</span>
      <span className="text-xs">{getLabel(score)}</span>
      {reasoning && (
        <div className="relative group">
          <button className="text-xs text-gray-400 hover:text-white transition">ⓘ</button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-black/90 border border-white/10 text-xs text-gray-300 w-48 opacity-0 group-hover:opacity-100 transition pointer-events-none">
            {reasoning}
          </div>
        </div>
      )}
    </div>
  )
}