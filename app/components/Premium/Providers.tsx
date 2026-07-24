'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { RecruiterModeProvider } from './RecruiterMode'

const AIAssistant = dynamic(() => import('./AIAssistant'), { ssr: false })
const EasterEgg = dynamic(() => import('./EasterEgg'), { ssr: false })

export default function PremiumProviders({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <RecruiterModeProvider>
      {children}
      {loaded && (
        <>
          <AIAssistant />
          <EasterEgg />
        </>
      )}
    </RecruiterModeProvider>
  )
}
