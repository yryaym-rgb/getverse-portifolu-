'use client'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Hero from './components/CommandCenter/Hero'
import StartHere from './components/CommandCenter/StartHere'
import TrustBadges from './components/CommandCenter/TrustBadges'
import Stats from './components/CommandCenter/Stats'
import Services from './components/CommandCenter/Services'
import Features from './components/CommandCenter/Features'
import Testimonials from './components/CommandCenter/Testimonials'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <StartHere />
      <TrustBadges />
      <Stats />
      <Services />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  )
}
