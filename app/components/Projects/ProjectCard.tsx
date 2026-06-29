'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { 
  ArrowRight, Code, Server, Database, 
  Brain, Cloud, Shield, Zap, Clock,
  Github, ExternalLink, Eye, Star,
  ChevronRight, Sparkles, CheckCircle
} from 'lucide-react'

interface ProjectCardProps {
  title: string
  subtitle: string
  description: string
  image: string
  slug: string
  color: string
  tech: string[]
  category?: string
  status?: 'active' | 'development' | 'completed'
  featured?: boolean
  link?: string
  github?: string
  metrics?: { label: string; value: string }[]
  className?: string
  onHover?: (slug: string) => void
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
  slug,
  color,
  tech,
  category = 'Project',
  status = 'active',
  featured = false,
  link,
  github,
  metrics = [],
  className = '',
  onHover
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative block bg-white/5 rounded-2xl overflow-hidden border transition-all duration-300 ${
        isHovered 
          ? 'border-[#00f0ff]/30 bg-white/10 scale-[1.02] shadow-lg shadow-[#00f0ff]/5' 
          : 'border-white/5 hover:border-[#00f0ff]/20'
      } ${className}`}
      onMouseEnter={() => {
        setIsHovered(true)
        if (onHover) onHover(slug)
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-[10px] font-medium flex items-center gap-1">
            <Sparkles size={10} />
            Featured
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-black/30">
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1.5 ${getStatusColor(status)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(status)}`} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 to-[#7b2ffc]/5 animate-pulse" />
          )}
        </div>

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
        
        {/* Category */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Subtitle */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#00f0ff] transition line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-1">{subtitle}</p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'bg-[#00f0ff]/20 scale-110' : 'bg-white/5'
            }`}>
              <ChevronRight size={16} className={`text-[#00f0ff] transition-transform duration-300 ${
                isHovered ? 'translate-x-0.5' : ''
              }`} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
          {description}
        </p>

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {metrics.map((metric, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-xs font-semibold" style={{ color }}>
                  {metric.value}
                </span>
                <span className="text-gray-500 text-[10px]">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tech.slice(0, 4).map((t, i) => (
            <span 
              key={i} 
              className="px-2 py-0.5 rounded-full text-[10px] font-medium transition"
              style={{ 
                background: `${color}15`, 
                color: color,
                opacity: isHovered ? 1 : 0.8
              }}
            >
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[10px]">
              +{tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            {link && (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={14} />
              </a>
            )}
            {github && (
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition p-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={14} />
              </a>
            )}
            <span className="text-gray-600 text-xs">|</span>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Eye size={12} />
              View Details
            </span>
          </div>
          <span className={`text-xs font-medium transition-all duration-300 flex items-center gap-1 ${
            isHovered ? 'text-[#00f0ff] gap-2' : 'text-gray-500'
          }`}>
            Open <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Hover Border Animation */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] transition-all duration-300 ${
        isHovered ? 'scale-x-100' : 'scale-x-0'
      }`} />
    </Link>
  )
}