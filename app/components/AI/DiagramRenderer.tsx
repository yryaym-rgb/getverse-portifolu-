'use client'

import { useState } from 'react'
import { Server, Database, Cloud, Shield, ArrowRight } from 'lucide-react'

interface DiagramRendererProps {
  layers: string[]
  connections: Array<{ from: string; to: string }>
}

export default function DiagramRenderer({ layers, connections }: DiagramRendererProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getIcon = (layer: string) => {
    if (layer.includes('Frontend') || layer.includes('React') || layer.includes('Next.js')) {
      return <Server size={20} className="text-[#00f0ff]" />
    }
    if (layer.includes('Database') || layer.includes('PostgreSQL') || layer.includes('Redis')) {
      return <Database size={20} className="text-[#7b2ffc]" />
    }
    if (layer.includes('API') || layer.includes('FastAPI') || layer.includes('Backend')) {
      return <Cloud size={20} className="text-[#ff6b35]" />
    }
    if (layer.includes('Security') || layer.includes('Auth') || layer.includes('Shield')) {
      return <Shield size={20} className="text-emerald-400" />
    }
    return <Server size={20} className="text-gray-400" />
  }

  const getColor = (layer: string) => {
    if (layer.includes('Frontend') || layer.includes('React') || layer.includes('Next.js')) {
      return 'border-[#00f0ff]/30 bg-[#00f0ff]/5'
    }
    if (layer.includes('Database') || layer.includes('PostgreSQL') || layer.includes('Redis')) {
      return 'border-[#7b2ffc]/30 bg-[#7b2ffc]/5'
    }
    if (layer.includes('API') || layer.includes('FastAPI') || layer.includes('Backend')) {
      return 'border-[#ff6b35]/30 bg-[#ff6b35]/5'
    }
    if (layer.includes('Security') || layer.includes('Auth') || layer.includes('Shield')) {
      return 'border-emerald-400/30 bg-emerald-500/5'
    }
    return 'border-gray-700 bg-white/5'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`w-full max-w-md p-3 rounded-xl border ${getColor(layer)} transition-all duration-300 ${
              hoveredNode === layer ? 'scale-105 shadow-lg' : ''
            }`}
            onMouseEnter={() => setHoveredNode(layer)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div className="flex items-center gap-3">
              {getIcon(layer)}
              <span className="text-sm text-white font-medium">{layer}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Server size={12} className="text-[#00f0ff]" />
          Frontend
        </span>
        <span className="flex items-center gap-1">
          <Cloud size={12} className="text-[#ff6b35]" />
          Backend
        </span>
        <span className="flex items-center gap-1">
          <Database size={12} className="text-[#7b2ffc]" />
          Database
        </span>
        <span className="flex items-center gap-1">
          <Shield size={12} className="text-emerald-400" />
          Security
        </span>
      </div>
    </div>
  )
}