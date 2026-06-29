'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import {
  ArrowLeft, Sparkles, Send, Loader2, CheckCircle,
  FileText, Clock, Users, DollarSign, Download,
  Printer, Share2, Calendar, Briefcase, Zap,
  Shield, Brain, Server, Database, Cloud,
  Code, GitBranch, Terminal, Eye, Copy
} from 'lucide-react'

export default function ProposalGenerator() {
  const [project, setProject] = useState('')
  const [industry, setIndustry] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<null | {
    title: string
    solution: string
    architecture: string
    timeline: string
    tech: string[]
    cost: string
    team: string
    risks: string[]
    deliverables: string[]
    timelineDetails: string[]
    summary: string
  }>(null)

  const industries = [
    { value: 'government', label: '🏛️ Government / Public Sector' },
    { value: 'ai', label: '🧠 AI / Machine Learning' },
    { value: 'saas', label: '☁️ SaaS / Software as a Service' },
    { value: 'fintech', label: '💰 Fintech / Financial Services' },
    { value: 'healthcare', label: '🏥 Healthcare / Medical' },
    { value: 'telecom', label: '📡 Telecommunications' },
    { value: 'education', label: '📚 Education / E-Learning' },
    { value: 'ecommerce', label: '🛒 E-Commerce / Retail' },
  ]

  const budgets = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-plus', label: '$50,000+' },
  ]

  const timelines = [
    { value: '1-2', label: '1-2 weeks' },
    { value: '3-4', label: '3-4 weeks' },
    { value: '6-8', label: '6-8 weeks' },
    { value: '10-12', label: '10-12 weeks' },
    { value: '12-16', label: '12-16 weeks' },
  ]

  const handleGenerate = () => {
    if (!project || !industry || !budget) {
      alert('Please fill in all required fields')
      return
    }

    setGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      setGenerating(false)
      
      const industryLabel = industries.find(i => i.value === industry)?.label || ''
      const budgetLabel = budgets.find(b => b.value === budget)?.label || ''
      const timelineLabel = timelines.find(t => t.value === timeline)?.label || '8-12 weeks'

      setResult({
        title: `${project} — Complete Solution Proposal`,
        solution: `A full-stack platform with AI-powered capabilities, real-time analytics, and secure user management. Designed for ${industryLabel}, this solution will handle high traffic with auto-scaling infrastructure and military-grade security.`,
        architecture: 'Next.js Frontend → FastAPI Backend (Python) → PostgreSQL Database → Redis Cache → Claude API for AI → Docker + Nginx Deployment → AWS Cloud Infrastructure',
        timeline: timelineLabel || '8-12 weeks',
        tech: ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Claude API', 'Docker', 'Nginx', 'AWS', 'TypeScript'],
        cost: budgetLabel,
        team: '1 Full Stack Developer (Abdul Malik) + QA Specialist + Project Manager (as needed)',
        risks: [
          'AI model accuracy requires ongoing tuning and validation',
          'Third-party API rate limits may impact performance during peak usage',
          'Data migration complexity from legacy systems',
          'Integration with existing infrastructure'
        ],
        deliverables: [
          'Complete full-stack platform with AI integration',
          'Admin dashboard with analytics and reporting',
          'REST API with comprehensive documentation',
          'Database schema and migrations',
          'Docker containerization and deployment scripts',
          'CI/CD pipeline with GitHub Actions',
          '30-day post-launch support and maintenance'
        ],
        timelineDetails: [
          'Week 1-2: Requirements gathering, research, and architecture design',
          'Week 3-6: Core development, frontend and backend implementation',
          'Week 7-8: AI integration, testing, and quality assurance',
          'Week 9-10: Deployment, security audit, and performance optimization'
        ],
        summary: `This proposal outlines a comprehensive ${project} solution tailored to ${industryLabel} requirements. With a budget of ${budgetLabel} and timeline of ${timelineLabel}, the project will deliver a production-ready platform with AI capabilities, security, and scalability.`
      })
    }, 2500)
  }

  const handleReset = () => {
    setResult(null)
    setProject('')
    setIndustry('')
    setBudget('')
    setTimeline('')
  }

  const handleExport = () => {
    if (!result) return
    // Simulate export
    alert('Exporting proposal as PDF... (Feature coming soon)')
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/ai-recruiter" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to AI Recruiter
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <FileText size={14} />
            AI Proposal Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI</span> Proposal Generator
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Describe your project and get a complete solution proposal with architecture, timeline, and cost estimate.
          </p>
        </div>

        {/* Input Form */}
        {!result && (
          <div className="glass p-8 rounded-3xl border border-white/5">
            <div className="space-y-5">
              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Project Name / Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="E.g., 'Hospital Management System with patient records, appointments, billing, and AI-powered diagnostics'"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm font-medium block mb-2">
                    Industry <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-[#00f0ff] focus:outline-none transition"
                  >
                    <option value="">Select industry...</option>
                    {industries.map((i) => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 text-sm font-medium block mb-2">
                    Budget Range <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-[#00f0ff] focus:outline-none transition"
                  >
                    <option value="">Select budget...</option>
                    {budgets.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Desired Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:border-[#00f0ff] focus:outline-none transition"
                >
                  <option value="">Select timeline...</option>
                  {timelines.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating Proposal...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Proposal
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{result.title}</h2>
                <p className="text-gray-400 text-sm mt-1">Generated by AI • Real-time proposal</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#00f0ff] transition flex items-center gap-2"
                >
                  <Download size={16} />
                  Export
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition flex items-center gap-2"
                >
                  <Sparkles size={16} />
                  New
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="glass p-6 rounded-2xl border border-[#00f0ff]/10 bg-[#00f0ff]/5">
              <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
            </div>

            {/* Solution */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Brain size={16} />
                Solution Overview
              </h3>
              <p className="text-white">{result.solution}</p>
            </div>

            {/* Architecture */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Server size={16} />
                Architecture
              </h3>
              <p className="text-white font-mono text-sm">{result.architecture}</p>
            </div>

            {/* Timeline & Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Timeline
                </h3>
                <p className="text-white text-lg font-semibold">{result.timeline}</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <DollarSign size={16} />
                  Estimated Cost
                </h3>
                <p className="text-white text-lg font-semibold">{result.cost}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code size={16} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle size={16} />
                Deliverables
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline Details */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Phase Timeline
              </h3>
              <ul className="space-y-2">
                {result.timelineDetails.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-[#7b2ffc] font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="glass p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
              <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield size={16} />
                Key Risks & Mitigations
              </h3>
              <ul className="space-y-2">
                {result.risks.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-yellow-400">⚠️</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Team */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users size={16} />
                Team
              </h3>
              <p className="text-white">{result.team}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/contact" 
                className="flex-1 text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Discuss This Proposal
              </Link>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition flex items-center gap-2"
              >
                <Sparkles size={18} />
                Generate Another
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  )
}