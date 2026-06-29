'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Brain, ArrowRight, Sparkles, Github, Linkedin, 
  Mail, MapPin, Award, Users, Globe, Zap, Shield,
  Code, Server, Database, Cloud, Terminal
} from 'lucide-react'
import Image from 'next/image'

export default function CommandCenterHero() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const titles = [
    'Full Stack AI Developer',
    'Government Systems Architect',
    'Trusted by DRC Presidential Office',
    'Mission-Critical Builder',
    'SaaS Founder',
    'AI Engineer'
  ]

  const stats = [
    { value: '18+', label: 'Production Platforms', icon: <Globe size={16} />, color: '#00f0ff' },
    { value: '5', label: 'Countries Served', icon: <Users size={16} />, color: '#7b2ffc' },
    { value: '4+', label: 'Years Experience', icon: <Zap size={16} />, color: '#ff6b35' },
    { value: '99.98%', label: 'Uptime', icon: <Shield size={16} />, color: '#00f0ff' },
  ]

  const techIcons = [
    { icon: <Code size={14} />, label: 'React', color: '#00f0ff' },
    { icon: <Server size={14} />, label: 'FastAPI', color: '#7b2ffc' },
    { icon: <Database size={14} />, label: 'PostgreSQL', color: '#ff6b35' },
    { icon: <Cloud size={14} />, label: 'AWS', color: '#00f0ff' },
    { icon: <Brain size={14} />, label: 'Claude AI', color: '#7b2ffc' },
    { icon: <Terminal size={14} />, label: 'Docker', color: '#ff6b35' },
  ]

  useEffect(() => {
    const current = titles[textIndex]
    const speed = isDeleting ? 30 : 60

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1))
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % titles.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, textIndex])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm">
            <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
            Available for Immediate Hire
            <span className="w-1 h-1 bg-[#00f0ff]/30 rounded-full" />
            <span className="text-[#00f0ff]/70">4+ Years Experience</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">I'm </span>
            <span className="gradient-text">Abdul Malik</span>
          </h1>

          <div className="text-2xl md:text-3xl lg:text-4xl font-bold h-16">
            <span className="gradient-text">{displayText}</span>
            <span className="text-[#00f0ff] animate-pulse">|</span>
          </div>

          {/* ✅ FIXED: Updated Trust Text */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            Building <span className="text-[#00f0ff] font-semibold">mission-critical AI systems</span> for 
            governments & enterprises. Sole architect of a national civic platform built for the{' '}
            <span className="text-white font-semibold">DRC presidential office's constitutional reform initiative</span>, 
            and a national tower-mapping system for{' '}
            <span className="text-white font-semibold">ARPTC, DRC's telecom regulator</span>.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="flex items-center gap-1 text-gray-400 text-sm">{stat.icon}{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-gray-500">Tech:</span>
            {techIcons.map((tech, i) => (
              <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-300">
                <span style={{ color: tech.color }}>{tech.icon}</span>
                {tech.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition-all hover:scale-105 flex items-center gap-2">
              <Sparkles size={18} />
              View My Work
            </Link>
            <Link href="/contact" className="px-8 py-3.5 rounded-full border border-gray-700 text-white font-semibold hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition-all">
              Hire Me
            </Link>
            <Link href="/digital-twin" className="px-8 py-3.5 rounded-full border border-gray-700 text-white font-semibold hover:border-[#7b2ffc] hover:bg-[#7b2ffc]/5 transition-all flex items-center gap-2">
              <Brain size={18} />
              Talk to AI
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/lakho0543-spec" target="_blank" className="text-gray-400 hover:text-white transition p-2 rounded-xl border border-white/5 hover:border-[#00f0ff]/30">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/in/abdul-malik-lakho-19103b292" target="_blank" className="text-gray-400 hover:text-white transition p-2 rounded-xl border border-white/5 hover:border-[#00f0ff]/30">
              <Linkedin size={22} />
            </a>
            <a href="mailto:lakho0543@gmail.com" className="text-gray-400 hover:text-white transition p-2 rounded-xl border border-white/5 hover:border-[#00f0ff]/30">
              <Mail size={22} />
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <MapPin size={14} />
              Sukkur, Pakistan
            </span>
          </div>
        </div>

        {/* Right — Profile Photo */}
        <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] rounded-3xl opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="absolute -inset-3 bg-gradient-to-r from-[#00f0ff]/20 to-[#7b2ffc]/20 rounded-3xl opacity-0 group-hover:opacity-30 transition duration-500" />
            
            <div className="relative w-72 h-96 md:w-96 md:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/hero/profile.jpg"
                alt="Abdul Malik Lakho - Full Stack AI Developer"
                width={400}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#00f0ff]" />
                  <span className="text-white font-semibold">Full Stack AI Developer</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300 mt-1">
                  <span>⭐ 18+ Platforms</span>
                  <span>🌍 5 Countries</span>
                  <span>🏛️ Government Trusted</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 glass px-3 py-1.5 rounded-full border border-[#00f0ff]/20 shadow-lg">
                <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#00f0ff]" />
                  4.9/5 Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 animate-pulse">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowRight size={20} className="rotate-90" />
      </div>
    </section>
  )
}