'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Shield, Brain, Cloud, Heart, Landmark, 
  Map, Database, Bot, ArrowRight, Sparkles,
  Code, Server, Users, Globe, Zap,
  CheckCircle, Star, Award, TrendingUp,
  Clock, MessageSquare, FileText, Settings,
  ChevronDown, ChevronUp, Search, Filter
} from 'lucide-react'

interface Solution {
  icon: React.ReactNode
  title: string
  description: string
  example: string
  color: string
  features: string[]
  benefits: string[]
  technologies: string[]
  industries: string[]
}

export default function SolutionsPage() {
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  const solutions: Solution[] = [
    {
      icon: <Shield size={28} />,
      title: 'Government Systems',
      description: 'National-scale platforms with military-grade security, audit logging, and multi-role admin panels for government agencies.',
      example: 'MAONI, ARPTC Tower Map',
      color: '#00f0ff',
      features: [
        'Military-grade security',
        'Audit logging and compliance',
        'Multi-role admin panels',
        'National-scale infrastructure',
        'Real-time data processing',
        'French and English support'
      ],
      benefits: [
        'Trusted by governments',
        'Handles sensitive data',
        'Compliant with regulations',
        'Scalable to millions of users'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Claude API', 'Nginx', 'Docker'],
      industries: ['Government', 'Public Sector', 'Defense']
    },
    {
      icon: <Brain size={28} />,
      title: 'AI Automation',
      description: 'Intelligent systems using Claude API, OpenAI, LangChain, and RAG pipelines for automation, analytics, and decision-making.',
      example: 'Selzara, Sentiment Analysis',
      color: '#7b2ffc',
      features: [
        'AI-powered automation',
        'Sentiment analysis',
        'Content generation',
        'RAG pipelines',
        'Intelligent decision-making',
        'Workflow automation'
      ],
      benefits: [
        'Saves 10+ hours/week',
        'Improves decision quality',
        'Scales with your business',
        'Reduces manual work'
      ],
      technologies: ['Claude API', 'OpenAI', 'LangChain', 'Python', 'FastAPI', 'n8n'],
      industries: ['AI', 'Technology', 'E-commerce', 'Finance']
    },
    {
      icon: <Cloud size={28} />,
      title: 'Enterprise Software',
      description: 'Scalable platforms for large organizations with real-time analytics, business intelligence, and secure infrastructure.',
      example: 'SolidBridge, Imtiaz Business',
      color: '#ff6b35',
      features: [
        'Real-time analytics',
        'Business intelligence',
        'Secure infrastructure',
        'Scalable architecture',
        'User management',
        'API-first design'
      ],
      benefits: [
        'Centralizes operations',
        'Improves decision-making',
        'Reduces operational costs',
        'Enables data-driven strategy'
      ],
      technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
      industries: ['Enterprise', 'Finance', 'Technology', 'Retail']
    },
    {
      icon: <Heart size={28} />,
      title: 'Healthcare',
      description: 'Comprehensive healthcare management platforms with appointment scheduling, patient records, provider coordination, and analytics.',
      example: 'MediCare Pro',
      color: '#00f0ff',
      features: [
        'Appointment scheduling',
        'Patient records management',
        'Provider coordination',
        'Healthcare analytics',
        'Secure data handling',
        'Responsive design'
      ],
      benefits: [
        'Improves patient care',
        'Reduces administrative burden',
        'Enhances provider efficiency',
        'Ensures data privacy'
      ],
      technologies: ['React', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Tailwind CSS'],
      industries: ['Healthcare', 'Medical', 'Wellness']
    },
    {
      icon: <Landmark size={28} />,
      title: 'Fintech',
      description: 'Investment platforms with portfolio management, wallet operations, transaction tracking, and real-time financial analytics.',
      example: 'SolidBridge Investments',
      color: '#7b2ffc',
      features: [
        'Portfolio management',
        'Wallet operations',
        'Transaction tracking',
        'Real-time analytics',
        'Secure transactions',
        'Multi-asset support'
      ],
      benefits: [
        'Simplifies investment management',
        'Provides real-time insights',
        'Ensures transaction security',
        'Supports multiple asset types'
      ],
      technologies: ['React', 'TypeScript', 'Chart.js', 'REST APIs', 'Tailwind CSS'],
      industries: ['Finance', 'Fintech', 'Investment']
    },
    {
      icon: <Map size={28} />,
      title: 'Mapping & Geospatial',
      description: 'Interactive mapping platforms with 3,500+ locations, CRUD operations, bulk data import, and multiple map styles.',
      example: 'ARPTC Tower Map',
      color: '#ff6b35',
      features: [
        'Interactive mapping',
        'CRUD operations',
        'Bulk data import',
        'Multiple map styles',
        'Geospatial analytics',
        'French-language support'
      ],
      benefits: [
        'Visualizes infrastructure',
        'Enables data-driven planning',
        'Improves asset management',
        'Supports decision-making'
      ],
      technologies: ['React', 'Leaflet', 'PostgreSQL', 'XLSX', 'Tailwind CSS'],
      industries: ['Telecom', 'Infrastructure', 'Government']
    },
    {
      icon: <Database size={28} />,
      title: 'Data Analytics',
      description: 'Real-time dashboards, business intelligence, and KPI reporting with interactive visualizations and insights.',
      example: 'Engineering Dashboard',
      color: '#00f0ff',
      features: [
        'Real-time dashboards',
        'Business intelligence',
        'KPI reporting',
        'Interactive visualizations',
        'Data insights',
        'Customizable reports'
      ],
      benefits: [
        'Provides actionable insights',
        'Enables data-driven decisions',
        'Improves operational visibility',
        'Tracks key metrics'
      ],
      technologies: ['React', 'Chart.js', 'TypeScript', 'REST APIs', 'Tailwind CSS'],
      industries: ['Business', 'Technology', 'Finance']
    },
    {
      icon: <Bot size={28} />,
      title: 'AI Agents',
      description: 'Conversational AI, automation systems, and intelligent agents for customer qualification, lead handling, and support.',
      example: 'AI Recruiter, Chatbots',
      color: '#7b2ffc',
      features: [
        'Conversational AI',
        'Automation workflows',
        'Customer qualification',
        'Lead handling',
        '24/7 support',
        'Multi-language support'
      ],
      benefits: [
        'Automates customer interactions',
        'Provides 24/7 availability',
        'Improves response times',
        'Reduces support costs'
      ],
      technologies: ['Claude API', 'OpenAI', 'Python', 'FastAPI', 'Web Speech API'],
      industries: ['Customer Service', 'Sales', 'Technology']
    }
  ]

  const industries = ['All', 'Government', 'AI', 'Finance', 'Healthcare', 'Telecom', 'Enterprise']

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          solution.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          solution.example.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry = selectedIndustry === 'All' || solution.industries.includes(selectedIndustry)
    return matchesSearch && matchesIndustry
  })

  const toggleExpand = (title: string) => {
    setExpandedSolution(expandedSolution === title ? null : title)
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full blur-3xl animate-pulse" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Settings size={14} />
            Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Solutions</span> I Provide
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            End-to-end solutions across industries — from government systems to AI automation, fintech, and healthcare.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '8+', label: 'Solution Areas', icon: <Settings size={18} />, color: '#00f0ff' },
            { value: '18+', label: 'Projects Delivered', icon: <Code size={18} />, color: '#7b2ffc' },
            { value: '5', label: 'Industries', icon: <Globe size={18} />, color: '#ff6b35' },
            { value: '100%', label: 'Client Satisfaction', icon: <Star size={18} />, color: '#00f0ff' },
          ].map((stat, i) => (
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

      {/* Search & Filter */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                  selectedIndustry === industry
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        {filteredSolutions.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No solutions found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSolutions.map((solution, index) => (
              <div
                key={index}
                className="glass p-6 rounded-2xl border border-white/5 hover:border-[#00f0ff]/30 transition-all hover:scale-[1.02]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${solution.color}15` }}
                  >
                    <span style={{ color: solution.color }}>{solution.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{solution.description}</p>
                    
                    {/* Example */}
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Example:</span>
                      <span className="text-[#00f0ff] font-medium">{solution.example}</span>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {solution.technologies.slice(0, 4).map((tech, j) => (
                        <span 
                          key={j} 
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ background: `${solution.color}15`, color: solution.color }}
                        >
                          {tech}
                        </span>
                      ))}
                      {solution.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[10px]">
                          +{solution.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleExpand(solution.title)}
                      className="mt-3 text-sm text-gray-400 hover:text-white transition flex items-center gap-1"
                    >
                      {expandedSolution === solution.title ? (
                        <>Show Less <ChevronUp size={14} /></>
                      ) : (
                        <>Learn More <ChevronDown size={14} /></>
                      )}
                    </button>

                    {/* Expanded Content */}
                    {expandedSolution === solution.title && (
                      <div className="mt-4 pt-4 border-t border-white/5 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Features */}
                          <div>
                            <h4 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2">
                              Features
                            </h4>
                            <ul className="space-y-1">
                              {solution.features.map((feature, j) => (
                                <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Benefits */}
                          <div>
                            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
                              Benefits
                            </h4>
                            <ul className="space-y-1">
                              {solution.benefits.map((benefit, j) => (
                                <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                                  <TrendingUp size={14} className="text-[#7b2ffc] flex-shrink-0 mt-0.5" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Link 
                          href="/contact" 
                          className="mt-4 inline-flex items-center gap-2 text-[#00f0ff] text-sm font-medium hover:gap-3 transition"
                        >
                          Discuss This Solution <ArrowRight size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#00f0ff]/5 via-[#7b2ffc]/5 to-[#ff6b35]/5 border border-[#00f0ff]/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Need a <span className="gradient-text">Custom</span> Solution?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Every project is unique. I work with clients to understand their specific needs 
            and deliver tailored solutions that exceed expectations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center gap-2"
            >
              <Sparkles size={18} />
              Get Custom Quote
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl border border-gray-700 text-white font-semibold hover:border-[#00f0ff] transition"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}