'use client'

import { motion } from 'framer-motion'
import { Database, Code, Shield, Globe, Layers, Server } from 'lucide-react'
import { engineeringScale } from '@/app/lib/portfolioData'

const icons: Record<string, React.ReactNode> = {
  database: <Database size={20} />,
  api: <Server size={20} />,
  code: <Code size={20} />,
  shield: <Shield size={20} />,
  globe: <Globe size={20} />,
  layers: <Layers size={20} />,
}

export default function EngineeringMetrics() {
  return (
    <section id="engineering-scale" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#d4af37] text-sm font-medium tracking-widest uppercase">Verified Scale</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Engineering <span className="gradient-text-gold">Metrics</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm">Concrete numbers from production systems — not estimates.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {engineeringScale.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 rounded-2xl border border-white/5"
            >
              <div className="text-[#00f0ff] mb-3">{icons[item.icon]}</div>
              <div className="text-2xl md:text-3xl font-bold font-display text-white">{item.value}</div>
              <div className="text-sm text-gray-400 mt-1">{item.label}</div>
              <div className="text-xs text-gray-600 mt-1">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
