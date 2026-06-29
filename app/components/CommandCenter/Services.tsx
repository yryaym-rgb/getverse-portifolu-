'use client'

import Link from 'next/link'
import { 
  Code2, Brain, Database, Cloud, Shield, Smartphone, 
  ArrowRight, Sparkles, Zap, Clock, Users, DollarSign,
  CheckCircle, Server, GitBranch, Terminal, Cpu,
  BarChart3, Globe, Lock, MessageSquare
} from 'lucide-react'

interface Service {
  icon: React.ReactNode
  title: string
  desc: string
  features: string[]
  color: string
  price: string
  href: string
  popular?: boolean
  tags?: string[]
}

export default function CommandCenterServices() {
  const services: Service[] = [
    {
      icon: <Brain size={28} />,
      title: 'AI Platform Development',
      desc: 'AI-powered platforms with Claude, OpenAI, and RAG pipelines for automation, analytics, and intelligent decision-making.',
      features: ['Sentiment Analysis', 'AI Chatbots', 'RAG Systems', 'Content Generation', 'Intelligent Search'],
      color: '#00f0ff',
      price: 'From $5K',
      href: '/contact',
      tags: ['Claude API', 'OpenAI', 'LangChain']
    },
    {
      icon: <Shield size={28} />,
      title: 'Government & Enterprise Systems',
      desc: 'Mission-critical systems with military-grade security, audit logging, and national-scale infrastructure.',
      features: ['Multi-role Admin', 'Audit Logging', 'National Scale', 'Compliance', 'Military-Grade Security'],
      color: '#7b2ffc',
      price: 'From $10K',
      href: '/contact',
      popular: true,
      tags: ['Security', 'Compliance', 'Scalability']
    },
    {
      icon: <Cloud size={28} />,
      title: 'SaaS Development',
      desc: 'Subscription-based platforms with payment integration, user management, and analytics dashboards.',
      features: ['Subscription Billing', 'User Management', 'Analytics', 'API First', 'Scalable Infrastructure'],
      color: '#ff6b35',
      price: 'From $3K',
      href: '/contact',
      tags: ['Stripe', 'Gumroad', 'Analytics']
    },
    {
      icon: <Database size={28} />,
      title: 'Web Scraping & Data Extraction',
      desc: 'Production scrapers that handle Cloudflare, CAPTCHA, and real-time data extraction at scale.',
      features: ['Cloudflare Bypass', 'CAPTCHA Handling', 'Real-time', 'Scale', 'Data Pipelines'],
      color: '#00f0ff',
      price: 'From $2K',
      href: '/contact',
      tags: ['Selenium', 'Playwright', 'Python']
    },
    {
      icon: <Code2 size={28} />,
      title: 'Full Stack Web Development',
      desc: 'End-to-end web platforms with modern frameworks, databases, and deployment infrastructure.',
      features: ['React/Next.js', 'Python/FastAPI', 'PostgreSQL', 'VPS Deployment', 'CI/CD'],
      color: '#7b2ffc',
      price: 'From $3K',
      href: '/contact',
      tags: ['React', 'FastAPI', 'Docker']
    },
    {
      icon: <Smartphone size={28} />,
      title: 'Mobile & Desktop Apps',
      desc: 'Cross-platform mobile apps with Flutter and desktop applications with Electron.',
      features: ['Flutter', 'Electron', 'Cross-platform', 'Native Performance', 'Desktop Packaging'],
      color: '#ff6b35',
      price: 'From $4K',
      href: '/contact',
      tags: ['Flutter', 'Electron', 'Dart']
    }
  ]

  return (
    <section className="py-20 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Sparkles size={14} />
            What I Offer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Services</span> I Offer
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            End-to-end development for governments, enterprises, and startups. 
            Every project includes AI integration, security, and scalability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div 
              key={i}
              className={`group relative p-6 rounded-2xl bg-white/5 border transition-all hover:border-[#00f0ff]/30 hover:bg-white/10 hover:scale-[1.02] ${
                service.popular 
                  ? 'border-[#00f0ff]/30 shadow-lg shadow-[#00f0ff]/5' 
                  : 'border-white/5'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition" 
                style={{ background: `${service.color}15` }}
              >
                <span style={{ color: service.color }}>{service.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white group-hover:text-[#00f0ff] transition">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">{service.desc}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {service.features.slice(0, 3).map((feature, j) => (
                  <span 
                    key={j} 
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: `${service.color}12`, color: service.color }}
                  >
                    {feature}
                  </span>
                ))}
                {service.features.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-xs">
                    +{service.features.length - 3}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-3">
                {service.tags?.map((tag, j) => (
                  <span key={j} className="px-2 py-0.5 rounded bg-white/5 text-gray-500 text-[10px] border border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold" style={{ color: service.color }}>
                    {service.price}
                  </span>
                  <p className="text-gray-500 text-[10px]">Starting price</p>
                </div>
                <Link 
                  href={service.href} 
                  className="text-sm text-gray-400 hover:text-white transition flex items-center gap-1 group-hover:gap-2"
                >
                  Get Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Add-on Services */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            <span className="gradient-text">Add-on</span> Services
          </h3>
          <p className="text-gray-400 text-center mb-8">
            Extend your project with additional capabilities
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'AI Chatbot Integration', price: '$1K+', icon: <MessageSquare size={16} />, color: '#00f0ff' },
              { name: 'Advanced Analytics', price: '$1.5K+', icon: <BarChart3 size={16} />, color: '#7b2ffc' },
              { name: 'Mobile App (Flutter)', price: '$2K+', icon: <Smartphone size={16} />, color: '#ff6b35' },
              { name: 'Desktop App (Electron)', price: '$2.5K+', icon: <Monitor size={16} />, color: '#00f0ff' },
              { name: 'Web Scraping System', price: '$1K+', icon: <Database size={16} />, color: '#7b2ffc' },
              { name: '24/7 Support Retainer', price: '$500/mo', icon: <Shield size={16} />, color: '#ff6b35' },
            ].map((addon, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/5 border border-white/5 text-center hover:border-[#00f0ff]/20 hover:bg-white/10 transition"
              >
                <div className="flex justify-center mb-2" style={{ color: addon.color }}>
                  {addon.icon}
                </div>
                <p className="text-white text-sm font-medium">{addon.name}</p>
                <p className="text-[#00f0ff] text-sm font-semibold mt-1">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Solutions */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#00f0ff]/5 via-[#7b2ffc]/5 to-[#ff6b35]/5 border border-[#00f0ff]/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Need a <span className="gradient-text">Custom</span> Solution?
          </h3>
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

        {/* Trust Note */}
        <p className="text-center text-gray-500 text-xs mt-8">
          * All services include end-to-end development, AI integration, and post-launch support.
          <br />
          Custom solutions available for unique requirements. Pricing varies by scope.
        </p>
      </div>
    </section>
  )
}

// Monitor Icon Component
function Monitor({ size = 24, className = "" }) {
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
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}