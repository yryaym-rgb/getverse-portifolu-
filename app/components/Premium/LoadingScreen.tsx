'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const steps = [
  'Building Experience...',
  'Initializing AI...',
  'Connecting Servers...',
  'Done',
]

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => setStep(i), i * 700)
    )
    const done = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, steps.length * 700 + 400)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(done)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/5 via-transparent to-[#7b2ffc]/5" />
          <motion.div
            className="relative mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-20 h-20 rounded-2xl border-2 border-[#d4af37]/40 flex items-center justify-center bg-black/80 backdrop-blur-xl">
              <span className="text-3xl font-bold font-display gradient-text-gold">AL</span>
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#00f0ff] opacity-20 blur-lg" />
          </motion.div>
          <p className="text-gray-500 text-sm mb-2 tracking-widest uppercase">Loading</p>
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-medium text-lg"
          >
            {steps[step]}
          </motion.p>
          <div className="mt-6 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff]"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
