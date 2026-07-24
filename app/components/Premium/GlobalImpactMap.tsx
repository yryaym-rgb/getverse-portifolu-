'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { countries } from '@/app/lib/portfolioData'
import { projectsData } from '@/app/lib/projectsData'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false })

const typeLabels = {
  government: 'Government Projects',
  client: 'Client Work',
  personal: 'Personal Projects',
}

export default function GlobalImpactMap() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedCountry = countries.find((c) => c.id === selected)
  const projects = selectedCountry
    ? projectsData.filter((p) => selectedCountry.projects.includes(p.slug))
    : []

  return (
    <section id="global-map" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00f0ff] text-sm font-medium tracking-widest uppercase">Global Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Interactive <span className="gradient-text">World Map</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Click a country to explore projects deployed across 5 nations. Government platforms, enterprise SaaS, and client work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl border border-white/5 overflow-hidden">
              <Globe3D
                activeCountry={selected}
                onSelectCountry={setSelected}
                height="450px"
                autoRotate={!selected}
              />
            </div>
          </div>

          <div className="space-y-4">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(selected === c.id ? null : c.id)}
                className={`w-full text-left glass-card p-4 rounded-2xl border transition-all ${
                  selected === c.id ? 'border-[#d4af37]/40 bg-[#d4af37]/5' : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-xs text-gray-500">{typeLabels[c.type]}</div>
                  </div>
                  <MapPin size={14} className="ml-auto text-gray-600" />
                </div>
              </button>
            ))}

            <AnimatePresence mode="wait">
              {selectedCountry && (
                <motion.div
                  key={selectedCountry.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass p-4 rounded-2xl border border-[#00f0ff]/20"
                >
                  <h3 className="font-semibold text-white mb-2">
                    {selectedCountry.flag} {typeLabels[selectedCountry.type]}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{selectedCountry.description}</p>
                  <div className="space-y-2">
                    {projects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/case-studies/${p.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm"
                      >
                        <span style={{ color: p.color }}>{p.title}</span>
                        <ExternalLink size={12} className="text-gray-500" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
