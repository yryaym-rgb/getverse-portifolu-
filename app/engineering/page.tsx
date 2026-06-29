'use client'

import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Server, Database, Cloud, Code, Shield, GitBranch, Terminal, ArrowRight, Sparkles, Cpu, Network, Layers, Box, Zap, BarChart3, Lock, Eye, Activity, HardDrive, Globe, Settings, Wrench } from 'lucide-react'

interface EngineeringTool {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
  status: 'Live' | 'Beta' | 'Coming Soon'
  tags: string[]
  stats?: { label: string; value: string }[]
}

export default function EngineeringPage() {
  const tools: EngineeringTool[] = [
    {
      icon: <Cpu size={24} />,
      title: 'Interactive Architecture',
      description: 'Explore system architecture with clickable nodes and real-time visualization.',
      href: '/engineering/architecture',
      color: '#00f0ff',
      status: 'Live',
      tags: ['System Design', 'Visualization'],
      stats: [{ label: 'Nodes', value: '12' }]
    },
    {
      icon: <GitBranch size={24} />,
      title: 'CI/CD Pipeline',
      description: 'Watch production deployment in action with live pipeline simulation.',
      href: '/engineering/deployment',
      color: '#7b2ffc',
      status: 'Live',
      tags: ['DevOps', 'Automation'],
      stats: [{ label: 'Steps', value: '9' }]
    },
    {
      icon: <Database size={24} />,
      title: 'Database Explorer',
      description: 'Explore database schema, relationships, and sample data in real-time.',
      href: '/engineering/database',
      color: '#ff6b35',
      status: 'Live',
      tags: ['PostgreSQL', 'Data'],
      stats: [{ label: 'Tables', value: '4' }]
    },
    {
      icon: <Code size={24} />,
      title: 'API Explorer',
      description: 'Test API endpoints with live responses and request builder.',
      href: '/engineering/api',
      color: '#00f0ff',
      status: 'Live',
      tags: ['REST API', 'Testing'],
      stats: [{ label: 'Methods', value: '7' }]
    },
    {
      icon: <Terminal size={24} />,
      title: 'Engineering Lab',
      description: 'Test AI models for OCR, sentiment analysis, translation, and more.',
      href: '/engineering/lab',
      color: '#7b2ffc',
      status: 'Live',
      tags: ['AI', 'Testing'],
      stats: [{ label: 'Models', value: '6' }]
    },
    {
      icon: <Shield size={24} />,
      title: 'Security Audit',
      description: 'AI-powered security analysis for your code and infrastructure.',
      href: '/code-review',
      color: '#ff6b35',
      status: 'Live',
      tags: ['Security', 'AI'],
      stats: [{ label: 'Checks', value: '10+' }]
    }
  ]

  const categories = ['All', 'DevOps', 'AI', 'Data', 'Security', 'Testing']

  const stats = [
    { value: '6', label: 'Tools', icon: <Wrench size={16} />, color: '#00f0ff' },
    { value: '18+', label: 'Projects', icon: <Box size={16} />, color: '#7b2ffc' },
    { value: '99.98%', label: 'Uptime', icon: <Activity size={16} />, color: '#ff6b35' },
    { value: '4+', label: 'Years', icon: <Zap size={16} />, color: '#00f0ff' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full  " />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Server size={14} />
            Engineering Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Engineering</span> Playground
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Interactive tools that demonstrate my engineering approach — from architecture to deployment.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-4 rounded-2xl text-center border border-white/5">
              <div className="flex justify-center mb-1" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all hover:scale-[1.02]"
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                  tool.status === 'Live' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : tool.status === 'Beta'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {tool.status}
                </span>
              </div>

              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition"
                style={{ background: `${tool.color}15` }}
              >
                <span style={{ color: tool.color }}>{tool.icon}</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition">
                {tool.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2">{tool.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tool.tags.map((tag, j) => (
                  <span key={j} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[10px] border border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              {tool.stats && (
                <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
                  {tool.stats.map((stat, j) => (
                    <div key={j} className="flex items-center gap-1">
                      <span className="text-[10px] text-gray-500">{stat.label}:</span>
                      <span className="text-xs font-medium text-white">{stat.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-4 flex items-center gap-2 text-[#00f0ff] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                Explore <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 p-8 rounded-3xl glass border border-white/5 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
            <Sparkles size={18} className="text-[#00f0ff]" />
            <span className="text-sm font-medium">More Tools Coming Soon</span>
          </div>
          <p className="text-gray-500 text-sm">
            I'm constantly building new tools and features. Check back for updates.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}