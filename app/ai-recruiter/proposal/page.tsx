'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Sparkles, Send, Loader2, CheckCircle,
  FileText, Clock, Users, DollarSign, ArrowRight,
  AlertCircle, Download, Printer, Share2,
  Calendar, Briefcase, Zap, Shield, Brain,
  Server, Database, Cloud, Code
} from 'lucide-react'

export default function ProposalGenerator() {
  const [project, setProject] = useState('')
  const [industry, setIndustry] = useState('')
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

  const handleGenerate = async () => {
    if (!project || !industry || !budget) {
      setError('Please fill in all required fields')
      return
    }

    setError(null)
    setGenerating(true)
    setResult(null)

    try {
      const response = await fetch('/api/proposal-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          project, 
          industry, 
          budget,
          timeline 
        })
      })
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (data.proposal) {
        setResult(data.proposal)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate proposal')
    } finally {
      setGenerating(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setProject('')
    setIndustry('')
    setBudget('')
    setTimeline('')
    setError(null)
  }

  const isFormValid = project && industry && budget

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <Link href="/ai-recruiter" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to AI Recruiter
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <FileText size={14} />
            AI Proposal Generator
          </div>
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">AI</span> Proposal Generator
          </h1>
          <p className="text-gray-400 mt-2">Instant professional proposals — no API keys required</p>
        </div>

        {!result && (
          <div className="glass p-8 rounded-3xl border border-white/5">
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Project Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Describe what you want to build..."
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
                  Desired Timeline (Optional)
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

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-400" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={generating || !isFormValid}
                className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    AI Generating Proposal...
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

        {result && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{result.title}</h2>
                <p className="text-gray-400 text-sm mt-1">Generated locally • Professional Proposal</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#00f0ff] transition flex items-center gap-2">
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

            <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/10">
              <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
            </div>

            <div className="glass p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Brain size={16} />
                Solution Overview
              </h4>
              <p className="text-white">{result.solution}</p>
            </div>

            <div className="glass p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Server size={16} />
                Architecture
              </h4>
              <p className="text-white font-mono text-sm">{result.architecture}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-xl border border-white/5">
                <h4 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Timeline
                </h4>
                <p className="text-white text-lg font-semibold">{result.timeline}</p>
              </div>
              <div className="glass p-4 rounded-xl border border-white/5">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <DollarSign size={16} />
                  Estimated Cost
                </h4>
                <p className="text-white text-lg font-semibold">{result.cost}</p>
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code size={16} />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.tech.map((t: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle size={16} />
                Deliverables
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {result.deliverables.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Phase Timeline
              </h4>
              <ul className="space-y-1">
                {result.timelineDetails.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-[#7b2ffc] font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
              <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield size={16} />
                Key Risks & Mitigations
              </h4>
              <ul className="space-y-1">
                {result.risks.map((risk: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-yellow-400">⚠️</span>
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Users size={16} />
                Team
              </h4>
              <p className="text-white text-sm">{result.team}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="flex-1 text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2">
                <Send size={18} />
                Discuss This Proposal
              </Link>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition flex items-center gap-2"
              >
                <Sparkles size={18} />
                Generate Another
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}