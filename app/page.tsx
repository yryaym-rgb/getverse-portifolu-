'use client'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HeroPremium from './components/Premium/HeroPremium'
import GlobalImpactMap from './components/Premium/GlobalImpactMap'
import FeaturedGovernmentProjects from './components/Premium/FeaturedGovernmentProjects'
import CaseStudyShowcase from './components/Premium/CaseStudyShowcase'
import ArchitectureExplorer from './components/Premium/ArchitectureExplorer'
import SystemDesignWalkthrough from './components/Premium/SystemDesignWalkthrough'
import EngineeringMetrics from './components/Premium/EngineeringMetrics'
import GovernmentTimeline from './components/Premium/GovernmentTimeline'
import AnimatedSkills from './components/Premium/AnimatedSkills'
import OpenSourceShowcase from './components/Premium/OpenSourceShowcase'
import TestimonialsPremium, { CodePlaygroundCTA } from './components/Premium/TestimonialsPremium'
import BlogPreview from './components/Premium/BlogPreview'
import AwardsSection from './components/Premium/AwardsSection'
import ResumeGenerator from './components/Premium/ResumeGenerator'
import ImpactMetricsBar from './components/Premium/ImpactMetricsBar'
import { RecruiterHero } from './components/Premium/ImpactMetricsBar'
import { useRecruiterMode } from './components/Premium/RecruiterMode'
import Link from 'next/link'

function RecruiterView() {
  return (
    <>
      <RecruiterHero />
      <ImpactMetricsBar />
      <GovernmentTimeline />
      <FeaturedGovernmentProjects />
      <ResumeGenerator />
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold font-display text-white mb-4">Ready to hire?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/resume" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-black font-semibold text-sm">Download Resume</Link>
          <Link href="/contact" className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm">Book a Meeting</Link>
        </div>
      </section>
    </>
  )
}

function FullPortfolioView() {
  return (
    <>
      <HeroPremium />
      <ImpactMetricsBar />
      <GlobalImpactMap />
      <FeaturedGovernmentProjects />
      <CaseStudyShowcase />
      <SystemDesignWalkthrough />
      <ArchitectureExplorer />
      <EngineeringMetrics />
      <GovernmentTimeline />
      <AnimatedSkills />
      <OpenSourceShowcase />
      <CodePlaygroundCTA />
      <TestimonialsPremium />
      <BlogPreview />
      <AwardsSection />
      <ResumeGenerator />
    </>
  )
}

export default function Home() {
  const { recruiterMode } = useRecruiterMode()

  return (
    <main id="main-content" className="min-h-screen bg-black relative">
      <Navigation />
      {recruiterMode ? <RecruiterView /> : <FullPortfolioView />}
      <Footer />
    </main>
  )
}
