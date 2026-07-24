'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, CheckCircle } from 'lucide-react'
import { resumeRoles, resumeVariants, type ResumeRole } from '@/app/lib/portfolioData'

export default function ResumeGenerator() {
  const [role, setRole] = useState<ResumeRole>('Full Stack')
  const variant = resumeVariants[role]

  return (
    <section id="resume-generator" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#7b2ffc] text-sm font-medium tracking-widest uppercase">Smart Resume</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Resume <span className="gradient-text">Generator</span>
          </h2>
          <p className="text-gray-400 mt-4">Select a role — resume adapts automatically for recruiters.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {resumeRoles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                role === r
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-black'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-3xl border border-white/5 p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">{variant.title}</h3>
                <p className="text-gray-400 mt-1">{variant.summary}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {variant.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={14} className="text-[#00f0ff] shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/resume" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f0ff]/30 text-sm transition">
                <FileText size={16} /> View Full Resume
              </Link>
              <a href="/downloads/Abdul_Malik_Lakho_CV.pdf" download className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-black text-sm font-semibold transition">
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
