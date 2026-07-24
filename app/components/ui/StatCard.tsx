interface StatCardProps {
  label: string
  value: string
  color?: string
}

export default function StatCard({ label, value, color = '#00f0ff' }: StatCardProps) {
  return (
    <div className="glass p-4 rounded-2xl text-center border border-white/5">
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <p className="text-gray-400 text-xs mt-1">{label}</p>
    </div>
  )
}
