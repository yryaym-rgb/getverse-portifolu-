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
  Lock, GitBranch, Terminal, Box
} from 'lucide-react'

export default function SystemDesigner() {
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<null | {
    architecture: string
    database: string
    api: string
    deployment: string
    timeline: string
    security: string
    cost: string
    scalability: string
    monitoring: string
    team?: string
    technologies?: string[]
  }>(null)

  const [activeTab, setActiveTab] = useState('overview')

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      setGenerating(false)
      setResult({
        architecture: 'Next.js Frontend → FastAPI Backend → PostgreSQL Database → Redis Cache → Nginx Load Balancer → AWS Auto-scaling Group',
        database: 'Users (UUID, email, name, role, created_at), Projects (UUID, user_id, title, description, status, created_at), Analytics (UUID, project_id, metric, value, timestamp, region) with proper indexing on foreign keys and frequently queried fields',
        api: 'REST API with JWT authentication, rate limiting (100 req/min per user), OpenAPI documentation, role-based access control, and request validation using Pydantic models',
        deployment: 'Docker containers → Nginx reverse proxy → AWS ECS (Elastic Container Service) → Cloudflare CDN + SSL → GitHub Actions CI/CD with automated testing and deployment',
        timeline: '2 weeks research → 4 weeks development → 2 weeks testing → 2 weeks deployment → Ongoing maintenance and monitoring',
        security: 'JWT with refresh tokens (expiry: 15min/7 days), bcrypt encryption, comprehensive audit logging, rate limiting, SQL injection prevention (parameterized queries), CORS configuration, and regular security audits',
        cost: 'Development: $15,000-$25,000 | Monthly hosting: ~$300-500 (AWS) | Annual maintenance: ~$2,000 | Monitoring and logging: ~$100/month',
        scalability: 'Horizontal scaling with load balancer, database read replicas, Redis caching, CDN for static assets, and auto-scaling groups based on CPU/memory metrics. Designed to handle 10,000+ concurrent users.',
        monitoring: 'Prometheus + Grafana for metrics, ELK stack for logging, Sentry for error tracking, and AWS CloudWatch for infrastructure monitoring. Alerts configured for critical thresholds.',
        team: '1 Full Stack Developer (Abdul Malik) + QA Specialist + Project Manager (as needed)',
        technologies: ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Nginx', 'TypeScript', 'Tailwind CSS']
      })
    }, 2500)
  }

  const handleReset = () => {
    setResult(null)
    setPrompt('')
    setActiveTab('overview')
  }

  const suggestions = [
    'A hospital management system with patient records, appointments, billing, and AI-powered diagnostics',
    'An e-commerce platform with product catalog, cart, payments, and real-time inventory',
    'A social media platform with user profiles, posts, comments, and real-time notifications',
    'A ride-sharing app with driver matching, real-time tracking, and payments',
    'A government voting system with secure authentication and real-time results',
    'A learning management system with courses, quizzes, and progress tracking'
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Layers size={14} /> },
    { id: 'architecture', label: 'Architecture', icon: <Server size={14} /> },
    { id: 'database', label: 'Database', icon: <Database size={14} /> },
    { id: 'api', label: 'API', icon: <Code size={14} /> },
    { id: 'deployment', label: 'Deployment', icon: <Cloud size={14} /> },
    { id: 'security', label: 'Security', icon: <Shield size={14} /> },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Brain size={14} />
            AI System Designer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI</span> System Designer
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Describe your system and get a complete architecture with database schema, API design, deployment strategy, and more.
          </p>
        </div>

        {/* Input Section */}
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

          <button
            onClick={handleGenerate}
            disabled={!prompt || generating}
            className="mt-4 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating System Design...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate System Design
              </>
            )}
          </button>

          {/* Suggestions */}
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

        {/* Results */}
        {result && !generating && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle size={20} />
                <span className="font-medium">System Design Complete</span>
              </div>
              <button
                onClick={handleReset}
                className="text-sm text-gray-400 hover:text-white transition"
              >
                <Sparkles size={14} className="inline mr-1" />
                New Design
              </button>
            </div>

            {/* Tabs */}
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

            {/* Tab Content */}
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
                  {result.technologies && (
                    <div className="p-4 rounded-xl bg-white/5">
                      <h4 className="text-sm font-bold text-[#00f0ff] mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-sm font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider">System Architecture</h4>
                  <p className="text-white">{result.architecture}</p>
                  <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/10">
                    <p className="text-gray-400 text-sm">Flow: User → Frontend → API Gateway → Backend → Database/Cache</p>
                  </div>
                </div>
              )}

              {activeTab === 'database' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider">Database Schema</h4>
                  <p className="text-white">{result.database}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-400">Primary Key</p>
                      <p className="text-sm text-white">UUID</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-400">Indexes</p>
                      <p className="text-sm text-white">Foreign keys, email, status</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider">API Design</h4>
                  <p className="text-white">{result.api}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-400">Authentication</p>
                      <p className="text-sm text-white">JWT</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-400">Rate Limiting</p>
                      <p className="text-sm text-white">100 req/min</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'deployment' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Deployment Strategy</h4>
                  <p className="text-white">{result.deployment}</p>
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <p className="text-gray-400 text-sm">✅ CI/CD pipeline with automated testing and deployment</p>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider">Security</h4>
                  <p className="text-white">{result.security}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-400">Encryption</p>
                      <p className="text-sm text-white">bcrypt</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-gray-400">Audit Logging</p>
                      <p className="text-sm text-white">Comprehensive</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
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

            {/* CTA */}
            <Link 
              href="/contact" 
              className="block text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2"
            >
              Build This System <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* No Results State */}
        {!result && !generating && (
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