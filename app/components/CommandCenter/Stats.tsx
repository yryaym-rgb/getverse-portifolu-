'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Award, Users, Globe, Zap, Shield, TrendingUp,
  Code, Server, Database, Brain, Clock, Rocket
} from 'lucide-react'

interface StatItem {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  color: string
  description?: string
}

export default function CommandCenterStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    platforms: 0,
    clients: 0,
    countries: 0,
    years: 0,
    visitors: 0,
    uptime: 0,
    projects: 0,
    integrations: 0
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats: StatItem[] = [
    {
      icon: <Award size={24} />,
      value: 18,
      label: 'Production Platforms',
      suffix: '+',
      color: '#00f0ff',
      description: 'Built & deployed'
    },
    {
      icon: <Users size={24} />,
      value: 18,
      label: 'Clients Worldwide',
      suffix: '+',
      color: '#7b2ffc',
      description: 'Across 5 countries'
    },
    {
      icon: <Globe size={24} />,
      value: 5,
      label: 'Countries Served',
      suffix: '',
      color: '#ff6b35',
      description: '4 continents'
    },
    {
      icon: <Zap size={24} />,
      value: 4,
      label: 'Years Experience',
      suffix: '+',
      color: '#00f0ff',
      description: 'Full-stack + AI'
    },
    {
      icon: <TrendingUp size={24} />,
      value: 457,
      label: 'Daily Visitors',
      suffix: '',
      color: '#7b2ffc',
      description: 'Selzara organic'
    },
    {
      icon: <Shield size={24} />,
      value: 99.98,
      label: 'Uptime',
      suffix: '%',
      color: '#ff6b35',
      description: 'Military-grade'
    },
    {
      icon: <Brain size={24} />,
      value: 22,
      label: 'AI Integrations',
      suffix: '+',
      color: '#00f0ff',
      description: 'Claude, OpenAI'
    },
    {
      icon: <Rocket size={24} />,
      value: 18,
      label: 'Projects Delivered',
      suffix: '+',
      color: '#7b2ffc',
      description: 'On time'
    }
  ]

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animated counter
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const targets = {
      platforms: 18,
      clients: 18,
      countries: 5,
      years: 4,
      visitors: 457,
      uptime: 99.98,
      projects: 18,
      integrations: 22
    }

    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = Math.min(step / steps, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setCounts({
        platforms: Math.floor(targets.platforms * eased),
        clients: Math.floor(targets.clients * eased),
        countries: Math.floor(targets.countries * eased),
        years: Math.floor(targets.years * eased),
        visitors: Math.floor(targets.visitors * eased),
        uptime: targets.uptime * eased,
        projects: Math.floor(targets.projects * eased),
        integrations: Math.floor(targets.integrations * eased)
      })

      if (step >= steps) {
        setCounts({
          platforms: targets.platforms,
          clients: targets.clients,
          countries: targets.countries,
          years: targets.years,
          visitors: targets.visitors,
          uptime: targets.uptime,
          projects: targets.projects,
          integrations: targets.integrations
        })
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  const displayValues = {
    platforms: counts.platforms + '+',
    clients: counts.clients + '+',
    countries: counts.countries,
    years: counts.years + '+',
    visitors: counts.visitors,
    uptime: counts.uptime.toFixed(2) + '%',
    projects: counts.projects + '+',
    integrations: counts.integrations + '+'
  }

  const statKeys = ['platforms', 'clients', 'countries', 'years', 'visitors', 'uptime', 'projects', 'integrations']

  return (
    <section ref={sectionRef} className="py-16 px-4 border-t border-white/5 bg-gradient-to-b from-transparent to-[#00f0ff]/[0.02]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <TrendingUp size={14} />
            Real Impact
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Evidence</span> of Impact
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Every number comes from real platforms I've built for governments and enterprises.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/20 hover:bg-white/10 transition-all hover:scale-105 overflow-hidden"
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${stat.color}33, transparent 70%)` }}
              />

              {/* Icon */}
              <div className="flex justify-center mb-3 group-hover:scale-110 transition" style={{ color: stat.color }}>
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-3xl font-bold text-center" style={{ color: stat.color }}>
                {displayValues[statKeys[index] as keyof typeof displayValues]}
              </div>

              {/* Label */}
              <p className="text-white text-sm font-medium text-center mt-1">{stat.label}</p>

              {/* Description */}
              {stat.description && (
                <p className="text-gray-400 text-xs text-center mt-0.5">{stat.description}</p>
              )}

              {/* Progress Bar */}
              <div className="mt-3 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: isVisible ? '85%' : '0%',
                    background: `linear-gradient(to right, ${stat.color}, ${stat.color}cc)`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-gray-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              All systems operational
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <Shield size={14} />
              99.98% uptime
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2 text-[#00f0ff]">
              <Clock size={14} />
              Last deployment: 2 hours ago
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2 text-[#7b2ffc]">
              <Server size={14} />
              CI/CD: ✅ Passing
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}