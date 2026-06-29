'use client'

import { useState, useEffect } from 'react'
import { Zap, Clock, Shield, TrendingUp, BarChart3 } from 'lucide-react'

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState([
    { label: 'Load Time', value: 0, target: 1.2, unit: 's', icon: <Clock size={16} />, color: '#00f0ff' },
    { label: 'Performance Score', value: 0, target: 98, unit: '%', icon: <Zap size={16} />, color: '#7b2ffc' },
    { label: 'Accessibility', value: 0, target: 100, unit: '%', icon: <Shield size={16} />, color: '#ff6b35' },
    { label: 'SEO Score', value: 0, target: 100, unit: '%', icon: <TrendingUp size={16} />, color: '#00f0ff' },
  ])

  useEffect(() => {
    const duration = 2000
    const steps = 40
    let step = 0

    const targets = [
      { value: 1.2, unit: 's' },
      { value: 98, unit: '%' },
      { value: 100, unit: '%' },
      { value: 100, unit: '%' },
    ]

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      setMetrics(prev => prev.map((metric, i) => ({
        ...metric,
        value: Math.round(targets[i].value * eased * 10) / 10
      })))

      if (step >= steps) {
        setMetrics(prev => prev.map((metric, i) => ({
          ...metric,
          value: targets[i].value
        })))
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const overallScore = Math.round(metrics.reduce((acc, m) => acc + (m.value / m.target) * 100, 0) / metrics.length)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 size={18} className="text-[#00f0ff]" />
          Performance Metrics
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Overall</span>
          <span className="text-2xl font-bold gradient-text">{overallScore}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="glass p-4 rounded-xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span style={{ color: metric.color }}>{metric.icon}</span>
                <span className="text-gray-400 text-xs">{metric.label}</span>
              </div>
              <span className="text-white font-bold" style={{ color: metric.color }}>
                {metric.value}{metric.unit}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                  background: metric.color
                }}
              />
            </div>
            <p className="text-gray-500 text-[10px] mt-1">Target: {metric.target}{metric.unit}</p>
          </div>
        ))}
      </div>
    </div>
  )
}