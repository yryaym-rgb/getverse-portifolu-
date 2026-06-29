'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Command, Github, Linkedin, Brain, Server, Users, Code, Home, Sparkles, FileText } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showCommand, setShowCommand] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommand(!showCommand)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showCommand])

  const mainNav = [
    { label: 'Home', href: '/', icon: <Home size={16} /> },
    { label: 'Projects', href: '/projects', icon: <Code size={16} /> },
    { label: 'AI Recruiter', href: '/ai-recruiter', icon: <Users size={16} /> },
    { label: 'Engineering', href: '/engineering', icon: <Server size={16} /> },
    { label: 'Digital Twin', href: '/digital-twin', icon: <Brain size={16} /> },
    { label: 'AI Lab', href: '/lab', icon: <Brain size={16} /> }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? 'glass py-3 border-b border-white/5 shadow-lg shadow-[#00f0ff]/5' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="hidden sm:block">
              <img src="/images/logo/logo.png" alt="getverse.dev" className="h-12 w-auto" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative group ${
                  isActive(item.href) 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="opacity-70 group-hover:opacity-100 transition">{item.icon}</span>
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] transition-all duration-500 ${
                  isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCommand(!showCommand)}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 hover:border-[#00f0ff]/30 transition-all duration-300"
            >
              <Command size={14} />
              <span className="text-xs">Ctrl + K</span>
            </button>
            
            <a 
              href="https://github.com/lakho0543-spec" 
              target="_blank" 
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5 hover:border hover:border-[#00f0ff]/20"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://linkedin.com/in/abdul-malik-lakho-19103b292" 
              target="_blank" 
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5 hover:border hover:border-[#00f0ff]/20"
            >
              <Linkedin size={18} />
            </a>
            <Link 
              href="/contact" 
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition-all duration-300 transform hover:scale-105 hidden sm:block"
            >
              Hire Me
            </Link>
            
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2 rounded-xl hover:bg-white/5 transition">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden glass border-t border-white/5 mt-3 animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 py-3 px-4 rounded-xl hover:bg-white/5"
                >
                  <span className="opacity-70">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-3 mt-3">
                <Link 
                  href="/about" 
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-all duration-300 py-2.5 px-4 rounded-xl hover:bg-white/5"
                >
                  About
                </Link>
                <Link 
                  href="/blog" 
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-all duration-300 py-2.5 px-4 rounded-xl hover:bg-white/5"
                >
                  Blog
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="block mt-2 text-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Command Palette */}
      {showCommand && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowCommand(false)}
        >
          <div 
            className="w-full max-w-2xl glass rounded-2xl border border-white/10 overflow-hidden animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Command size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search everything: projects, skills, technologies..."
                  className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
                  autoFocus
                />
                <kbd className="px-2 py-1 rounded bg-white/10 text-white text-xs">ESC</kbd>
              </div>
            </div>
            <div className="p-2 max-h-96 overflow-y-auto">
              {[
                { label: '🏠 Home', href: '/' },
                { label: '📁 Projects', href: '/projects' },
                { label: '🤖 AI Recruiter', href: '/ai-recruiter' },
                { label: '🧠 Digital Twin', href: '/digital-twin' },
                { label: '⚙️ Engineering Hub', href: '/engineering' },
                { label: '📖 Case Studies', href: '/case-studies' },
                { label: '💡 Solutions', href: '/solutions' },
                { label: '📝 Blog', href: '/blog' },
                { label: '👤 About', href: '/about' },
                { label: '📧 Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setShowCommand(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer text-gray-300 hover:text-white transition group"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400">→</span>
                </Link>
              ))}
              <div className="px-4 py-2 text-xs text-gray-500 border-t border-white/5 mt-2 pt-2">
                Navigate with <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs">↑</kbd> 
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs ml-1">↓</kbd> 
                <span className="ml-2">Press </span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs">Enter</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}