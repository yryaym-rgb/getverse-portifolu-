'use client'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HeroPremium from './components/Premium/HeroPremium'
import GlobalImpactMap from './components/Premium/GlobalImpactMap'
import FeaturedGovernmentProjects from './components/Premium/FeaturedGovernmentProjects'
import CaseStudyShowcase from './components/Premium/CaseStudyShowcase'
import ArchitectureShowcase from './components/Premium/ArchitectureShowcase'
import LiveServerDashboard from './components/Premium/LiveServerDashboard'
import GovernmentTimeline from './components/Premium/GovernmentTimeline'
import AnimatedSkills from './components/Premium/AnimatedSkills'
import GitHubIntelligence from './components/Premium/GitHubIntelligence'
import TestimonialsPremium, { ProjectVideos, CodePlaygroundCTA } from './components/Premium/TestimonialsPremium'
import BlogPreview from './components/Premium/BlogPreview'
import AwardsSection from './components/Premium/AwardsSection'
import ResumeGenerator from './components/Premium/ResumeGenerator'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black relative">
      <Navigation />
      <HeroPremium />
      <GlobalImpactMap />
      <FeaturedGovernmentProjects />
      <CaseStudyShowcase />
      <ArchitectureShowcase />
      <LiveServerDashboard />
      <GovernmentTimeline />
      <AnimatedSkills />
      <GitHubIntelligence />
      <ProjectVideos />
      <CodePlaygroundCTA />
      <TestimonialsPremium />
      <BlogPreview />
      <AwardsSection />
      <ResumeGenerator />
      <Footer />
    </main>
  )
}
