'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react'
import { countries, heroStats } from '@/app/lib/portfolioData'
import { projectsData } from '@/app/lib/projectsData'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false, loading: () => (
  <div className="h-[500px] flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-[#00f0ff]/30 border-t-[#00f0ff] rounded-full animate-spin" />
  </div>
)})

export default function HeroPremium() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [litCountries, setLitCountries] = useState<string[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    countries.forEach((c, i) => {
      setTimeout(() => setLitCountries((prev) => [...prev, c.id]), 600 + i * 400)
    })
  }, [])

  const activeData = countries.find((c) => c.id === activeCountry)
  const activeProjects = activeData
    ? projectsData.filter((p) => activeData.projects.includes(p.slug))
    : []

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 aurora-bg" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -40 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/5 text-[#d4af37] text-sm">
            <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
            Available for Immediate Hire
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1]">
            <span className="text-white">Building </span>
            <span className="gradient-text">AI Systems</span>
            <span className="text-white">, Government Platforms & Enterprise Software Used Across </span>
            <span className="gradient-text-gold">Multiple Countries</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl">
            National-scale platforms with verified metrics —{' '}
            <span className="text-white font-semibold">22 tables</span>,{' '}
            <span className="text-white font-semibold">79 RLS policies</span>,{' '}
            <span className="text-white font-semibold">99.9% uptime</span>.
          </p>

          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <motion.button
                key={c.id}
                onClick={() => setActiveCountry(activeCountry === c.id ? null : c.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all duration-500 ${
                  litCountries.includes(c.id)
                    ? activeCountry === c.id
                      ? 'border-[#d4af37]/50 bg-[#d4af37]/15 text-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                      : 'border-[#00f0ff]/30 bg-[#00f0ff]/10 text-white'
                    : 'border-white/5 bg-white/5 text-gray-600'
                }`}
                animate={litCountries.includes(c.id) ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <span>{c.flag}</span>
                <span>{c.name}</span>
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-4 rounded-2xl text-center"
              >
                <div className="text-2xl md:text-3xl font-bold font-display text-white">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/case-studies/maoni" className="magnetic-btn px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-black font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all">
              <Sparkles size={18} />
              See the Proof
            </Link>
            <Link href="/contact" className="magnetic-btn px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#00f0ff]/50 transition-all">
              Book a Meeting
            </Link>
            <Link href="/resume" className="magnetic-btn px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-[#7b2ffc]/50 transition-all">
              Resume
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Globe3D
            activeCountry={activeCountry}
            onSelectCountry={(id) => setActiveCountry(activeCountry === id ? null : id)}
            height="500px"
          />

          {activeData && activeProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl border border-[#d4af37]/20"
            >
              <p className="text-sm text-gray-400 mb-2">{activeData.flag} {activeData.name} — {activeData.description}</p>
              <div className="flex flex-wrap gap-2">
                {activeProjects.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/case-studies/${p.slug}`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00f0ff]/30 transition flex items-center gap-1"
                    style={{ color: p.color }}
                  >
                    {p.title}
                    <ExternalLink size={10} />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowRight size={20} className="rotate-90 animate-bounce" />
      </div>
    </section>
  )
}
