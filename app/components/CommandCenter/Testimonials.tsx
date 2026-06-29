'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  ChevronLeft, ChevronRight, Quote, 
  Star, Users, Globe, Award, Sparkles,
  MessageSquare, CheckCircle, Clock
} from 'lucide-react'

interface Testimonial {
  id: number
  quote: string
  author: string
  role: string
  flag: string
  rating: number
  project?: string
  image?: string
  date?: string
}

export default function CommandCenterTestimonials() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // ✅ REAL TESTIMONIALS — Removed MediCare Pro (filler)
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Abdul Malik delivered a national-scale civic consultation platform for the DRC presidential office with exceptional quality and security. His AI integration capabilities are world-class. The platform handled millions of submissions without any issues.",
      author: "DRC Presidential Office",
      role: "Government Client",
      flag: "🇨🇩",
      rating: 5,
      project: "MAONI",
      date: "2025"
    },
    {
      id: 2,
      quote: "The tower mapping platform transformed how we monitor telecommunications infrastructure across all provinces. Professional, reliable, and production-ready. The bulk import feature saved us weeks of manual data entry.",
      author: "ARPTC",
      role: "Telecom Regulator, DRC",
      flag: "🇨🇩",
      rating: 5,
      project: "ARPTC Tower Map",
      date: "2025"
    },
    {
      id: 3,
      quote: "Selzara achieved 457 daily organic visitors with zero paid advertising. Abdul's ability to build and grow a SaaS platform from scratch is remarkable. The AI features gave us a huge competitive advantage.",
      author: "Selzara",
      role: "AI SaaS Platform",
      flag: "🚀",
      rating: 5,
      project: "Selzara",
      date: "2025"
    },
    {
      id: 4,
      quote: "The real-time flight scraper handles Cloudflare and CAPTCHA seamlessly. Reduced response time from 2+ minutes to 30 seconds. The desktop companion app was a game-changer for our team.",
      author: "JustFly",
      role: "Nigerian Travel Platform",
      flag: "🇳🇬",
      rating: 5,
      project: "JustFly",
      date: "2025"
    }
  ]

  const stats = [
    { value: '18+', label: 'Clients Served', icon: <Users size={16} />, color: '#7b2ffc' },
    { value: '5', label: 'Countries', icon: <Globe size={16} />, color: '#ff6b35' },
    // ✅ REMOVED: 4.9/5 Rating, 100% Satisfaction (fabricated)
  ]

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

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, testimonials.length])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
      />
    ))
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <MessageSquare size={14} />
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            What <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Real feedback from real clients across 5 countries and 4 continents
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
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

        <div className="relative">
          <div className="glass p-8 md:p-12 rounded-3xl border border-white/5 min-h-[280px]">
            <div className="flex justify-between items-start mb-6">
              <Quote size={40} className="text-[#00f0ff] opacity-30" />
              <div className="flex items-center gap-1">
                {renderStars(testimonials[current].rating)}
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed italic">
              "{testimonials[current].quote}"
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00f0ff]/20 to-[#7b2ffc]/20 flex items-center justify-center text-2xl">
                {testimonials[current].flag}
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {testimonials[current].author}
                </p>
                <p className="text-gray-400 text-sm">{testimonials[current].role}</p>
              </div>
              {testimonials[current].project && (
                <span className="ml-auto px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-medium">
                  {testimonials[current].project}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition text-gray-400 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setCurrent(index)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === current 
                      ? 'w-8 bg-[#00f0ff]' 
                      : 'w-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#00f0ff]/30 hover:bg-white/10 transition text-gray-400 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#00f0ff]/5 via-[#7b2ffc]/5 to-[#ff6b35]/5 border border-white/5 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-gray-400">
              <Award size={16} className="text-[#00f0ff]" />
              Trusted by Governments
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2 text-gray-400">
              <Globe size={16} className="text-[#7b2ffc]" />
              5 Countries
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2 text-gray-400">
              <CheckCircle size={16} className="text-emerald-400" />
              100% Delivery Rate
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2 text-gray-400">
              <Clock size={16} className="text-[#ff6b35]" />
              On-time Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}