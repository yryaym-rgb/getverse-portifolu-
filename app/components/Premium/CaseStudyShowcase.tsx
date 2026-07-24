'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Server, ExternalLink, Github } from 'lucide-react'
import { caseStudyDocs } from '@/app/lib/portfolioData'

export default function CaseStudyShowcase() {
  const [active, setActive] = useState(0)
  const study = caseStudyDocs[active]

  return (
    <section id="case-studies" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#ff6b35] text-sm font-medium tracking-widest uppercase">Mini Documentaries</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-gray-400 mt-4">Every project tells a story — problem, challenge, architecture, security, performance, results.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {caseStudyDocs.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === i
                  ? 'bg-white/10 border border-white/20 text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
              style={active === i ? { borderColor: s.color, color: s.color } : {}}
            >
              {s.title}
            </button>
          ))}
        </div>

        <motion.div
          key={study.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl border border-white/5 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto min-h-[300px]">
              <Image src={study.image} alt={study.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold font-display text-white">{study.title}</h3>
                <p className="text-gray-300">{study.subtitle}</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <DocStep label="Problem" value={study.problem} color="#ff6b35" />
              <DocStep label="Challenge" value={study.challenge} color="#7b2ffc" />
              <DocStep label="Architecture" tags={study.architecture} color="#00f0ff" />
              <DocStep label="Security" tags={study.security} color="#d4af37" icon={<Shield size={14} />} />
              <DocStep label="Performance" value={study.performance} color="#00f0ff" icon={<Zap size={14} />} />
              <DocStep label="Results" value={study.results} color="#7b2ffc" />

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/case-studies/${study.slug}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f0ff]/30 text-sm transition">
                  Full Case Study <ArrowRight size={14} />
                </Link>
                {study.link && study.link !== '#' && (
                  <a href={study.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#7b2ffc]/30 text-sm transition">
                    Live Demo <ExternalLink size={14} />
                  </a>
                )}
                <a href={study.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-sm transition">
                  <Github size={14} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function DocStep({
  label,
  value,
  tags,
  color,
  icon,
}: {
  label: string
  value?: string
  tags?: string[]
  color: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${color}20`, color }}>
          {icon || <Server size={14} />}
        </div>
        <div className="w-px flex-1 bg-white/5 mt-1" />
      </div>
      <div className="pb-2 flex-1">
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</div>
        {value && <p className="text-gray-300 text-sm">{value}</p>}
        {tags && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-white/5 border border-white/10" style={{ color }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
