'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/app/lib/portfolioData'

export default function AnimatedSkills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="text-center mb-12">
          <span className="text-[#7b2ffc] text-sm font-medium tracking-widest uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Animated <span className="gradient-text">Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <div key={skill.name} className="glass-card p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">{skill.name}</span>
                <span className="font-mono text-sm" style={{ color: skill.color }}>{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: i * 0.1, duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
