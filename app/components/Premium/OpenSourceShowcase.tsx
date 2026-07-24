'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Package, Wrench, Shield, ExternalLink } from 'lucide-react'
import { openSourceShowcase } from '@/app/lib/portfolioData'

const typeIcons: Record<string, React.ReactNode> = {
  template: <Package size={18} />,
  boilerplate: <Wrench size={18} />,
  tool: <Wrench size={18} />,
  security: <Shield size={18} />,
}

export default function OpenSourceShowcase() {
  return (
    <section id="open-source" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">Beyond Client Work</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Open Source & <span className="gradient-text">Tools</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {openSourceShowcase.contributions.map((c, i) => (
            <div key={c.label} className="glass-card p-4 rounded-2xl border border-white/5 text-center">
              <div className="text-xl font-bold font-display text-white">{c.value}</div>
              <div className="text-xs text-gray-500 mt-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {openSourceShowcase.highlights.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5 rounded-2xl border border-white/5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#00f0ff]">{typeIcons[item.type]}</span>
                <span className="font-semibold text-white text-sm">{item.name}</span>
              </div>
              <p className="text-xs text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={openSourceShowcase.githubUrl}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f0ff]/30 text-sm transition"
          >
            <Github size={18} />
            @{openSourceShowcase.username}
            <ExternalLink size={12} className="text-gray-500" />
          </Link>
        </div>
      </div>
    </section>
  )
}
