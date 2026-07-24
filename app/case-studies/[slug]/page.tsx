'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import StatCard from '../../components/ui/StatCard'
import { architectureDiagrams } from '../../lib/architectureDiagrams'
import { 
  ArrowLeft, CheckCircle, ArrowRight, 
  Server, Brain, Shield,
  Clock, Users, Target, Award, Zap,
  Code, ExternalLink, Globe
} from 'lucide-react'

const ScreenshotCarousel = dynamic(() => import('../../components/ui/ScreenshotCarousel'), { ssr: false })
const MermaidDiagram = dynamic(() => import('../../components/MermaidDiagram'), { ssr: false })

const maoniSlides = [
  { src: '/images/projects/maoni-dashboard.png', alt: 'MAONI dashboard', caption: 'Presidential consultation dashboard — real-time citizen proposals' },
  { src: '/images/projects/maoni-dashboard.png', alt: 'MAONI citizen view', caption: 'Citizen portal — submit proposals and track constitutional reform' },
  { src: '/images/projects/maoni-dashboard.png', alt: 'MAONI admin panel', caption: 'Hidden multi-role admin panel with full audit logging' },
]

const caseStudiesData: Record<string, any> = {
  maoni: {
    title: 'MAONI',
    subtitle: 'Presidential Civic Consultation Platform',
    challenge: 'The Democratic Republic of Congo needed a national platform for constitutional reform consultation. The system had to handle sensitive citizen data with military-grade security while being accessible to millions of citizens across the country.',
    solution: 'Built a 5-version platform with AI sentiment analysis using Claude API, hidden multi-role admin panel, and full audit logging. The system processes citizen proposals in real-time and generates presidential briefing reports automatically.',
    architecture: ['React Frontend', 'Node.js API', 'Supabase', 'PostgreSQL', 'Claude API', 'Nginx', 'Ubuntu VPS'],
    results: [
      '5 production versions delivered successfully',
      'AI-powered sentiment analysis in real-time',
      'Military-grade security implemented and verified',
      'Full audit logging for all actions',
      '99.9% uptime maintained',
      'Trusted by the DRC Presidential Office'
    ],
    tech: ['React', 'Node.js', 'Supabase', 'Claude API', 'PostgreSQL'],
    lessons: 'Working with government clients requires extreme attention to security, documentation, and scalability. Each version improved based on user feedback and changing requirements. Security cannot be an afterthought — it must be baked into every layer of the architecture from day one.',
    image: '/images/projects/maoni-dashboard.png',
    category: 'Government',
    duration: '6 months',
    team: '1 developer + 1 PM',
    timeline: [
      { phase: 'Research & Requirements', weeks: '2 weeks', done: true },
      { phase: 'Architecture Design', weeks: '2 weeks', done: true },
      { phase: 'Development v1', weeks: '4 weeks', done: true },
      { phase: 'Testing & Refinement', weeks: '3 weeks', done: true },
      { phase: 'Deployment v1', weeks: '1 week', done: true },
      { phase: 'Iterations v2-v5', weeks: '12 weeks', done: true }
    ],
    metrics: [
      { label: 'Versions', value: '5', color: '#00f0ff' },
      { label: 'Uptime', value: '99.9%', color: '#7b2ffc' },
      { label: 'Security', value: 'Military-Grade', color: '#ff6b35' },
      { label: 'Users', value: 'Millions', color: '#00f0ff' }
    ]
  },
  arptc: {
    title: 'ARPTC Tower Map',
    subtitle: 'National Telecom Infrastructure',
    challenge: 'Track 3,500+ mobile network tower sites across all DRC provinces for the national telecom regulator. The system needed to handle bulk imports, multiple map styles, and French-language interface.',
    solution: 'Built interactive mapping platform with CRUD operations, bulk Excel/CSV import, soft-delete trash/restore system, and multiple map styles (Streets, Satellite, Terrain). Delivered two parallel live versions.',
    architecture: ['React 18', 'React-Leaflet', 'PostgreSQL', 'XLSX Processing', 'Netlify'],
    results: [
      '3,500+ towers tracked across all provinces',
      '7 telecom operators covered',
      'French-language interface implemented',
      'Complete technical documentation delivered',
      'Bulk import/export functionality',
      'Soft-delete trash/restore system'
    ],
    tech: ['React', 'Leaflet', 'PostgreSQL', 'XLSX'],
    lessons: 'Handling large datasets requires efficient data processing and thoughtful UX for bulk operations. Users need to trust that their data is safe — soft-delete was a critical feature for peace of mind.',
    image: '/images/projects/arptc-tower-map.png',
    category: 'Government',
    duration: '4 months',
    team: '1 developer',
    timeline: [
      { phase: 'Research & Data Modeling', weeks: '2 weeks', done: true },
      { phase: 'Map Integration', weeks: '3 weeks', done: true },
      { phase: 'CRUD Development', weeks: '4 weeks', done: true },
      { phase: 'Bulk Import/Export', weeks: '2 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '3 weeks', done: true },
      { phase: 'Documentation', weeks: '2 weeks', done: true }
    ],
    metrics: [
      { label: 'Towers', value: '3,500+', color: '#7b2ffc' },
      { label: 'Operators', value: '7', color: '#00f0ff' },
      { label: 'Languages', value: '2', color: '#ff6b35' },
      { label: 'Versions', value: '2', color: '#7b2ffc' }
    ]
  },
  selzara: {
    title: 'Selzara',
    subtitle: 'AI Operating System for Amazon Sellers',
    challenge: 'Amazon sellers needed a comprehensive AI platform for PPC optimization, profit analytics, inventory management, and listing generation with zero paid advertising budget.',
    solution: 'Built a 10-module SaaS platform covering PPC optimization, profit analytics, inventory intelligence, AI listing generation, competitor intelligence, dynamic pricing, review management, demand forecasting, and cashflow tracking.',
    architecture: ['Python FastAPI', 'Supabase', 'PostgreSQL', 'Jinja2', 'Ubuntu Nginx VPS'],
    results: [
      '457 daily organic visitors',
      '$0 paid advertising spend',
      '10 modules deployed',
      'Tiered subscription billing via Gumroad',
      '95% user retention rate',
      'SEO and community-led growth'
    ],
    tech: ['Python', 'FastAPI', 'Supabase', 'PostgreSQL'],
    lessons: 'Organic growth is possible with SEO and community-led marketing when the product delivers real value. Focus on solving actual problems and the users will come.',
    image: '/images/projects/selzara-dashboard.png',
    category: 'AI',
    duration: '8 months',
    team: '1 developer (solo founder)',
    timeline: [
      { phase: 'Market Research', weeks: '2 weeks', done: true },
      { phase: 'MVP Development', weeks: '6 weeks', done: true },
      { phase: 'Module Expansion', weeks: '8 weeks', done: true },
      { phase: 'SEO Optimization', weeks: '4 weeks', done: true },
      { phase: 'Community Building', weeks: 'Ongoing', done: true },
      { phase: 'Iteration & Growth', weeks: 'Ongoing', done: true }
    ],
    metrics: [
      { label: 'Visitors', value: '457/day', color: '#ff6b35' },
      { label: 'Ad Spend', value: '$0', color: '#00f0ff' },
      { label: 'Retention', value: '95%', color: '#7b2ffc' },
      { label: 'Modules', value: '10', color: '#ff6b35' }
    ]
  },
  justfly: {
    title: 'JustFly',
    subtitle: 'Real-Time Flight Scraping Platform',
    challenge: 'Nigerian travel market needed a real-time flight scraper for 12 airlines that could handle Cloudflare and CAPTCHA challenges while delivering results in under 30 seconds.',
    solution: 'Rebuilt scraper with intelligent route filtering and progressive result loading. Shipped a desktop companion application (Electron + Django) with auto-starting local backend and packaged Windows installer.',
    architecture: ['Django Backend', 'React Frontend', 'Electron Desktop', 'Selenium', 'Playwright', 'VPS Deployment'],
    results: [
      '75% faster response time (2min → 30-45s)',
      '9 of 12 airlines live in production',
      'Cloudflare bypass implemented',
      'CAPTCHA handling automated',
      'Desktop companion app shipped',
      'Reduced CPU and memory load by 70%'
    ],
    tech: ['Django', 'React', 'Electron', 'Selenium', 'Playwright'],
    lessons: 'Sometimes the best optimization is rethinking the architecture, not just tweaking the code. Progressive loading made the biggest difference in perceived performance.',
    image: '/images/projects/justfly-search.png',
    category: 'Scraping',
    duration: '3 months',
    team: '1 developer',
    timeline: [
      { phase: 'Analysis & Architecture', weeks: '1 week', done: true },
      { phase: 'Scraper Rebuild', weeks: '4 weeks', done: true },
      { phase: 'Optimization', weeks: '2 weeks', done: true },
      { phase: 'Desktop App Development', weeks: '3 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '2 weeks', done: true }
    ],
    metrics: [
      { label: 'Speed Improvement', value: '75%', color: '#00f0ff' },
      { label: 'Airlines', value: '9/12', color: '#7b2ffc' },
      { label: 'Response', value: '30-45s', color: '#ff6b35' },
      { label: 'CPU Reduction', value: '70%', color: '#00f0ff' }
    ]
  },
  solidbridge: {
    title: 'SolidBridge',
    subtitle: 'AI-Enhanced Investment Platform',
    challenge: 'Investors needed a centralized fintech platform with portfolio management, wallet operations, transaction tracking, and real-time financial analytics.',
    solution: 'Built modern investment platform with portfolio management, wallet operations, transaction tracking, and real-time financial analytics. Enterprise-grade security and responsive design.',
    architecture: ['React Frontend', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Chart.js', 'Netlify'],
    results: [
      'Full portfolio management implemented',
      'Real-time analytics dashboard',
      'Secure transaction processing',
      'Responsive design for all devices',
      'Multi-asset investment interface',
      'Enterprise-grade security'
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    lessons: 'Financial platforms require extreme attention to data accuracy and user experience. Every number must be precise and every transaction must be secure.',
    image: '/images/projects/solidbridge-dashboard.png',
    category: 'Fintech',
    duration: '5 months',
    team: '1 developer',
    timeline: [
      { phase: 'Requirements & Design', weeks: '2 weeks', done: true },
      { phase: 'Core Development', weeks: '6 weeks', done: true },
      { phase: 'Analytics Integration', weeks: '3 weeks', done: true },
      { phase: 'Security Implementation', weeks: '2 weeks', done: true },
      { phase: 'Testing & Deployment', weeks: '3 weeks', done: true }
    ],
    metrics: [
      { label: 'Assets', value: 'Multi-asset', color: '#7b2ffc' },
      { label: 'Security', value: 'Enterprise', color: '#00f0ff' },
      { label: 'Analytics', value: 'Real-time', color: '#ff6b35' },
      { label: 'Availability', value: '24/7', color: '#7b2ffc' }
    ]
  }
}

export default function CaseStudyDetail() {
  const params = useParams()
  const slug = params.slug as string
  const study = caseStudiesData[slug]

  if (!study) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-4xl font-bold">Case Study Not Found</h1>
          <p className="text-gray-400 mt-2">The case study you're looking for doesn't exist.</p>
          <Link href="/case-studies" className="text-[#00f0ff] mt-4 inline-block hover:underline">
            ← Back to Case Studies
          </Link>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff]">
              {study.category}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {study.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {study.team}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{study.title}</h1>
          <p className="text-gray-400 text-lg mt-2">{study.subtitle}</p>
        </div>

        {/* MAONI Video Walkthrough / Carousel */}
        {slug === 'maoni' && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Platform Walkthrough</h2>
            <p className="text-gray-400 text-sm mb-4">60-second tour of the presidential-grade citizen consultation system.</p>
            <ScreenshotCarousel slides={maoniSlides} />
          </div>
        )}

        {/* Featured Image (non-MAONI) */}
        {slug !== 'maoni' && (
        <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden mb-8">
          <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        )}

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {study.metrics.map((metric: any, i: number) => (
            <div key={i} className="glass p-4 rounded-2xl text-center border border-white/5">
              <div className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</div>
              <p className="text-gray-400 text-xs">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
              <Target size={16} />
              Challenge
            </h3>
            <p className="text-white mt-2">{study.challenge}</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Brain size={16} />
              Solution
            </h3>
            <p className="text-white mt-2">{study.solution}</p>
          </div>
        </div>

        {slug === 'maoni' && (
          <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
            <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider flex items-center gap-2 mb-4">
              <Shield size={16} />
              Live Production Platform
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              MAONI is live at maoni.cd — a national civic consultation platform for DRC constitutional reform.
            </p>
            <a
              href="https://maoni.cd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition"
            >
              Visit maoni.cd <ExternalLink size={16} />
            </a>
          </div>
        )}

        {/* Live demo embed for ARPTC */}
        {slug === 'arptc' && (
          <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
            <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider flex items-center gap-2 mb-2">
              <Globe size={16} />
              3,500+ Towers Mapped
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Explore the production tower mapping platform — live data across all DRC provinces.
            </p>
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 aspect-video">
              <iframe
                src="https://drctowermap.netlify.app"
                title="ARPTC Tower Map — Live Demo"
                className="w-full h-full absolute inset-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <StatCard label="Total Towers" value="3,500+" color="#7b2ffc" />
              <StatCard label="Coverage" value="85%" color="#00f0ff" />
              <StatCard label="Live Updates" value="24/7" color="#ff6b35" />
            </div>
            <a
              href="https://drctowermap.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[#00f0ff] text-sm hover:underline"
            >
              Open full screen <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Architecture Diagram */}
        {architectureDiagrams[slug] && (
          <div className="mb-8">
            <MermaidDiagram code={architectureDiagrams[slug]} title="System Architecture" />
          </div>
        )}

        {/* Architecture List */}
        <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
          <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider flex items-center gap-2 mb-3">
            <Server size={16} />
            Architecture
          </h3>
          <div className="space-y-2">
            {study.architecture.map((layer: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">{layer}</span>
                {i < study.architecture.length - 1 && (
                  <span className="text-gray-500 text-xs">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
          <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider flex items-center gap-2 mb-3">
            <Clock size={16} />
            Timeline
          </h3>
          <div className="space-y-2">
            {study.timeline.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <CheckCircle size={16} className={item.done ? 'text-emerald-400' : 'text-gray-500'} />
                <span className="text-white text-sm">{item.phase}</span>
                <span className="ml-auto text-gray-400 text-xs">{item.weeks}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
            <Award size={16} />
            Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {study.results.map((result: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                {result}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass p-6 rounded-2xl border border-white/5 mb-8">
          <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider flex items-center gap-2 mb-3">
            <Code size={16} />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {study.tech.map((tech: string, i: number) => (
              <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#00f0ff]/10 text-[#00f0ff]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="glass p-6 rounded-2xl border border-[#ff6b35]/20 bg-[#ff6b35]/5 mb-8">
          <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider flex items-center gap-2 mb-2">
            <Zap size={16} />
            Lessons Learned
          </h3>
          <p className="text-gray-300">{study.lessons}</p>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/contact" 
            className="flex-1 text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            Discuss This Project <ArrowRight size={18} />
          </Link>
          <Link 
            href="/projects" 
            className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition"
          >
            View All Projects
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}