'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Server, Shield, Globe, Brain } from 'lucide-react'
import { timeline } from '@/app/lib/portfolioData'

const icons: Record<string, React.ReactNode> = {
  code: <Code size={20} />,
  server: <Server size={20} />,
  shield: <Shield size={20} />,
  globe: <Globe size={20} />,
  brain: <Brain size={20} />,
}

export default function GovernmentTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="timeline" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#7b2ffc]/5 to-transparent" />
      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <span className="text-[#7b2ffc] text-sm font-medium tracking-widest uppercase">Career Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Government <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00f0ff] via-[#7b2ffc] to-[#d4af37] md:-translate-x-px" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex items-center gap-8 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0`}>
                <div className="glass-card p-6 rounded-2xl border border-white/5 inline-block text-left w-full md:max-w-md">
                  <span className="text-[#d4af37] font-bold text-2xl font-display">{item.year}</span>
                  <h3 className="text-xl font-semibold text-white mt-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                </div>
              </div>

              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-2 border-[#00f0ff] flex items-center justify-center text-[#00f0ff] z-10 shadow-lg shadow-[#00f0ff]/20">
                {icons[item.icon]}
              </div>

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
