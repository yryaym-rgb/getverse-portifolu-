'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface RecruiterModeContextType {
  recruiterMode: boolean
  toggleRecruiterMode: () => void
}

const RecruiterModeContext = createContext<RecruiterModeContextType>({
  recruiterMode: false,
  toggleRecruiterMode: () => {},
})

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('recruiter-mode')
    if (saved === 'true') setRecruiterMode(true)
  }, [])

  const toggleRecruiterMode = () => {
    setRecruiterMode((prev) => {
      const next = !prev
      localStorage.setItem('recruiter-mode', String(next))
      return next
    })
  }

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  )
}

export function useRecruiterMode() {
  return useContext(RecruiterModeContext)
}
