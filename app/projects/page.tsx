'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Search, Filter, ArrowRight, Grid3x3, 
  List, Sparkles, Code, Server, Database,
  Brain, Shield, Zap, Globe, Users,
  Star, ChevronDown, X, LayoutGrid
} from 'lucide-react'
import { getAllProjects, getFeaturedProjects, getAllProjectCategories, Project } from '../lib/projectsData'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'alphabetical'>('featured')
  const [showFilters, setShowFilters] = useState(false)

  const allProjects = getAllProjects()
  const featuredProjects = getFeaturedProjects()
  const categories = getAllProjectCategories()

  const filteredProjects = useMemo(() => {
    let projects = allProjects

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tech.some(t => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      projects = projects.filter(p => p.category === selectedCategory)
    }

    // Sorting
    switch (sortBy) {
      case 'featured':
        projects = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'newest':
        // Projects are already in order, but we can keep as is
        break
      case 'alphabetical':
        projects = [...projects].sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return projects
  }, [allProjects, searchQuery, selectedCategory, sortBy])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government': return <Shield size={14} />
      case 'AI': return <Brain size={14} />
      case 'SaaS': return <Server size={14} />
      case 'Fintech': return <Database size={14} />
      case 'Healthcare': return <Zap size={14} />
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

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-400'
      case 'development': return 'bg-yellow-400'
      case 'completed': return 'bg-blue-400'
      default: return 'bg-gray-400'
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSortBy('featured')
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full  " />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Code size={14} />
            Project Universe
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">18+</span> Production Projects
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Every platform I've built — from government systems to AI SaaS, fintech, and healthcare.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="px-4 max-w-7xl mx-auto pb-8">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects by name, tech, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition flex items-center gap-2 whitespace-nowrap"
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className="flex gap-1 bg-white/5 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3x3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="glass p-4 rounded-2xl border border-white/5 animate-fadeIn">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-gray-400">Categories:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-white/5">
                <span className="text-sm text-gray-400">Sort by:</span>
                {['featured', 'newest', 'alphabetical'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      sortBy === option
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/20'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
                {(searchQuery || selectedCategory !== 'All') && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-white transition ml-auto"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Count */}
      <section className="px-4 max-w-7xl mx-auto pb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing <span className="text-white font-medium">{filteredProjects.length}</span> projects
          </p>
          {filteredProjects.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              {filteredProjects.filter(p => p.status === 'active').length} active
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-20">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No projects found matching your criteria</p>
            <button
              onClick={clearFilters}
              className="mt-3 text-[#00f0ff] hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all hover:scale-[1.02]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-xs font-medium">
                      <Star size={12} />
                      Featured
                    </div>
                  )}

                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(project.status)}`} />
                      <span className="text-white capitalize">{project.status}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{project.subtitle}</p>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">{project.description}</p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tech.slice(0, 3).map((t, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: `${project.color}15`, color: project.color }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {project.metrics && project.metrics.length > 0 && (
                        project.metrics.slice(0, 2).map((metric, j) => (
                          <span key={j} className="flex items-center gap-1">
                            <span className="text-[#00f0ff]">{metric.value}</span>
                            {metric.label}
                          </span>
                        ))
                      )}
                    </div>
                    <span className="text-[#00f0ff] text-sm flex items-center gap-1 group-hover:gap-2 transition">
                      Open <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition-all"
              >
                {/* Image */}
                <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {project.featured && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-xs font-medium">
                      <Star size={10} />
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition">
                      {project.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-400">
                      {project.category}
                    </span>
                    {project.status && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{project.subtitle}</p>
                  <p className="text-gray-300 text-sm mt-1 line-clamp-2">{project.description}</p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {project.tech.slice(0, 4).map((t, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: `${project.color}15`, color: project.color }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-xs">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      {project.metrics.map((metric, j) => (
                        <span key={j} className="flex items-center gap-1">
                          <span className="text-[#00f0ff] font-medium">{metric.value}</span>
                          {metric.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <span className="text-[#00f0ff] text-sm flex items-center gap-1 group-hover:gap-2 transition">
                    View <ArrowRight size={14} />
                  </span>
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