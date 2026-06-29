'use client'

import { useState } from 'react'
import { Server, Database, Cloud, Brain, Shield, GitBranch } from 'lucide-react'

export default function MicroservicesMap() {
  const [selected, setSelected] = useState<string | null>(null)

  const services = [
    { name: 'API Gateway', icon: <Shield size={16} />, color: '#00f0ff', status: 'healthy', dependencies: ['Auth', 'Projects'] },
    { name: 'Auth Service', icon: <Shield size={16} />, color: '#7b2ffc', status: 'healthy', dependencies: ['Database'] },
    { name: 'Projects Service', icon: <Server size={16} />, color: '#ff6b35', status: 'healthy', dependencies: ['Database', 'Cache'] },
    { name: 'Analytics Service', icon: <Brain size={16} />, color: '#00f0ff', status: 'healthy', dependencies: ['Database', 'AI'] },
    { name: 'AI Service', icon: <Brain size={16} />, color: '#7b2ffc', status: 'degraded', dependencies: ['Database'] },
    { name: 'Database', icon: <Database size={16} />, color: '#ff6b35', status: 'healthy', dependencies: [] },
    { name: 'Cache (Redis)', icon: <Database size={16} />, color: '#00f0ff', status: 'healthy', dependencies: [] },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-emerald-500'
      case 'degraded': return 'bg-yellow-500'
      case 'down': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return '✅ Healthy'
      case 'degraded': return '⚠️ Degraded'
      case 'down': return '❌ Down'
      default: return 'Unknown'
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <GitBranch size={18} className="text-[#00f0ff]" />
        Microservices Architecture
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {services.map((service, i) => (
          <div
            key={i}
            className={`glass p-3 rounded-xl border transition-all cursor-pointer ${
              selected === service.name 
                ? 'border-[#00f0ff]/50 bg-[#00f0ff]/5' 
                : 'border-white/5 hover:border-[#00f0ff]/20'
            }`}
            onClick={() => setSelected(selected === service.name ? null : service.name)}
          >
            <div className="flex items-center gap-2">
              <span style={{ color: service.color }}>{service.icon}</span>
              <span className="text-white text-sm font-medium">{service.name}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(service.status)}`} />
              <span className="text-xs text-gray-400">{getStatusText(service.status)}</span>
            </div>
            {selected === service.name && service.dependencies.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/5">
                <p className="text-[10px] text-gray-500">Dependencies:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {service.dependencies.map((dep, j) => (
                    <span key={j} className="px-1.5 py-0.5 rounded bg-white/5 text-gray-400 text-[10px]">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Degraded</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Down</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-400">Click a service to see dependencies</span>
      </div>
    </div>
  )
}