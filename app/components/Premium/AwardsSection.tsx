'use client'

import { motion } from 'framer-motion'
import { Laptop, Award, FileCheck, Trophy } from 'lucide-react'
import { awards } from '@/app/lib/portfolioData'

const icons: Record<string, React.ReactNode> = {
  laptop: <Laptop size={24} />,
  award: <Award size={24} />,
  certificate: <FileCheck size={24} />,
  trophy: <Trophy size={24} />,
}

export default function AwardsSection() {
  return (
    <section id="awards" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#d4af37] text-sm font-medium tracking-widest uppercase">Recognition</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Awards & <span className="gradient-text-gold">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass-card p-6 rounded-2xl border border-white/5 group cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${award.color}15`, color: award.color }}
              >
                {icons[award.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white">{award.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{award.org}</p>
              <span className="inline-block mt-3 text-xs px-2 py-1 rounded-full bg-white/5 text-gray-500">{award.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
