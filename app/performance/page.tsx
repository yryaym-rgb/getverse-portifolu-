'use client'

import { motion } from 'framer-motion'
import { Gauge, Accessibility, Search, ShieldCheck } from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { lighthouseScores } from '../lib/portfolioData'

const scoreIcons = [
  <Gauge key="perf" size={24} />,
  <Accessibility key="a11y" size={24} />,
  <Search key="seo" size={24} />,
  <ShieldCheck key="bp" size={24} />,
]

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-6">
            <Gauge size={14} />
            Lighthouse Scores
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display">
            Performance <span className="gradient-text">Report</span>
          </h1>
          <p className="text-gray-400 mt-4">Perfect scores across all Lighthouse categories — Vercel-grade performance.</p>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {lighthouseScores.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/5 text-center"
            >
              <div className="flex justify-center mb-3" style={{ color: item.color }}>
                {scoreIcons[i]}
              </div>
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <motion.circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke={item.color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${item.score} 100`}
                    initial={{ strokeDasharray: '0 100' }}
                    whileInView={{ strokeDasharray: `${item.score} 100` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.15 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold font-display" style={{ color: item.color }}>
                  {item.score}
                </div>
              </div>
              <div className="text-sm text-gray-400">{item.name}</div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 glass rounded-3xl border border-white/5 p-8">
          <h2 className="text-xl font-bold font-display text-white mb-4">Optimization Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            {[
              'Next.js App Router with static generation',
              'Image optimization with next/image',
              'Code splitting & dynamic imports for 3D',
              'Font display swap for zero layout shift',
              'Reduced motion support for accessibility',
              'Edge caching via Cloudflare CDN',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
