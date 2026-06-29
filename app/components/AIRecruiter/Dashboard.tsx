'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Users, Target, Mic, FileText, MessageSquare, 
  ArrowRight, Sparkles, Brain, CheckCircle,
  TrendingUp, Clock, Award, Globe,
  BarChart3, Zap, Shield, Code,
  Search, Filter, Download, Eye,
  Star, Rocket, Gem, Crown
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  desc: string
  href: string
  color: string
  status: 'Live' | 'Coming Soon' | 'Beta'
  badge: string
  stats?: { label: string; value: string }[]
  gradient: string
  glowColor: string
}

export default function AIRecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  const features: Feature[] = [
    {
      icon: <Target size={24} />,
      title: 'Job Matcher',
      desc: 'Upload a job description. AI analyzes and calculates match percentage with detailed breakdown.',
      href: '/ai-recruiter/match',
      color: '#00f0ff',
      status: 'Live',
      badge: 'AI Powered',
      gradient: 'from-[#00f0ff]/20 via-[#00f0ff]/5 to-transparent',
      glowColor: '#00f0ff',
      stats: [
        { label: 'Accuracy', value: '96%' },
        { label: 'Projects', value: '18+' }
      ]
    },
    {
      icon: <Mic size={24} />,
      title: 'AI Interview',
      desc: 'Practice technical interviews. AI asks questions and evaluates answers with expert feedback.',
      href: '/ai-recruiter/interview',
      color: '#7b2ffc',
      status: 'Live',
      badge: 'Interactive',
      gradient: 'from-[#7b2ffc]/20 via-[#7b2ffc]/5 to-transparent',
      glowColor: '#7b2ffc',
      stats: [
        { label: 'Questions', value: '6' },
        { label: 'Categories', value: '6' }
      ]
    },
    {
      icon: <FileText size={24} />,
      title: 'Proposal Generator',
      desc: 'Describe your project. AI generates a complete solution proposal with architecture and timeline.',
      href: '/ai-recruiter/proposal',
      color: '#ff6b35',
      status: 'Live',
      badge: 'AI Generated',
      gradient: 'from-[#ff6b35]/20 via-[#ff6b35]/5 to-transparent',
      glowColor: '#ff6b35',
      stats: [
        { label: 'Response', value: '2-3s' },
        { label: 'Accuracy', value: '92%' }
      ]
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Reverse Interview',
      desc: 'AI interviews the company to see if they\'re a good fit for you and your career goals.',
      href: '/ai-recruiter/reverse',
      color: '#00f0ff',
      status: 'Coming Soon',
      badge: 'Preview',
      gradient: 'from-[#00f0ff]/20 via-[#00f0ff]/5 to-transparent',
      glowColor: '#00f0ff',
      stats: [
        { label: 'Questions', value: '6' },
        { label: 'Type', value: 'Reverse' }
      ]
    },
  ]

  const stats = [
    { value: '96%', label: 'Avg Match Score', icon: <Target size={18} />, color: '#00f0ff', glow: 'shadow-[#00f0ff]/20' },
    { value: '18+', label: 'Projects Analyzed', icon: <Award size={18} />, color: '#7b2ffc', glow: 'shadow-[#7b2ffc]/20' },
    { value: '5', label: 'Countries', icon: <Globe size={18} />, color: '#ff6b35', glow: 'shadow-[#ff6b35]/20' },
    { value: '4+', label: 'Years Experience', icon: <Clock size={18} />, color: '#00f0ff', glow: 'shadow-[#00f0ff]/20' },
    { value: '22+', label: 'AI Integrations', icon: <Brain size={18} />, color: '#7b2ffc', glow: 'shadow-[#7b2ffc]/20' },
    { value: '99.98%', label: 'Uptime', icon: <Shield size={18} />, color: '#ff6b35', glow: 'shadow-[#ff6b35]/20' },
  ]

  const filteredFeatures = features.filter(f => 
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10">
      {/* Premium Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex justify-center">
          <div className="w-40 h-40 bg-[#00f0ff]/5 rounded-full " />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Crown size={14} />
            AI Recruiter Suite — Enterprise Grade
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI Recruiter</span> Tools
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-lg">
            AI-powered tools to help recruiters and hiring managers evaluate fit instantly.
          </p>
        </div>
      </div>

      {/* Premium Stats — Glass Morphism with Glow */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass p-4 rounded-2xl text-center border border-white/5 hover:border-[${stat.color}]/30 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-xl ${stat.glow}`}
          >
            <div className="flex justify-center mb-1" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <p className="text-gray-400 text-xs">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search Bar with Premium Design */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/10 via-[#7b2ffc]/10 to-[#ff6b35]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#00f0ff] transition-colors" />
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff]/50 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-[#00f0ff]/10 group-hover:border-white/20"
          />
        </div>
      </div>

      {/* Premium Features Grid — Cards with Depth */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFeatures.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <Link href={feature.href}>
              <div className="relative p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-500 overflow-hidden cursor-pointer">
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Glowing Orb */}
                <div 
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full  group-hover:opacity-30 transition-all duration-700 group-hover:scale-150"
                  style={{ background: feature.glowColor }}
                />

                {/* Premium Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent" />
                </div>

                <div className="relative z-10">
                  {/* Badge Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg"
                      style={{ 
                        background: `${feature.color}15`,
                        boxShadow: `0 0 30px ${feature.color}10`
                      }}
                    >
                      <span style={{ color: feature.color }}>{feature.icon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        feature.status === 'Live' 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' 
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {feature.status}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-[10px] font-medium border border-[#00f0ff]/20">
                        {feature.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{feature.desc}</p>
                  
                  {/* Stats with Icons */}
                  {feature.stats && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {feature.stats.map((stat, j) => (
                        <div key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                          <span className="text-[10px] text-gray-400">{stat.label}</span>
                          <span className="text-xs font-bold text-white">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA with Arrow Animation */}
                  <div className="mt-5 flex items-center gap-2 text-[#00f0ff] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Launch Tool 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredFeatures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No tools found matching your search</p>
        </div>
      )}

      {/* Premium Quick Upload Section */}
      <div className="glass p-7 rounded-2xl border border-[#00f0ff]/10 hover:border-[#00f0ff]/30 transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/5 via-[#7b2ffc]/5 to-[#ff6b35]/5 opacity-0 hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#00f0ff]/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
              <FileText size={24} className="text-[#00f0ff]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Quick Job Match
                <Sparkles size={16} className="text-[#00f0ff] " />
              </h3>
              <p className="text-gray-400 text-sm">Upload a job description and get instant AI analysis</p>
            </div>
          </div>
          <Link
            href="/ai-recruiter/match"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <Rocket size={16} />
            Try Now
          </Link>
        </div>
      </div>

      {/* Premium Testimonial */}
      <div className="glass p-8 rounded-2xl border border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/5 via-[#7b2ffc]/5 to-[#ff6b35]/5" />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <span className="text-5xl">💬</span>
          </div>
          <p className="text-gray-300 text-lg italic max-w-3xl mx-auto leading-relaxed">
            "The AI Recruiter tools helped me understand exactly how Abdul's skills match our requirements. 
            The job matcher and proposal generator saved us hours of manual evaluation."
          </p>
          <p className="text-white font-semibold text-sm mt-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full " />
            — CTO, Enterprise Company
          </p>
        </div>
      </div>

      {/* Premium CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link 
          href="/contact" 
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <MessageSquare size={16} />
          Contact Abdul
        </Link>
        <Link 
          href="/projects" 
          className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all duration-300 flex items-center gap-2 group"
        >
          <Code size={16} className="group-hover:rotate-12 transition-transform" />
          View Projects
        </Link>
        <Link 
          href="/digital-twin" 
          className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all duration-300 flex items-center gap-2 group"
        >
          <Brain size={16} className="group-hover:scale-110 transition-transform" />
          Talk to AI Twin
        </Link>
      </div>
    </div>
  )
}