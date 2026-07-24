'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Users, Target, Mic, FileText, MessageSquare, 
  ArrowRight, Sparkles, Brain, CheckCircle,
  TrendingUp, Clock, Award, Globe
} from 'lucide-react'

export default function AIRecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const features = [
    {
      icon: Target,
      title: 'Job Matcher',
      desc: 'Upload a job description. AI analyzes and calculates match percentage.',
      href: '/ai-recruiter/match',
      color: '#00f0ff',
      status: 'Live',
      badge: 'AI Powered'
    },
    {
      icon: Mic,
      title: 'AI Interview',
      desc: 'Practice technical interviews. AI asks questions and evaluates answers.',
      href: '/ai-recruiter/interview',
      color: '#7b2ffc',
      status: 'Live',
      badge: 'Interactive'
    },
    {
      icon: FileText,
      title: 'Proposal Generator',
      desc: 'Describe your project. AI generates a complete solution proposal.',
      href: '/ai-recruiter/proposal',
      color: '#ff6b35',
      status: 'Live',
      badge: 'AI Generated'
    },
    {
      icon: MessageSquare,
      title: 'Reverse Interview',
      desc: 'AI interviews the company to see if they\'re a good fit for you.',
      href: '/ai-recruiter/reverse',
      color: '#00f0ff',
      status: 'Coming Soon',
      badge: 'Preview'
    },
  ]

  const stats = [
    { value: '18+', label: 'Projects Analyzed', icon: <Award size={18} />, color: '#7b2ffc' },
    { value: '5', label: 'Countries', icon: <Globe size={18} />, color: '#ff6b35' },
    { value: '4+', label: 'Years Experience', icon: <Clock size={18} />, color: '#00f0ff' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full  " />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-6">
            <Brain size={14} />
            AI Recruiter Suite
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-text">AI Recruiter</span> Tools
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            AI-powered tools to help recruiters and hiring managers evaluate fit instantly.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className="glass p-6 rounded-2xl text-center border border-white/5 hover:border-[#00f0ff]/20 transition-all hover:scale-105"
            >
              <div className="flex justify-center mb-2" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <Link
              key={i}
              href={feature.href}
              className="group relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all hover:scale-[1.02] overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  feature.status === 'Live' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {feature.status}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition" 
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition">
                      {feature.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-[10px] font-medium">
                      {feature.badge}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
                  <div className="mt-3 flex items-center gap-2 text-[#00f0ff] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                    Launch Tool <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Upload Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="glass p-8 rounded-3xl border border-[#00f0ff]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <UploadIcon size={24} className="text-[#00f0ff]" />
                Quick Job Match
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Upload a job description and get instant AI analysis
              </p>
            </div>
            <Link
              href="/ai-recruiter/match"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              <Sparkles size={18} />
              Try Now
            </Link>
          </div>

          {/* Features List */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <CheckCircle size={16} className="text-emerald-400" />, text: 'Local knowledge base' },
              { icon: <CheckCircle size={16} className="text-emerald-400" />, text: '18+ Projects Analyzed' },
              { icon: <CheckCircle size={16} className="text-emerald-400" />, text: 'Instant demo responses' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="glass p-8 rounded-3xl border border-white/5 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-6xl">💬</span>
          </div>
          <p className="text-gray-300 text-lg italic">
            "The AI Recruiter tools helped me understand exactly how Abdul's skills match our requirements. 
            The job matcher and proposal generator saved us hours of manual evaluation."
          </p>
          <p className="text-white font-semibold mt-4">— CTO, Enterprise Company</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Upload Icon component
function UploadIcon({ size = 24, className = "" }) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}