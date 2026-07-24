'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false })
const AIAssistant = dynamic(() => import('./AIAssistant'), { ssr: false })
const EasterEgg = dynamic(() => import('./EasterEgg'), { ssr: false })
const ParticlesBackground = dynamic(() => import('./ParticlesBackground'), { ssr: false })

export default function PremiumProviders({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    setLoaded(true)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setShowLoading(false)
      return
    }
    const timer = setTimeout(() => setShowLoading(false), 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
      <ParticlesBackground />
      {children}
      {loaded && (
        <>
          <AIAssistant />
          <EasterEgg />
        </>
      )}
    </>
  )
}
