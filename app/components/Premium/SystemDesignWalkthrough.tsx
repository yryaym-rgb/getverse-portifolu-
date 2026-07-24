'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, User, Shield, Server, Database, Brain, LayoutDashboard } from 'lucide-react'
import { systemWalkthroughs } from '@/app/lib/portfolioData'

const stepIcons: Record<string, React.ReactNode> = {
  citizen: <User size={20} />,
  auth: <Shield size={20} />,
  validation: <Server size={20} />,
  database: <Database size={20} />,
  ai: <Brain size={20} />,
  dashboard: <LayoutDashboard size={20} />,
}

export default function SystemDesignWalkthrough() {
  const walkthrough = systemWalkthroughs.maoni
  const [activeStep, setActiveStep] = useState(0)
  const step = walkthrough.steps[activeStep]

  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#7b2ffc] text-sm font-medium tracking-widest uppercase">Interactive System Design</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            {walkthrough.title}
          </h2>
          <p className="text-gray-400 mt-3">{walkthrough.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Step list */}
          <div className="lg:col-span-2 space-y-2">
            {walkthrough.steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeStep === i
                    ? 'border-[#7b2ffc]/40 bg-[#7b2ffc]/10'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeStep === i ? 'bg-[#7b2ffc]/20 text-[#7b2ffc]' : 'bg-white/5 text-gray-500'
                  }`}>
                    {stepIcons[s.id]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.description}</div>
                  </div>
                </div>
                {i < walkthrough.steps.length - 1 && activeStep === i && (
                  <div className="flex justify-center mt-2 text-gray-600">
                    <ArrowDown size={14} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Step detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-2xl border border-white/5 p-6 h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7b2ffc]/20 flex items-center justify-center text-[#7b2ffc]">
                    {stepIcons[step.id]}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Step {activeStep + 1} of {walkthrough.steps.length}</div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{step.detail}</p>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-400 hover:text-white disabled:opacity-30 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(walkthrough.steps.length - 1, activeStep + 1))}
                    disabled={activeStep === walkthrough.steps.length - 1}
                    className="px-4 py-2 rounded-lg text-sm bg-[#7b2ffc]/20 border border-[#7b2ffc]/30 text-[#7b2ffc] hover:bg-[#7b2ffc]/30 disabled:opacity-30 transition"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
