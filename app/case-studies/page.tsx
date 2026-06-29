'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  ArrowRight, Play, TrendingUp, Zap, 
  Clock, Award, Users, Globe, Shield,
  Search, Filter, Sparkles, CheckCircle,
  BarChart3, Target, Brain, Server
} from 'lucide-react'

const caseStudies = [
  {
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    description: 'How I built a national-scale platform for DRC constitutional reform with AI sentiment analysis, military-grade security, and 5 production versions.',
    image: '/images/projects/maoni-dashboard.png',
    slug: 'maoni',
    color: '#00f0ff',
    category: 'Government',
    results: ['5 versions delivered', 'AI-powered analytics', 'Military-grade security', '99.9% uptime'],
    metrics: [
      { label: 'Versions', value: '5' },
      { label: 'Security', value: 'Military-Grade' },
      { label: 'Uptime', value: '99.9%' }
    ],
    tech: ['React', 'Node.js', 'Supabase', 'Claude API', 'PostgreSQL'],
    challenge: 'DRC needed a secure national platform for constitutional reform consultation handling sensitive citizen data with military-grade security.',
    duration: '6 months',
    team: '1 developer + 1 PM',
    impact: 'National-scale platform used by millions of citizens'
  },
  {
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    description: 'Building an interactive map tracking 3,500+ mobile network towers across all DRC provinces for the national telecom regulator.',
    image: '/images/projects/arptc-tower-map.png',
    slug: 'arptc',
    color: '#7b2ffc',
    category: 'Government',
    results: ['3,500+ towers tracked', '7 telecom operators', 'French interface', 'Complete docs'],
    metrics: [
      { label: 'Towers', value: '3,500+' },
      { label: 'Operators', value: '7' },
      { label: 'Languages', value: '2' }
    ],
    tech: ['React', 'Leaflet', 'PostgreSQL', 'XLSX'],
    challenge: 'Track and manage 3,500+ mobile network tower sites across all DRC provinces for the national telecom regulator.',
    duration: '4 months',
    team: '1 developer',
    impact: 'National telecom infrastructure management'
  },
  {
    title: 'Selzara',
    subtitle: 'AI Operating System for Amazon Sellers',
    description: 'Creating a 10-module SaaS with 457 daily organic visitors and $0 ad spend through SEO and community-led growth.',
    image: '/images/projects/selzara-dashboard.png',
    slug: 'selzara',
    color: '#ff6b35',
    category: 'AI',
    results: ['457 daily visitors', '$0 ad spend', '10 modules', '95% retention'],
    metrics: [
      { label: 'Visitors', value: '457/day' },
      { label: 'Ad Spend', value: '$0' },
      { label: 'Retention', value: '95%' }
    ],
    tech: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL'],
    challenge: 'Amazon sellers needed a comprehensive AI platform for PPC optimization, profit analytics, and inventory management.',
    duration: '8 months',
    team: '1 developer (solo founder)',
    impact: '457 daily organic visitors with zero paid advertising'
  },
  {
    title: 'JustFly',
    subtitle: 'Real-Time Flight Scraping Platform',
    description: 'Optimizing a 12-airline flight scraper from 2+ minutes to 30-45 seconds with Cloudflare bypass and desktop companion app.',
    image: '/images/projects/justfly-search.png',
    slug: 'justfly',
    color: '#00f0ff',
    category: 'Scraping',
    results: ['75% faster', '9/12 airlines', 'Cloudflare bypass', 'Desktop app'],
    metrics: [
      { label: 'Speed Improvement', value: '75%' },
      { label: 'Airlines', value: '9/12' },
      { label: 'Response', value: '30-45s' }
    ],
    tech: ['Django', 'React', 'Electron', 'Selenium', 'Playwright'],
    challenge: 'Nigerian travel market needed a real-time flight scraper that could handle Cloudflare and CAPTCHA challenges.',
    duration: '3 months',
    team: '1 developer',
    impact: 'Reduced response time from 2+ minutes to 30-45 seconds'
  },
  {
    title: 'SolidBridge',
    subtitle: 'AI-Enhanced Investment Platform',
    description: 'Building a modern fintech platform with portfolio management, wallet operations, and real-time financial analytics.',
    image: '/images/projects/solidbridge-dashboard.png',
    slug: 'solidbridge',
    color: '#7b2ffc',
    category: 'Fintech',
    results: ['Portfolio management', 'Real-time analytics', 'Secure transactions', 'Responsive'],
    metrics: [
      { label: 'Assets', value: 'Multi-asset' },
      { label: 'Transactions', value: 'Real-time' },
      { label: 'Security', value: 'Enterprise' }
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    challenge: 'Investors needed a centralized fintech platform with portfolio management, wallet operations, and real-time analytics.',
    duration: '5 months',
    team: '1 developer',
    impact: 'Modern investment platform with enterprise-grade security'
  },
  {
    title: 'AwazPK',
    subtitle: 'National Civic Voice Platform',
    description: 'Building a multi-lingual civic platform enabling citizens to report issues via voice in 5 languages with real-time AI triage.',
    image: '/images/projects/awazpk-voice.png',
    slug: 'awazpk',
    color: '#ff6b35',
    category: 'AI',
    results: ['5 languages', 'Real-time AI', 'Government dashboard', 'Map visualization'],
    metrics: [
      { label: 'Languages', value: '5' },
      { label: 'Response', value: 'Real-time' },
      { label: 'Coverage', value: 'National' }
    ],
    tech: ['React', 'TypeScript', 'Supabase', 'Claude AI'],
    challenge: 'Enable citizens to report public service issues via voice in 5 languages with real-time AI triage and routing.',
    duration: '4 months',
    team: '1 developer',
    impact: 'National civic engagement platform with voice AI'
  }
]

const categories = ['All', 'Government', 'AI', 'Fintech', 'Scraping']

export default function CaseStudiesPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(search.toLowerCase()) ||
                          study.description.toLowerCase().includes(search.toLowerCase()) ||
                          study.subtitle.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full blur-3xl animate-pulse" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-6">
            <Play size={14} />
            Case Studies
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-text">Deep Dives</span> into Complex Problems
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            How I solved real engineering challenges for governments and enterprises
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 max-w-7xl mx-auto pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '6+', label: 'Case Studies', icon: <Play size={20} />, color: '#00f0ff' },
            { value: '18+', label: 'Projects', icon: <Server size={20} />, color: '#7b2ffc' },
            { value: '5', label: 'Countries', icon: <Globe size={20} />, color: '#ff6b35' },
            { value: '4+', label: 'Years', icon: <Zap size={20} />, color: '#00f0ff' },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 rounded-2xl text-center border border-white/5">
              <div className="flex justify-center mb-1" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
      </section>

      {/* Case Studies Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No case studies found matching your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((study, i) => (
              <Link
                key={i}
                href={`/case-studies/${study.slug}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] text-xs">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{study.subtitle}</p>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">{study.description}</p>

                  {/* Results */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {study.results.slice(0, 3).map((result, j) => (
                      <span key={j} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs">
                        ✓ {result}
                      </span>
                    ))}
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {study.tech.slice(0, 3).map((t, j) => (
                      <span key={j} className="px-2 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] text-xs">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {study.duration}
                      </span>
                    </div>
                    <span className="text-[#00f0ff] text-sm flex items-center gap-1 group-hover:gap-2 transition">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}