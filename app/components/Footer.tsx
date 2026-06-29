'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Github, Linkedin, Mail, Twitter, MapPin, 
  Heart, Code, Sparkles, ArrowRight, 
  Send, Globe, Users, Briefcase,
  ChevronUp, MessageSquare, Phone,
  Award, Shield, Zap, Clock
} from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'AI Recruiter', href: '/ai-recruiter' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'Digital Twin', href: '/digital-twin' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ]

  const services = [
    { label: 'AI Platform Development', href: '/services/ai' },
    { label: 'Government Systems', href: '/services/government' },
    { label: 'SaaS Development', href: '/services/saas' },
    { label: 'Web Scraping', href: '/services/scraping' },
    { label: 'Full Stack Web', href: '/services/fullstack' },
    { label: 'Mobile & Desktop', href: '/services/mobile' },
  ]

  const socials = [
    { icon: <Github size={18} />, href: 'https://github.com/lakho0543-spec', label: 'GitHub' },
    { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/abdul-malik-lakho-19103b292', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, href: 'https://x.com/LakhoMalik58424', label: 'Twitter' },
    { icon: <Mail size={18} />, href: 'mailto:lakho0543@gmail.com', label: 'Email' },
  ]

  const stats = [
    { value: '18+', label: 'Projects', icon: <Code size={14} />, color: '#00f0ff' },
    { value: '5', label: 'Countries', icon: <Globe size={14} />, color: '#7b2ffc' },
    { value: '4+', label: 'Years', icon: <Zap size={14} />, color: '#ff6b35' },
    { value: '99.98%', label: 'Uptime', icon: <Shield size={14} />, color: '#00f0ff' },
  ]

  return (
    <footer className="border-t border-white/5 bg-black/80">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="absolute -top-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white hover:shadow-lg hover:shadow-[#00f0ff]/25 transition shadow-lg"
      >
        <ChevronUp size={18} />
      </button>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/images/logo/logo.png" alt="getverse.dev" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building mission-critical AI systems for governments & enterprises. 
              Trusted by the DRC Presidential Office and national telecom regulators.
            </p>
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition text-gray-400 hover:text-white"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin size={14} />
              <span>Sukkur, Pakistan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-[#00f0ff]" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00f0ff] opacity-0 group-hover:opacity-100 transition" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Briefcase size={16} className="text-[#7b2ffc]" />
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition flex items-center gap-2 text-sm group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#7b2ffc] opacity-0 group-hover:opacity-100 transition" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MessageSquare size={16} className="text-[#ff6b35]" />
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get updates on new projects and engineering insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white hover:shadow-lg transition"
                >
                  <Send size={16} />
                </button>
              </div>
              {subscribed && (
                <p className="text-emerald-400 text-sm animate-fadeIn">
                  ✓ Subscribed! Stay tuned for updates.
                </p>
              )}
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-sm font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-[10px] flex items-center justify-center gap-1">
                    {stat.icon}
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm flex items-center gap-2">
            © {year} Abdul Malik Lakho — 
            <span className="flex items-center gap-1">
              Made with <Heart size={14} className="text-red-400 animate-pulse" /> 
              using Next.js & Tailwind CSS
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-gray-500">
              <Clock size={14} />
              GMT+5
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Award size={14} className="text-[#00f0ff]" />
              Government Trusted
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Shield size={14} className="text-[#7b2ffc]" />
              Military-Grade Security
            </span>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap justify-center gap-2">
          {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL', 'Claude AI', 'Docker', 'AWS'].map((tech) => (
            <span 
              key={tech}
              className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400 text-[10px] hover:border-[#00f0ff]/30 hover:text-white transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}