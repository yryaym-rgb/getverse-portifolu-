'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Search, Filter, ArrowRight, Sparkles, 
  Globe, Code, Server, Database, Brain,
  Shield, Zap, Star, Orbit, Rocket,
  ChevronDown, ChevronUp, Grid3x3,
  LayoutGrid, List, X, ChevronRight  // ← ADD ChevronRight HERE
} from 'lucide-react'

interface Project {
  title: string
  subtitle: string
  description: string
  image: string
  slug: string
  color: string
  tech: string[]
  category: string
  status: 'active' | 'development' | 'completed'
  featured?: boolean
  size?: 'small' | 'medium' | 'large'
}

const projectsData: Project[] = [
  {
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    description: 'National-scale platform for DRC constitutional reform with AI sentiment analysis and military-grade security.',
    image: '/images/projects/maoni-dashboard.png',
    slug: 'maoni',
    color: '#00f0ff',
    tech: ['React', 'Node.js', 'Supabase', 'Claude API'],
    category: 'Government',
    status: 'active',
    featured: true,
    size: 'large'
  },
  {
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    description: 'Interactive map tracking 3,500+ mobile network towers across DRC for the national telecom regulator.',
    image: '/images/projects/arptc-tower-map.png',
    slug: 'arptc',
    color: '#7b2ffc',
    tech: ['React', 'Leaflet', 'PostgreSQL'],
    category: 'Government',
    status: 'active',
    size: 'medium'
  },
  {
    title: 'Selzara',
    subtitle: 'AI OS for Amazon Sellers',
    description: '10-module SaaS with 457 daily organic visitors, $0 ad spend, and AI-powered features.',
    image: '/images/projects/selzara-dashboard.png',
    slug: 'selzara',
    color: '#ff6b35',
    tech: ['Python', 'FastAPI', 'Supabase'],
    category: 'AI',
    status: 'active',
    featured: true,
    size: 'large'
  },
  {
    title: 'AwazPK',
    subtitle: 'National Civic Voice Platform',
    description: 'Multi-lingual civic platform with real-time AI triage in 5 languages.',
    image: '/images/projects/awazpk-voice.png',
    slug: 'awazpk',
    color: '#00f0ff',
    tech: ['React', 'TypeScript', 'Claude AI'],
    category: 'AI',
    status: 'active',
    size: 'medium'
  },
  {
    title: 'JustFly',
    subtitle: 'Real-Time Flight Scraping',
    description: '12-airline scraper with Cloudflare bypass, 75% faster response time.',
    image: '/images/projects/justfly-search.png',
    slug: 'justfly',
    color: '#7b2ffc',
    tech: ['Django', 'React', 'Selenium'],
    category: 'Scraping',
    status: 'active',
    size: 'small'
  },
  {
    title: 'SolidBridge',
    subtitle: 'AI-Enhanced Investment Platform',
    description: 'Modern fintech platform with portfolio management and real-time analytics.',
    image: '/images/projects/solidbridge-dashboard.png',
    slug: 'solidbridge',
    color: '#ff6b35',
    tech: ['React', 'TypeScript', 'Tailwind'],
    category: 'Fintech',
    status: 'active',
    size: 'medium'
  },
  {
    title: 'MediCare Pro',
    subtitle: 'Healthcare Management Platform',
    description: 'Comprehensive healthcare platform with appointments, records, and analytics.',
    image: '/images/projects/medicare-dashboard.png',
    slug: 'medicare',
    color: '#00f0ff',
    tech: ['React', 'TypeScript', 'REST APIs'],
    category: 'Healthcare',
    status: 'active',
    size: 'small'
  },
  {
    title: 'Tranquil',
    subtitle: 'Mental Wellness Platform',
    description: 'Digital wellness platform with mindfulness resources and guided journaling.',
    image: '/images/projects/tranquil-wellness.png',
    slug: 'tranquil',
    color: '#7b2ffc',
    tech: ['React', 'JavaScript', 'CSS3'],
    category: 'Healthcare',
    status: 'completed',
    size: 'small'
  },
  {
    title: 'Imtiaz Business',
    subtitle: 'Enterprise Business Management',
    description: 'Enterprise platform with real-time analytics, sales monitoring, and KPI reporting.',
    image: '/images/projects/imtiaz-business.png',
    slug: 'imtiaz',
    color: '#ff6b35',
    tech: ['React', 'TypeScript', 'Chart.js'],
    category: 'SaaS',
    status: 'active',
    size: 'medium'
  }
]

