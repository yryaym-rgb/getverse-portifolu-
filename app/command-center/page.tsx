'use client'

import { Suspense, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import { Box, Sparkles } from 'lucide-react'

const Scene = dynamic(() => import('../components/CommandCenter3D/Scene'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-black text-gray-400">
      Loading 3D scene...
    </div>
  ),
})

export default function CommandCenterPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <main className="h-screen w-full bg-black overflow-hidden relative">
      <Navigation />

      <div className="absolute top-24 left-4 z-10 pointer-events-none">
        <div className="glass p-4 rounded-2xl border border-white/10 max-w-xs pointer-events-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-[#00f0ff]" />
            <h1 className="text-lg font-bold text-white">3D Command Center</h1>
          </div>
          <p className="text-gray-400 text-xs mb-3">
            Drag to orbit • Scroll to zoom • Click a project node to explore
          </p>
          {selected && (
            <Link
              href={`/projects/${selected}`}
              className="text-[#00f0ff] text-sm hover:underline"
            >
              View {selected} →
            </Link>
          )}
        </div>
      </div>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <Scene onSelect={setSelected} />
      </Suspense>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-xs text-gray-500">
        <Box size={12} />
        Built with Three.js + React Three Fiber
      </div>
    </main>
  )
}
