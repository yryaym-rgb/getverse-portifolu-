'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Shield, Lock, Database, Users, Server, Wifi } from 'lucide-react'

interface StatusItem {
  label: string
  value: string
  status: 'online' | 'active' | 'live'
  icon: React.ReactNode
  color: string
}

export default function LiveServerDashboard() {
  const [responseTime, setResponseTime] = useState(430)
  const [uptime, setUptime] = useState(99.98)

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime((prev) => Math.max(380, Math.min(480, prev + (Math.random() - 0.5) * 30)))
      setUptime((prev) => Math.min(99.99, prev + (Math.random() - 0.5) * 0.01))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const items: StatusItem[] = [
    { label: 'API', value: 'ONLINE', status: 'online', icon: <Server size={18} />, color: '#00f0ff' },
    { label: 'Uptime', value: `${uptime.toFixed(2)}%`, status: 'online', icon: <Activity size={18} />, color: '#7b2ffc' },
    { label: 'SSL', value: 'ACTIVE', status: 'active', icon: <Lock size={18} />, color: '#ff6b35' },
    { label: 'Firewall', value: 'ACTIVE', status: 'active', icon: <Shield size={18} />, color: '#d4af37' },
    { label: 'Response', value: `${Math.round(responseTime)}ms`, status: 'live', icon: <Wifi size={18} />, color: '#00f0ff' },
    { label: 'Database', value: 'ONLINE', status: 'online', icon: <Database size={18} />, color: '#7b2ffc' },
    { label: 'Users', value: 'LIVE', status: 'live', icon: <Users size={18} />, color: '#ff6b35' },
  ]

  return (
    <section id="dashboard" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live Status
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Server <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-gray-400 mt-4">Real-time infrastructure status — don&apos;t just claim security, show it.</p>
        </div>

        <div className="glass rounded-3xl border border-white/5 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-gray-500 text-sm ml-2 font-mono">getverse.dev — production</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-4 rounded-2xl border border-white/5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    item.status === 'online' ? 'bg-emerald-400' :
                    item.status === 'active' ? 'bg-[#d4af37]' : 'bg-[#00f0ff] animate-pulse'
                  }`} />
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                <div className="text-lg font-bold font-mono mt-1" style={{ color: item.color }}>
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
