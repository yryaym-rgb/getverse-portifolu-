'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, ExternalLink, Github, Code, 
  Server, Database, Brain, Shield, Zap,
  Clock, Users, Target, Award, CheckCircle,
  ChevronRight, Sparkles, Star, GitBranch,
  Terminal, Layers, Box, Globe, Lock,
  BarChart3, Activity, Download, Copy
} from 'lucide-react'
import { getProjectBySlug, getAllProjects } from '../../lib/projectsData'
import AIExplainer from '../../components/Projects/AIExplainer'

export default function ProjectDetail() {
  const params = useParams()
  const slug = params.slug as string
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Government': return <Shield size={20} />
      case 'AI': return <Brain size={20} />
      case 'SaaS': return <Server size={20} />
      case 'Fintech': return <Database size={20} />
      case 'Healthcare': return <Zap size={20} />
      case 'Scraping': return <Code size={20} />
      default: return <Globe size={20} />
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

  const getTechIcon = (tech: string) => {
    const icons: Record<string, string> = {
      'React': '⚛️',
      'Next.js': '▲',
      'TypeScript': '🔷',
      'Tailwind CSS': '🎨',
      'Python': '🐍',
      'FastAPI': '🚀',
      'Django': '🎯',
      'Node.js': '🟢',
      'PostgreSQL': '🐘',
      'Supabase': '🔥',
      'Claude API': '🧠',
      'OpenAI': '🤖',
    }
    return icons[tech] || '🔧'
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden mb-8">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-medium flex items-center gap-1.5">
                {getCategoryIcon(project.category)}
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-xs font-medium flex items-center gap-1.5">
                  <Star size={14} />
                  Featured
                </span>
              )}
              {project.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">{project.title}</h1>
            <p className="text-gray-300 text-lg mt-1">{project.subtitle}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h2 className="text-xl font-bold text-white mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                  <Target size={16} />
                  Challenge
                </h3>
                <p className="text-gray-300 mt-2">{project.challenge}</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Brain size={16} />
                  Solution
                </h3>
                <p className="text-gray-300 mt-2">{project.solution}</p>
              </div>
            </div>

            {/* Features */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle size={18} className="text-[#00f0ff]" />
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <span 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                      style={{ background: project.color }}
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Explainer */}
            <AIExplainer 
              projectTitle={project.title}
              projectDescription={project.description}
              projectTech={project.tech}
              projectSlug={project.slug}
            />

            {/* Tech Stack Details */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Code size={18} className="text-[#7b2ffc]" />
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.tech.map((tech, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <span className="text-lg">{getTechIcon(tech)}</span>
                    <span className="text-gray-300 text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Info */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Quick Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={16} className="text-[#ff6b35]" />
                  <span className="text-gray-300">Duration: {project.metrics?.[0]?.value || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-[#7b2ffc]" />
                  <span className="text-gray-300">Team: 1 Developer</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe size={16} className="text-[#00f0ff]" />
                  <span className="text-gray-300">Category: {project.category}</span>
                </div>
                {project.status && (
                  <div className="flex items-center gap-3 text-sm">
                    <Activity size={16} className="text-emerald-400" />
                    <span className="text-gray-300 capitalize">Status: {project.status}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Metrics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-lg font-bold text-[#00f0ff]">{metric.value}</div>
                      <div className="text-gray-400 text-xs">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Links
              </h3>
              <div className="space-y-2">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-[#00f0ff] transition p-2 rounded-lg hover:bg-white/5"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                    <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition" />
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-[#00f0ff] transition p-2 rounded-lg hover:bg-white/5"
                  >
                    <Github size={16} />
                    <span>GitHub Repository</span>
                    <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition" />
                  </a>
                )}
              </div>
            </div>

            {/* CTA */}
            <Link 
              href="/contact" 
              className="block text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Discuss This Project
            </Link>

            {/* Related Projects */}
            <div className="glass p-4 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Related Projects
              </h3>
              <div className="space-y-2">
                {getAllProjects()
                  .filter(p => p.slug !== project.slug && p.category === project.category)
                  .slice(0, 3)
                  .map((related) => (
                    <Link
                      key={related.slug}
                      href={`/projects/${related.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition group"
                    >
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0" 
                        style={{ background: related.color }}
                      />
                      <span className="text-gray-300 text-sm group-hover:text-white transition">
                        {related.title}
                      </span>
                      <ChevronRight size={14} className="ml-auto text-gray-500 opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}