'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  ArrowLeft, Send, Loader2, Sparkles, 
  ArrowRight, CheckCircle, Database, Server, 
  Cloud, Shield, Code, Clock, DollarSign,
  Brain, Layers, Network, Zap, Users,
  FileText, BarChart3, Activity, Globe,
  Lock, GitBranch, Terminal, Box,
  AlertCircle
} from 'lucide-react'

export default function SystemDesigner() {
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe your system')
      return
    }

    setError(null)
    setGenerating(true)
    setResult(null)

    try {
      const response = await fetch('/api/system-designer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (data.design) {
        setResult(data.design)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate system design')
    } finally {
      setGenerating(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setPrompt('')
    setError(null)
    setActiveTab('overview')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Layers size={14} /> },
    { id: 'architecture', label: 'Architecture', icon: <Server size={14} /> },
    { id: 'database', label: 'Database', icon: <Database size={14} /> },
    { id: 'api', label: 'API', icon: <Code size={14} /> },
    { id: 'deployment', label: 'Deployment', icon: <Cloud size={14} /> },
    { id: 'security', label: 'Security', icon: <Shield size={14} /> },
  ]

  const suggestions = [
    'A hospital management system with patient records, appointments, billing, and AI-powered diagnostics',
    'An e-commerce platform with product catalog, cart, payments, and real-time inventory',
    'A social media platform with user profiles, posts, comments, and real-time notifications',
    'A ride-sharing app with driver matching, real-time tracking, and payments',
    'A government voting system with secure authentication and real-time results'
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Home
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Brain size={14} />
            AI System Designer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI</span> System Designer
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Powered by Claude AI — Describe your system and get a complete architecture with database schema, API design, deployment strategy, and more.
          </p>
        </div>

        {!result && (
          <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
            <div>
              <label className="text-gray-300 text-sm font-medium block mb-2">
                Describe what you want to build
              </label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., 'A hospital management system with patient records, appointments, billing, and AI-powered diagnostics'"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
              />
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-400" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!prompt || generating}
              className="mt-4 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  AI Generating System Design...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate System Design
                </>
              )}
            </button>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2">💡 Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 4).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setPrompt(suggestion)}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
                  >
                    {suggestion.length > 50 ? suggestion.substring(0, 50) + '...' : suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {result && !generating && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle size={20} />
                <span className="font-medium">AI System Design Complete</span>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                <Sparkles size={14} className="inline mr-1" />
                New Design
              </button>
            </div>

            <div className="flex overflow-x-auto gap-1 bg-white/5 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="glass p-6 rounded-2xl border border-white/5">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="text-sm font-bold text-[#00f0ff] mb-2">Architecture</h4>
                      <p className="text-gray-300 text-sm">{result.architecture}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="text-sm font-bold text-[#7b2ffc] mb-2">Database</h4>
                      <p className="text-gray-300 text-sm">{result.database}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="text-sm font-bold text-[#ff6b35] mb-2">API</h4>
                      <p className="text-gray-300 text-sm">{result.api}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="text-sm font-bold text-emerald-400 mb-2">Deployment</h4>
                      <p className="text-gray-300 text-sm">{result.deployment}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider">System Architecture</h4>
                  <p className="text-white">{result.architecture}</p>
                  <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/10">
                    <p className="text-gray-400 text-sm">AI Generated • Powered by Claude</p>
                  </div>
                </div>
              )}

              {activeTab === 'database' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider">Database Schema</h4>
                  <p className="text-white">{result.database}</p>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider">API Design</h4>
                  <p className="text-white">{result.api}</p>
                </div>
              )}

              {activeTab === 'deployment' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Deployment Strategy</h4>
                  <p className="text-white">{result.deployment}</p>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider">Security</h4>
                  <p className="text-white">{result.security}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl border border-white/5">
                <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
                  <Clock size={14} className="text-[#ff6b35]" />
                  Timeline
                </h4>
                <p className="text-white text-sm">{result.timeline}</p>
              </div>
              <div className="glass p-4 rounded-2xl border border-white/5">
                <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
                  <DollarSign size={14} className="text-emerald-400" />
                  Cost Estimate
                </h4>
                <p className="text-white text-sm">{result.cost}</p>
              </div>
            </div>

            <div className="glass p-4 rounded-2xl border border-white/5">
              <h4 className="text-sm font-bold text-[#00f0ff] mb-2 flex items-center gap-2">
                <Zap size={14} />
                Scalability
              </h4>
              <p className="text-white text-sm">{result.scalability}</p>
            </div>

            <div className="glass p-4 rounded-2xl border border-white/5">
              <h4 className="text-sm font-bold text-[#7b2ffc] mb-2 flex items-center gap-2">
                <Activity size={14} />
                Monitoring
              </h4>
              <p className="text-white text-sm">{result.monitoring}</p>
            </div>

            <Link href="/contact" className="block text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2">
              Build This System <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {!result && !generating && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏗️</div>
            <p className="text-gray-400">Describe your system above to generate a complete design</p>
            <p className="text-gray-500 text-sm mt-1">AI will generate architecture, database schema, API design, and more</p>
          </div>
        )}

        {generating && (
          <div className="text-center py-12">
            <Loader2 size={32} className="animate-spin text-[#00f0ff] mx-auto" />
            <p className="text-gray-400 mt-2">Analyzing requirements...</p>
            <p className="text-gray-500 text-sm mt-1">Building the perfect system architecture</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}