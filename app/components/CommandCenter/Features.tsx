'use client'

import { useState } from 'react'  // ← ADD THIS IMPORT
import Link from 'next/link'
import { 
  Brain, Server, Users, Code, Shield, Network, 
  ArrowRight, Sparkles, Cpu, GitBranch, Terminal,
  Database, Cloud, BarChart3, Zap, Globe,
  Lock, Eye, MessageSquare, FileText, Target,
  Mic, BookOpen, Award, TrendingUp, Clock
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  desc: string
  href: string
  color: string
  category: 'AI' | 'Engineering' | 'Recruiter' | 'Projects'
  status?: 'Live' | 'Beta' | 'Coming Soon'
  stats?: { label: string; value: string }[]
}

export default function CommandCenterFeatures() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const features: Feature[] = [
    {
      icon: <Brain size={24} />,
      title: 'AI Digital Twin',
      desc: 'Talk to my engineering philosophy — an AI that thinks exactly like I do.',
      href: '/digital-twin',
      color: '#00f0ff',
      category: 'AI',
      status: 'Live',
      stats: [{ label: 'Trained On', value: '18+ Projects' }]
    },
    {
      icon: <Users size={24} />,
      title: 'AI Recruiter Suite',
      desc: 'Job matching, technical interviews, and proposal generation powered by AI.',
      href: '/ai-recruiter',
      color: '#7b2ffc',
      category: 'Recruiter',
      status: 'Live',
      stats: [{ label: 'Tools', value: '4' }]
    },
    {
      icon: <Server size={24} />,
      title: 'Engineering Hub',
      desc: 'Interactive architecture, deployment pipelines, and live database exploration.',
      href: '/engineering',
      color: '#ff6b35',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Tools', value: '6' }]
    },
    {
      icon: <Code size={24} />,
      title: 'System Designer',
      desc: 'AI-powered system design — describe your idea and get a complete architecture.',
      href: '/system-designer',
      color: '#00f0ff',
      category: 'AI',
      status: 'Live',
      stats: [{ label: 'Response', value: '2-3s' }]
    },
    {
      icon: <Shield size={24} />,
      title: 'Code Reviewer',
      desc: 'AI code review with security audit, bug detection, and optimization suggestions.',
      href: '/code-review',
      color: '#7b2ffc',
      category: 'AI',
      status: 'Live',
      stats: [{ label: 'Languages', value: '10+' }]
    },
    {
      icon: <Terminal size={24} />,
      title: 'Code Playground',
      desc: 'Run real code from production projects — Sandpack live editor.',
      href: '/playground',
      color: '#00f0ff',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Snippets', value: '3' }]
    },
    {
      icon: <Globe size={24} />,
      title: '3D Command Center',
      desc: 'Bruno Simon-level interactive 3D project explorer built with Three.js.',
      href: '/command-center',
      color: '#7b2ffc',
      category: 'Projects',
      status: 'Live',
      stats: [{ label: 'Projects', value: '5' }]
    },
    {
      icon: <Network size={24} />,
      title: 'System Whiteboard',
      desc: 'Interactive architecture design tool — drag, connect, and design systems.',
      href: '/whiteboard',
      color: '#ff6b35',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Engine', value: 'ReactFlow' }]
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Analytics Dashboard',
      desc: 'Real portfolio traffic insights — page views, referrers, and devices.',
      href: '/analytics',
      color: '#00f0ff',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Metrics', value: '4' }]
    },
    {
      icon: <Network size={24} />,
      title: 'Project Universe',
      desc: 'Explore 18+ production projects in an interactive space.',
      href: '/projects',
      color: '#ff6b35',
      category: 'Projects',
      status: 'Live',
      stats: [{ label: 'Projects', value: '18+' }]
    },
    {
      icon: <GitBranch size={24} />,
      title: 'Deployment Simulator',
      desc: 'Watch a production deployment in action with CI/CD visualization.',
      href: '/engineering/deployment',
      color: '#00f0ff',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Steps', value: '8' }]
    },
    {
      icon: <Terminal size={24} />,
      title: 'Engineering Lab',
      desc: 'Test AI, OCR, speech recognition, and translation in real-time.',
      href: '/engineering/lab',
      color: '#7b2ffc',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Models', value: '5' }]
    },
    {
      icon: <Cpu size={24} />,
      title: 'Live Architecture',
      desc: 'Interactive system diagrams with clickable nodes.',
      href: '/engineering/architecture',
      color: '#ff6b35',
      category: 'Engineering',
      status: 'Live',
      stats: [{ label: 'Layers', value: '6' }]
    },
    {
      icon: <Target size={24} />,
      title: 'Job Matcher',
      desc: 'Upload a job description. AI calculates match percentage and provides detailed analysis.',
      href: '/ai-recruiter/match',
      color: '#00f0ff',
      category: 'Recruiter',
      status: 'Live',
      stats: [{ label: 'Type', value: 'Demo' }]
    },
    {
      icon: <Mic size={24} />,
      title: 'AI Interview',
      desc: 'Practice technical interviews with AI-powered questions and expert answers.',
      href: '/ai-recruiter/interview',
      color: '#7b2ffc',
      category: 'Recruiter',
      status: 'Live',
      stats: [{ label: 'Questions', value: '6' }]
    },
    {
      icon: <FileText size={24} />,
      title: 'Proposal Generator',
      desc: 'Describe your project and get a complete solution proposal with architecture and timeline.',
      href: '/ai-recruiter/proposal',
      color: '#ff6b35',
      category: 'Recruiter',
      status: 'Live',
      stats: [{ label: 'Sections', value: '9' }]
    }
  ]

  const categories = ['All', 'AI', 'Engineering', 'Recruiter', 'Projects']

  const filteredFeatures = features.filter(feature => {
    const matchesCategory = selectedCategory === 'All' || feature.category === selectedCategory
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          feature.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI': return 'text-[#00f0ff] bg-[#00f0ff]/10'
      case 'Engineering': return 'text-[#ff6b35] bg-[#ff6b35]/10'
      case 'Recruiter': return 'text-[#7b2ffc] bg-[#7b2ffc]/10'
      case 'Projects': return 'text-emerald-400 bg-emerald-500/10'
      default: return 'text-gray-400 bg-white/5'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
          <Sparkles size={14} />
          AI Engineering Command Center
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">
          <span className="gradient-text">AI-Powered</span> Features
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Each feature demonstrates a different aspect of my engineering ability.
          Built with Next.js, Tailwind CSS, and local AI responses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { value: '12', label: 'Features', icon: <Zap size={16} />, color: '#00f0ff' },
          { value: '18+', label: 'Projects', icon: <Code size={16} />, color: '#7b2ffc' },
          { value: '5', label: 'Categories', icon: <Globe size={16} />, color: '#ff6b35' },
          { value: 'Local', label: 'Knowledge Base', icon: <Brain size={16} />, color: '#00f0ff' },
        ].map((stat, i) => (
          <div key={i} className="glass p-3 rounded-xl text-center border border-white/5">
            <div className="flex justify-center mb-1" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFeatures.map((feature, i) => (
          <Link
            key={i}
            href={feature.href}
            className="group p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all hover:scale-[1.02]"
          >
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(feature.category)}`}>
                {feature.category}
              </span>
              {feature.status && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  feature.status === 'Live' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : feature.status === 'Beta'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {feature.status}
                </span>
              )}
            </div>

            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition" 
                style={{ background: `${feature.color}15` }}
              >
                <span style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{feature.desc}</p>
                
                {/* Stats */}
                {feature.stats && (
                  <div className="flex gap-3 mt-2">
                    {feature.stats.map((stat, j) => (
                      <div key={j} className="flex items-center gap-1">
                        <span className="text-[10px] text-gray-500">{stat.label}:</span>
                        <span className="text-xs font-medium text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-[#00f0ff] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                  Explore <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg">No features found matching your search</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
            className="mt-4 text-[#00f0ff] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="glass p-6 rounded-xl border border-[#00f0ff]/10 text-center">
        <p className="text-gray-400 text-sm mb-4">
          Interactive demos powered by a local knowledge base — no API keys required. AI features are clearly labeled.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link 
            href="/contact" 
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Get Started
          </Link>
          <Link 
            href="/projects" 
            className="px-6 py-2 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition flex items-center gap-2"
          >
            <Eye size={16} />
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

// Search Icon Component
function SearchIcon({ size = 24, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}