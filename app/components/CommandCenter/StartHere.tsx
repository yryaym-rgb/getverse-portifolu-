'use client'

import Link from 'next/link'
import { ArrowRight, FileText, MessageSquare, Shield, Sparkles } from 'lucide-react'

const steps = [
  {
    step: '01',
    title: 'See the proof',
    description: 'MAONI — national platform built for the DRC Presidential Office. ARPTC — 3,500+ towers mapped.',
    href: '/case-studies/maoni',
    icon: <Shield size={22} />,
    color: '#00f0ff',
    cta: 'Read MAONI case study',
  },
  {
    step: '02',
    title: 'Ask my engineering brain',
    description: 'Digital Twin answers questions about architecture, system design, and how I build at scale.',
    href: '/digital-twin',
    icon: <Sparkles size={22} />,
    color: '#7b2ffc',
    cta: 'Talk to Digital Twin',
  },
  {
    step: '03',
    title: 'Let\'s work together',
    description: 'Download my resume or send a message. I respond within 24 hours.',
    href: '/contact',
    icon: <MessageSquare size={22} />,
    color: '#ff6b35',
    cta: 'Hire me',
  },
]

export default function StartHere() {
  return (
    <section className="py-20 px-4 border-t border-white/5" aria-labelledby="start-here-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <ArrowRight size={14} />
            Start Here
          </div>
          <h2 id="start-here-heading" className="text-3xl md:text-4xl font-bold">
            Your <span className="gradient-text">3-step</span> tour
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Recruiters spend 30 seconds. Follow this path to see what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => (
            <Link
              key={item.step}
              href={item.href}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all"
            >
              <span className="text-xs font-mono text-gray-500 tracking-widest">{item.step}</span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mt-3 mb-4 group-hover:scale-110 transition"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00f0ff] opacity-0 group-hover:opacity-100 transition">
                {item.cta} <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 text-white font-semibold hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition"
          >
            <FileText size={18} />
            Download Resume
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition"
          >
            View all 18+ projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
