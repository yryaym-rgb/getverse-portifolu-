'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { 
  Shield, CheckCircle, Award, Globe, 
  Users, Building2, Sparkles, Star,
  ChevronRight, ArrowRight
} from 'lucide-react'

interface Badge {
  name: string
  icon: string
  description?: string
  color?: string
}

export default function CommandCenterTrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const badges: Badge[] = [
    { 
      name: 'DRC Presidential Office', 
      icon: '/images/badges/drc-presidential.png',
      description: 'National Consultation Platform',
      color: '#FFD700'
    },
    { 
      name: 'ARPTC Telecom Regulator', 
      icon: '/images/badges/arptc.png',
      description: 'National Telecom Infrastructure',
      color: '#00f0ff'
    },
    { 
      name: 'USA Clients', 
      icon: '/images/badges/usa.png',
      description: 'Enterprise & Startup',
      color: '#ff6b35'
    },
    { 
      name: 'Germany Clients', 
      icon: '/images/badges/germany.png',
      description: 'AI & Automation',
      color: '#7b2ffc'
    },
    { 
      name: 'Nigeria Clients', 
      icon: '/images/badges/nigeria.png',
      description: 'Travel & Scraping',
      color: '#00f0ff'
    },
    { 
      name: 'Pakistan Clients', 
      icon: '/images/badges/pakistan.png',
      description: 'Civic & Enterprise',
      color: '#ff6b35'
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

  const trustStats = [
    { value: '6', label: 'Trust Badges', icon: <Award size={16} />, color: '#00f0ff' },
    { value: '5', label: 'Countries', icon: <Globe size={16} />, color: '#7b2ffc' },
    { value: '18+', label: 'Projects', icon: <Building2 size={16} />, color: '#ff6b35' },
    { value: '100%', label: 'Client Trust', icon: <Shield size={16} />, color: '#00f0ff' },
  ]

  return (
    <section ref={sectionRef} className="py-16 px-4 border-t border-white/5 bg-gradient-to-b from-transparent to-[#00f0ff]/[0.02]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Shield size={14} />
            Trusted by Governments & Enterprises
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="gradient-text">Trust</span> Credentials
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Building systems that governments and enterprises trust across 5 countries and 4 continents.
          </p>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {trustStats.map((stat, i) => (
            <div 
              key={i}
              className={`glass p-4 rounded-2xl text-center border border-white/5 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
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

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`group relative p-4 rounded-2xl bg-white/5 border transition-all duration-500 ${
                hoveredIndex === i 
                  ? 'border-[#00f0ff]/30 bg-white/10 scale-105' 
                  : 'border-white/5 hover:border-[#00f0ff]/20'
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Glow Effect */}
              {hoveredIndex === i && (
                <div 
                  className="absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at center, ${badge.color || '#00f0ff'}33, transparent 70%)`
                  }}
                />
              )}

              {/* Badge Image */}
              <div className="relative w-12 h-12 mx-auto mb-3">
                <Image
                  src={badge.icon}
                  alt={badge.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Badge Name */}
              <p className="text-white text-xs font-medium text-center group-hover:text-[#00f0ff] transition">
                {badge.name}
              </p>

              {/* Description (shown on hover) */}
              {badge.description && (
                <p className={`text-gray-400 text-[10px] text-center mt-1 transition-all duration-300 ${
                  hoveredIndex === i ? 'opacity-100' : 'opacity-0'
                }`}>
                  {badge.description}
                </p>
              )}

              {/* Status Indicator */}
              <div className="absolute top-2 right-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full " />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#00f0ff]/5 via-[#7b2ffc]/5 to-[#ff6b35]/5 border border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00f0ff]/10 flex items-center justify-center">
                <Shield size={24} className="text-[#00f0ff]" />
              </div>
              <div>
                <p className="text-white font-medium">
                  Trusted by Governments & Enterprises Worldwide
                </p>
                <p className="text-gray-400 text-sm">
                  Military-grade security, 99.98% uptime, and 18+ production platforms
                </p>
              </div>
            </div>
            <a 
              href="/projects" 
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center gap-2 whitespace-nowrap"
            >
              View Projects <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <CheckCircle size={12} className="text-emerald-400" />
            Government Trusted
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={12} className="text-emerald-400" />
            Enterprise Grade
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={12} className="text-emerald-400" />
            Military-Grade Security
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={12} className="text-emerald-400" />
            5 Countries
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={12} className="text-emerald-400" />
            18+ Platforms
          </span>
        </div>
      </div>
    </section>
  )
}