'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Cloud, Monitor, Server, Database, Brain, BarChart3 } from 'lucide-react'
import { architectureLayers } from '@/app/lib/portfolioData'

const layerIcons: Record<string, React.ReactNode> = {
  user: <User size={20} />,
  cloud: <Cloud size={20} />,
  monitor: <Monitor size={20} />,
  server: <Server size={20} />,
  database: <Database size={20} />,
  brain: <Brain size={20} />,
  chart: <BarChart3 size={20} />,
}

export default function ArchitectureShowcase() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  return (
    <section id="architecture" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm font-medium tracking-widest uppercase">System Design</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Interactive <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-gray-400 mt-4">Animated architecture diagrams for every production system.</p>
        </div>

        <div className="glass rounded-3xl border border-white/5 p-8">
          <svg viewBox="0 0 300 500" className="w-full max-w-xs mx-auto">
            {architectureLayers.map((layer, i) => {
              const y = 30 + i * 65
              const isActive = activeLayer === i
              return (
                <g key={layer.name}>
                  {i < architectureLayers.length - 1 && (
                    <motion.line
                      x1="150" y1={y + 35}
                      x2="150" y2={y + 65}
                      stroke={isActive ? layer.color : 'rgba(255,255,255,0.1)'}
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                    />
                  )}
                  <motion.rect
                    x="50" y={y}
                    width="200" height="50"
                    rx="12"
                    fill={isActive ? `${layer.color}20` : 'rgba(255,255,255,0.03)'}
                    stroke={isActive ? layer.color : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isActive ? 2 : 1}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  />
                  <text x="150" y={y + 30} textAnchor="middle" fill={isActive ? layer.color : '#9ca3af'} fontSize="14" fontWeight="600">
                    {layer.name}
                  </text>
                </g>
              )
            })}
          </svg>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {architectureLayers.map((layer, i) => (
              <button
                key={layer.name}
                onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                  activeLayer === i ? 'border-white/30 bg-white/10' : 'border-white/5 text-gray-500'
                }`}
                style={activeLayer === i ? { color: layer.color, borderColor: `${layer.color}50` } : {}}
              >
                {layerIcons[layer.icon]}
                {layer.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
