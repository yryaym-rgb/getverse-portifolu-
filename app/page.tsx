'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Hero from './components/CommandCenter/Hero'
import TrustBadges from './components/CommandCenter/TrustBadges'
import Stats from './components/CommandCenter/Stats'
import Services from './components/CommandCenter/Services'
import Features from './components/CommandCenter/Features'
import Testimonials from './components/CommandCenter/Testimonials'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <div className="text-center">
          {/* Loader */}
          <div className="loader mx-auto" />
          
          {/* Loading Text */}
          <p className="mt-6 text-gray-400 text-sm tracking-widest font-light">
            INITIALIZING
          </p>
          
          {/* Brand */}
          <p className="mt-2 text-[#00f0ff] text-xs tracking-[0.3em] font-light">
            AI Engineering Command Center
          </p>
          
          {/* Version */}
          <p className="mt-4 text-gray-600 text-[10px] tracking-widest">
            v3.0
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Services Section */}
      <Services />
      
      {/* Features Section */}
      <Features />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}