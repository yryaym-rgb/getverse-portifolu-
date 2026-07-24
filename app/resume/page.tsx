'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { resumeData } from '../lib/resumeData'
import {
  Download, Mail, Phone, MapPin, Github, Linkedin,
  ExternalLink, ArrowLeft, FileJson, Printer
} from 'lucide-react'

export default function ResumePage() {
  const handlePrint = () => window.print()
  const handleJsonDownload = () => {
    window.open('/api/resume', '_blank')
  }

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-28 pb-8 px-4 max-w-3xl mx-auto print:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft size={16} />
            Back
          </Link>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:border-[#00f0ff]/30 transition"
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
            <button
              onClick={handleJsonDownload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm hover:border-[#7b2ffc]/30 transition"
            >
              <FileJson size={16} />
              Download JSON
            </button>
          </div>
        </div>

        <article className="glass p-8 md:p-12 rounded-3xl border border-white/10 print:bg-white print:text-black print:border-none">
          <header className="border-b border-white/10 print:border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white print:text-black">
              {resumeData.name}
            </h1>
            <p className="text-xl text-[#00f0ff] print:text-blue-700 mt-1">{resumeData.title}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400 print:text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {resumeData.location}
              </span>
              <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1 hover:text-white print:text-blue-700">
                <Mail size={14} /> {resumeData.email}
              </a>
              <span className="flex items-center gap-1">
                <Phone size={14} /> {resumeData.phone}
              </span>
              <a href={resumeData.website} className="flex items-center gap-1 hover:text-white print:text-blue-700">
                <ExternalLink size={14} /> getverse.dev
              </a>
            </div>
            <div className="flex gap-3 mt-3 print:hidden">
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Github size={18} />
              </a>
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </header>

          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#00f0ff] print:text-blue-700 mb-2">Summary</h2>
            <p className="text-gray-300 print:text-gray-800 leading-relaxed">{resumeData.summary}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#00f0ff] print:text-blue-700 mb-3">Experience</h2>
            {resumeData.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-semibold text-white print:text-black">{exp.role}</h3>
                  <span className="text-gray-500 text-sm">{exp.period}</span>
                </div>
                <p className="text-gray-400 text-sm print:text-gray-600">{exp.company}</p>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-gray-300 print:text-gray-800 text-sm flex gap-2">
                      <span className="text-[#00f0ff] print:text-blue-600">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#00f0ff] print:text-blue-700 mb-3">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(resumeData.skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">{category}</h3>
                  <p className="text-gray-300 print:text-gray-800 text-sm">{items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#00f0ff] print:text-blue-700 mb-3">Featured Projects</h2>
            <div className="space-y-2">
              {resumeData.projects.map((p, i) => (
                <div key={i} className="flex flex-wrap items-baseline gap-2">
                  <span className="font-semibold text-white print:text-black">{p.name}</span>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] text-sm print:text-blue-700">
                      {p.url.replace('https://', '')}
                    </a>
                  )}
                  <span className="text-gray-400 text-sm print:text-gray-600">— {p.description}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-sm text-gray-400 print:text-gray-600">
              <strong className="text-white print:text-black">Availability:</strong> {resumeData.availability}
            </p>
            <p className="text-sm text-gray-400 print:text-gray-600 mt-1">
              <strong className="text-white print:text-black">Languages:</strong> {resumeData.languages.join(', ')}
            </p>
          </section>
        </article>

        <div className="mt-8 text-center print:hidden">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition"
          >
            <Download size={18} />
            Ready to hire? Get in touch
          </Link>
        </div>
      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  )
}