const categories = ['All', 'Government', 'AI', 'SaaS', 'Fintech', 'Healthcare', 'Scraping']

export default function ProjectUniverse() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [animateCards, setAnimateCards] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setAnimateCards(true)
  }, [])

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                          project.subtitle.toLowerCase().includes(search.toLowerCase()) ||
                          project.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large': return 'md:col-span-2 md:row-span-2'
      case 'medium': return 'md:col-span-1 md:row-span-1'
      case 'small': return 'md:col-span-1 md:row-span-1'
      default: return 'md:col-span-1'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government': return <Shield size={14} />
      case 'AI': return <Brain size={14} />
      case 'SaaS': return <Server size={14} />
      case 'Fintech': return <Database size={14} />
      case 'Healthcare': return <HeartIcon size={14} />
      case 'Scraping': return <Code size={14} />
      default: return <Globe size={14} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400'
      case 'development': return 'bg-yellow-500/20 text-yellow-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const stats = [
    { value: projectsData.length, label: 'Projects', icon: <Code size={14} />, color: '#00f0ff' },
    { value: categories.length - 1, label: 'Categories', icon: <LayoutGrid size={14} />, color: '#7b2ffc' },
    { value: projectsData.filter(p => p.featured).length, label: 'Featured', icon: <Star size={14} />, color: '#ff6b35' },
    { value: '100%', label: 'Production', icon: <Rocket size={14} />, color: '#00f0ff' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Orbit size={20} className="text-[#00f0ff]" />
          <h3 className="text-xl font-bold text-white">Project Universe</h3>
          <span className="text-xs text-gray-500">Interactive Space</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{filteredProjects.length} projects</span>
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid3x3 size={14} />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'compact' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-3 rounded-xl text-center border border-white/5">
            <div className="flex justify-center mb-0.5" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="text-lg font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <p className="text-gray-400 text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition whitespace-nowrap ${
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

      {/* Projects Grid */}
      <div 
        ref={containerRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 ${
          animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {filteredProjects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`group relative ${getSizeClass(project.size || 'small')} transition-all duration-500`}
            style={{ transitionDelay: `${index * 50}ms` }}
            onMouseEnter={() => setHoveredProject(project.slug)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className={`relative h-full bg-white/5 rounded-2xl overflow-hidden border transition-all duration-300 ${
              hoveredProject === project.slug
                ? 'border-[#00f0ff]/30 bg-white/10 scale-[1.02] shadow-lg shadow-[#00f0ff]/5'
                : 'border-white/5 hover:border-[#00f0ff]/20'
            }`}>
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-[10px] font-medium flex items-center gap-1">
                    <Star size={10} />
                    Featured
                  </span>
                </div>
              )}

              {/* Status Badge */}
              <div className={`absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1.5 ${getStatusColor(project.status)}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  project.status === 'active' ? 'bg-emerald-400' :
                  project.status === 'development' ? 'bg-yellow-400' :
                  'bg-blue-400'
                }`} />
                {project.status}
              </div>

              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-black/30">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    hoveredProject === project.slug ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1">
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white group-hover:text-[#00f0ff] transition truncate">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-xs truncate">{project.subtitle}</p>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ml-2 ${
                    hoveredProject === project.slug ? 'bg-[#00f0ff]/20 scale-110' : 'bg-white/5'
                  }`}>
                    <ChevronRight size={14} className={`text-[#00f0ff] transition-transform duration-300 ${
                      hoveredProject === project.slug ? 'translate-x-0.5' : ''
                    }`} />
                  </div>
                </div>

                <p className="text-gray-300 text-xs mt-1.5 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {project.tech.slice(0, viewMode === 'compact' ? 2 : 3).map((t, i) => (
                    <span 
                      key={i} 
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-medium"
                      style={{ 
                        background: `${project.color}15`, 
                        color: project.color
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > (viewMode === 'compact' ? 2 : 3) && (
                    <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400 text-[9px]">
                      +{project.tech.length - (viewMode === 'compact' ? 2 : 3)}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] transition-all duration-300 ${
                hoveredProject === project.slug ? 'scale-x-100' : 'scale-x-0'
              }`} />
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔭</div>
          <p className="text-gray-400 text-lg">No projects found in this universe</p>
          <button 
            onClick={() => { setSearch(''); setSelectedCategory('All') }}
            className="mt-3 text-[#00f0ff] hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

// Heart Icon Component
function HeartIcon({ size = 24, className = "" }) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}