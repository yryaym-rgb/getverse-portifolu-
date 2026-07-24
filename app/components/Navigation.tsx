'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Command, Github, Linkedin, Code, Home, FileText, User, Mail } from 'lucide-react'
import CommandPalette from './CommandPalette'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showCommand, setShowCommand] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommand((prev) => !prev)
      }
      if (e.key === 'Escape') setShowCommand(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const mainNav = [
    { label: 'Work', href: '/projects', icon: <Code size={16} /> },
    { label: 'Case Studies', href: '/case-studies', icon: <FileText size={16} /> },
    { label: 'About', href: '/about', icon: <User size={16} /> },
    { label: 'Contact', href: '/contact', icon: <Mail size={16} /> },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'glass py-3 border-b border-white/5 shadow-lg shadow-[#00f0ff]/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
            <div className="hidden sm:block">
              <img src="/images/logo/logo.png" alt="getverse.dev" className="h-12 w-auto" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative group ${
                isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home size={16} className="opacity-70" />
              Home
            </Link>
            {mainNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-300 relative group ${
                  isActive(item.href) ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="opacity-70 group-hover:opacity-100 transition">{item.icon}</span>
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] transition-all duration-500 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/digital-twin"
              className={`text-sm font-medium transition ${
                isActive('/digital-twin')
                  ? 'text-[#7b2ffc]'
                  : 'text-gray-500 hover:text-[#7b2ffc]'
              }`}
            >
              AI Twin
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCommand(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 hover:border-[#00f0ff]/30 transition-all duration-300"
              aria-label="Open command palette"
            >
              <Command size={14} />
              <span className="text-xs">Ctrl + K</span>
            </button>

            <a
              href="https://github.com/lakho0543-spec"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/abdul-malik-lakho-19103b292"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/5"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition-all duration-300 transform hover:scale-105 hidden sm:block"
            >
              Hire Me
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white p-2 rounded-xl hover:bg-white/5 transition"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden glass border-t border-white/5 mt-3 animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition py-3 px-4 rounded-xl hover:bg-white/5"
              >
                <Home size={16} /> Home
              </Link>
              {mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition py-3 px-4 rounded-xl hover:bg-white/5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              <Link
                href="/digital-twin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition py-3 px-4 rounded-xl hover:bg-white/5"
              >
                AI Twin
              </Link>
              <Link
                href="/resume"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition py-3 px-4 rounded-xl hover:bg-white/5"
              >
                <FileText size={16} /> Resume
              </Link>
              <div className="border-t border-white/5 pt-3 mt-3">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <CommandPalette open={showCommand} onOpenChange={setShowCommand} />
    </>
  )
}
