'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Award, Users, Globe, Zap, Shield, Sparkles, 
  Clock, MapPin, Mail, Phone, Calendar, 
  Code, Brain, Server, Database, Cloud,
  ArrowRight, CheckCircle, Star, TrendingUp
} from 'lucide-react'

export default function About() {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  const timeline = [
    { year: '2022', title: 'Started Engineering', description: 'Began full-stack development journey with a focus on scalable systems.', icon: <Code size={18} /> },
    { year: '2023', title: 'First Production System', description: 'Built and launched first production web application for an international client.', icon: <Server size={18} /> },
    { year: '2024', title: 'Government Trust', description: 'Started working with DRC Presidential Office on national-scale platforms.', icon: <Shield size={18} /> },
    { year: '2025', title: 'Global Expansion', description: 'Expanded to 5 countries, delivered 18+ production platforms.', icon: <Globe size={18} /> },
    { year: '2026', title: 'AI Engineering at Scale', description: 'Building mission-critical AI systems for governments and enterprises.', icon: <Brain size={18} /> },
  ]

  const stats = [
    { value: '18+', label: 'Platforms Built', icon: <Code size={24} />, color: '#00f0ff' },
    { value: '5', label: 'Countries Served', icon: <Globe size={24} />, color: '#7b2ffc' },
    { value: '4+', label: 'Years Experience', icon: <Zap size={24} />, color: '#ff6b35' },
    { value: '99.98%', label: 'Uptime', icon: <Shield size={24} />, color: '#00f0ff' },
  ]

  const values = [
    { title: 'Simple Systems', desc: 'Complexity is the enemy of reliability. I build simple, maintainable systems.', icon: <Sparkles size={20} /> },
    { title: 'Security First', desc: 'Every system I build has security baked in from day one.', icon: <Shield size={20} /> },
    { title: 'AI as Accelerator', desc: 'AI should augment, not replace. I use it to solve real problems.', icon: <Brain size={20} /> },
    { title: 'Data-Driven', desc: 'Decisions based on data, not opinions. Measure everything.', icon: <TrendingUp size={20} /> },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f0ff] opacity-[0.02] rounded-full  " />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-6">
            <Sparkles size={14} />
            About Me
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
            The <span className="gradient-text">Engineer</span> Behind the Code
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
            Building mission-critical AI systems for governments and enterprises worldwide.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div 
              key={i}
              className={`glass p-6 rounded-2xl text-center border border-white/5 hover:border-[#00f0ff]/20 transition-all hover:scale-105 ${
                animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex justify-center mb-2" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Bio */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-3xl border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">
                I Build Systems <span className="gradient-text">That Matter</span>
              </h2>
              <p className="text-gray-300 leading-relaxed">
                I'm a Full Stack AI Developer who builds mission-critical systems for governments and enterprises. 
                From presidential consultation platforms to national telecom infrastructure maps, I deliver systems that scale.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                With <span className="text-[#00f0ff] font-semibold">4+ years of experience</span>, I've delivered{' '}
                <span className="text-white font-semibold">18+ platforms</span> for clients across{' '}
                <span className="text-white font-semibold">5 countries</span>.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 rounded-xl bg-white/5 text-center hover:bg-white/10 transition">
                  <Award size={20} className="text-[#00f0ff] mx-auto mb-1" />
                  <p className="text-white text-sm font-semibold">Government Trusted</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center hover:bg-white/10 transition">
                  <Shield size={20} className="text-[#7b2ffc] mx-auto mb-1" />
                  <p className="text-white text-sm font-semibold">Military-Grade Security</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center hover:bg-white/10 transition">
                  <Globe size={20} className="text-[#ff6b35] mx-auto mb-1" />
                  <p className="text-white text-sm font-semibold">5 Countries</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center hover:bg-white/10 transition">
                  <Brain size={20} className="text-[#00f0ff] mx-auto mb-1" />
                  <p className="text-white text-sm font-semibold">AI Expert</p>
                </div>
              </div>
            </div>

            {/* Contact Quick Info */}
            <div className="glass p-6 rounded-3xl border border-white/5">
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} className="text-[#00f0ff]" />
                  Sukkur, Pakistan
                </span>
                <span className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} className="text-[#7b2ffc]" />
                  lakho0543@gmail.com
                </span>
                <span className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} className="text-[#ff6b35]" />
                  +92 328 672 5204
                </span>
                <span className="flex items-center gap-2 text-emerald-400 ml-auto">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full " />
                  Available
                </span>
              </div>
            </div>
          </div>

          {/* Right: Timeline & Values */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="glass p-6 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[#00f0ff]" />
                My Journey
              </h3>
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#00f0ff]/10 flex items-center justify-center border border-[#00f0ff]/20">
                        {item.icon}
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-0.5 h-8 bg-white/10" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#00f0ff] text-sm font-medium">
                          {item.year}
                        </span>
                        <span className="text-white font-semibold">{item.title}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="glass p-6 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-[#00f0ff]" />
                Engineering Values
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {values.map((value, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-center">
                    <div className="flex justify-center mb-1 text-[#00f0ff]">
                      {value.icon}
                    </div>
                    <p className="text-white text-sm font-medium">{value.title}</p>
                    <p className="text-gray-400 text-xs">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="glass p-8 md:p-12 rounded-3xl border border-[#00f0ff]/10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Ready to Build <span className="gradient-text">Something Amazing</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Let's discuss your project and how I can help bring it to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition hover:scale-105 flex items-center gap-2"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
            <Link 
              href="/projects" 
              className="px-8 py-3 rounded-full border border-gray-700 text-white font-semibold hover:border-[#00f0ff] hover:bg-[#00f0ff]/5 transition"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}