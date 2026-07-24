'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Linkedin } from 'lucide-react'
import { testimonials } from '@/app/lib/portfolioData'

export default function TestimonialsPremium() {
  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#ff6b35] text-sm font-medium tracking-widest uppercase">Client Voices</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            <span className="gradient-text">Testimonials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#00f0ff] flex items-center justify-center text-lg font-bold text-black">
                  {t.flag}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.author}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
                <span className="ml-auto text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">{t.type}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              {t.linkedin !== '#' && (
                <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 text-xs text-[#00f0ff] hover:underline">
                  <Linkedin size={12} /> LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectVideos() {
  const featured = [
    { title: 'MAONI', image: '/images/projects/maoni-dashboard.png', color: '#00f0ff' },
    { title: 'ARPTC', image: '/images/projects/arptc-tower-map.png', color: '#7b2ffc' },
    { title: 'Selzara', image: '/images/projects/selzara-dashboard.png', color: '#ff6b35' },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-center text-2xl font-bold font-display mb-8">
          Project <span className="gradient-text">Showcase</span>
          <span className="block text-sm text-gray-500 font-normal mt-1">Hover to preview</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <div key={p.title} className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer">
              <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <span className="font-semibold" style={{ color: p.color }}>{p.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CodePlaygroundCTA() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center glass rounded-3xl border border-white/5 p-10">
        <h3 className="text-2xl font-bold font-display mb-2">
          Live <span className="gradient-text">Code Playground</span>
        </h3>
        <p className="text-gray-400 text-sm mb-6">Run React, Python, Node, and SQL snippets directly in your browser.</p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['React', 'Python', 'Node', 'SQL'].map((lang) => (
            <span key={lang} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">{lang}</span>
          ))}
        </div>
        <Link href="/playground" className="inline-flex px-6 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-black font-semibold text-sm hover:shadow-lg transition">
          Open Playground
        </Link>
      </div>
    </section>
  )
}
