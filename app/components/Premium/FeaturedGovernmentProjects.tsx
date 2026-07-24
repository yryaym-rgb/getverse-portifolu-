'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, ExternalLink, ArrowRight } from 'lucide-react'
import { projectsData } from '@/app/lib/projectsData'
import { projectMetrics } from '@/app/lib/portfolioData'

const govProjects = projectsData.filter((p) => p.category === 'Government')

export default function FeaturedGovernmentProjects() {
  return (
    <section id="government-projects" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/3 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#d4af37] text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2">
            <Shield size={14} /> Government
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Featured <span className="gradient-text-gold">Government Projects</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            National-scale platforms trusted by presidential offices and telecom regulators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {govProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group glass rounded-3xl border border-white/5 overflow-hidden hover:border-[#d4af37]/20 transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-xs font-medium">
                  {project.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white" style={{ color: project.color }}>{project.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{project.subtitle}</p>
                <p className="text-gray-300 text-sm mt-3 line-clamp-2">{project.description}</p>
                {project.metrics && (
                  <div className="flex gap-4 mt-4">
                    {project.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-lg font-bold" style={{ color: project.color }}>{m.value}</div>
                        <div className="text-xs text-gray-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                {projectMetrics[project.slug] && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {projectMetrics[project.slug].slice(0, 3).map((m) => (
                      <div key={m.label} className="p-2 rounded-lg bg-white/5 text-center">
                        <div className="text-sm font-bold" style={{ color: project.color }}>{m.value}</div>
                        <div className="text-[10px] text-gray-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 mt-4">
                  <Link href={`/case-studies/${project.slug}`} className="flex items-center gap-1 text-sm hover:underline" style={{ color: project.color }}>
                    Case Study <ArrowRight size={14} />
                  </Link>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-400 hover:text-white">
                      Live <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
