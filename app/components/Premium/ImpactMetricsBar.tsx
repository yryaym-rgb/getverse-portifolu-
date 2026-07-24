'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { impactMetrics } from '@/app/lib/portfolioData'

export default function ImpactMetricsBar() {
  return (
    <section className="py-12 px-4 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {impactMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold font-display text-white">{metric.value}</div>
              <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Simplified hero for recruiter mode */
export function RecruiterHero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 pt-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] text-xs uppercase tracking-wider">
          Recruiter Mode
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight text-white">
          Abdul Malik Lakho
        </h1>
        <p className="text-xl text-gray-300">
          Full Stack AI Developer — Government Systems Architect
        </p>
        <p className="text-gray-400 max-w-xl mx-auto">
          18+ production systems · 5 countries · 99.9% uptime · Trusted by DRC Presidential Office
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/resume" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-black font-semibold text-sm">
            View Resume
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-[#00f0ff]/40 transition">
            Book a Meeting
          </Link>
        </div>
      </div>
    </section>
  )
}
