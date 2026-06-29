'use client'

import { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Sparkles, Send, Loader2, CheckCircle,
  Server, Database, Cloud, Shield, Clock,
  DollarSign, Users, ArrowRight, Brain,
  Zap, GitBranch, Terminal, Layers,
  Rocket, Code, BarChart3, BookOpen
} from 'lucide-react'
import StreamingResponse from '../components/AI/StreamingResponse'
import DiagramRenderer from '../components/AI/DiagramRenderer'
import ConfidenceBadge from '../components/AI/ConfidenceBadge'
import Workspace from '../components/AI/Workspace'

interface LabResult {
  architecture: string
  techStack: string[]
  database: string
  apis: string[]
  security: string[]
  cost: string
  timeline: string
  deployment: string
  scaling: string
  monitoring: string
  similarProjects: string[]
  summary: string
  confidence?: number
}

export default function EngineeringLab() {
  const [idea, setIdea] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<LabResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!idea.trim()) return
    
    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/lab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate blueprint')
      }

      const data = await response.json()
      setResult({ ...data.result, confidence: data.confidence || 0.85 })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }

  const resetLab = () => {
    setIdea('')
    setResult(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Brain size={14} />
            AI Engineering Lab
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Build <span className="gradient-text">Anything</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Describe your idea and get a complete technical blueprint — architecture, database, APIs, cost, timeline, and more.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Input */}
        <div className="glass p-8 rounded-3xl border border-white/5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <textarea
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your idea... e.g., 'A healthcare platform for patients to book appointments, chat with doctors, and get AI-powered health insights'"
              className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || isGenerating}
            className="mt-4 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Building Your Blueprint...
              </>
            ) : (
              <>
                <Rocket size={18} />
                Generate Blueprint
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-fadeIn">
            {/* Confidence */}
            {result.confidence && (
              <div className="flex justify-end">
                <ConfidenceBadge 
                  score={Math.round(result.confidence * 100)} 
                  reasoning="Based on similar project patterns and industry standards" 
                />
              </div>
            )}

            {/* Architecture Diagram */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Server size={16} />
                Architecture Diagram
              </h3>
              <DiagramRenderer 
                layers={result.architecture.split('→').map(s => s.trim())}
                connections={[]}
              />
            </div>

            {/* Summary */}
            <div className="glass p-6 rounded-2xl border border-[#00f0ff]/10 bg-[#00f0ff]/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2">Blueprint Summary</h3>
              <p className="text-white">{result.summary}</p>
            </div>

            {/* Tech Stack */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap size={16} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-[#7b2ffc]/10 text-[#7b2ffc] text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Database */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Database size={16} />
                Database Schema
              </h3>
              <p className="text-white">{result.database}</p>
            </div>

            {/* APIs */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code size={16} />
                APIs
              </h3>
              <ul className="space-y-1">
                {result.apis.map((api, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-[#ff6b35] font-bold">•</span>
                    {api}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield size={16} />
                Security
              </h3>
              <ul className="space-y-1">
                {result.security.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-[#7b2ffc] font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cost & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <DollarSign size={16} />
                  Estimated Cost
                </h3>
                <p className="text-white">{result.cost}</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Timeline
                </h3>
                <p className="text-white">{result.timeline}</p>
              </div>
            </div>

            {/* Deployment & Scaling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cloud size={16} />
                  Deployment
                </h3>
                <p className="text-white text-sm">{result.deployment}</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap size={16} />
                  Scaling
                </h3>
                <p className="text-white text-sm">{result.scaling}</p>
              </div>
            </div>

            {/* Monitoring */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                <Terminal size={16} />
                Monitoring & Observability
              </h3>
              <p className="text-white">{result.monitoring}</p>
            </div>

            {/* Similar Projects */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-3 flex items-center gap-2">
                <BookOpen size={16} />
                Similar Projects I've Built
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.similarProjects.map((project, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#ff6b35]/10 text-[#ff6b35] text-sm font-medium">
                    {project}
                  </span>
                ))}
              </div>
            </div>

            {/* Workspace */}
            <Workspace />

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/contact" 
                className="flex-1 text-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2"
              >
                <Users size={18} />
                Book Abdul to Build This
              </a>
              <button
                onClick={resetLab}
                className="px-6 py-3.5 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition"
              >
                <Sparkles size={18} />
                New Idea
              </button>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!result && !isGenerating && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔬</div>
            <p className="text-gray-400">Describe your idea above to generate a complete technical blueprint</p>
            <p className="text-gray-500 text-sm mt-1">AI will design architecture, database, APIs, and more</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}