'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { Code, Terminal, Play } from 'lucide-react'

const Sandpack = dynamic(
  () => import('@codesandbox/sandpack-react').then((m) => m.Sandpack),
  { ssr: false, loading: () => <div className="h-96 flex items-center justify-center text-gray-400">Loading editor...</div> }
)

const snippets: Record<string, { template: 'react-ts' | 'vanilla' | 'node'; code: string; filename: string }> = {
  'React Tower Map': {
    template: 'react-ts',
    filename: '/TowerMap.tsx',
    code: `import { useState, useEffect } from 'react'

export default function TowerMap() {
  const [towers, setTowers] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  setTimeout(() => {
    setTowers(3500)
    setLoading(false)
  }, 800)
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', padding: 24, background: '#0a0a0f', color: '#fff', minHeight: '100%' }}>
      <h2 style={{ color: '#00f0ff' }}>ARPTC Tower Map</h2>
      {loading ? (
        <p>Loading towers...</p>
      ) : (
        <p><strong>{towers.toLocaleString()}+</strong> towers mapped across DRC</p>
      )}
    </div>
  )
}`,
  },
  'FastAPI Endpoint': {
    template: 'node',
    filename: '/api.py',
    code: `from fastapi import FastAPI

app = FastAPI(title="ARPTC Tower API")

@app.get("/api/towers")
async def get_towers():
    return {
        "towers": 3500,
        "coverage": "85%",
        "operators": 7,
        "provinces": 26
    }

@app.get("/api/health")
async def health():
    return {"status": "ok"}`,
  },
  'MAONI Sentiment': {
    template: 'vanilla',
    filename: '/sentiment.js',
    code: `// MAONI AI Sentiment Analysis
async function analyzeSentiment(text) {
  const response = await fetch('/api/sentiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  return response.json()
}

// Demo
const proposal = "Citizens demand transparent governance"
console.log('Analyzing:', proposal)
console.log('Sentiment: positive (0.87 confidence)')`,
  },
}

export default function PlaygroundPage() {
  const [active, setActive] = useState('React Tower Map')
  const snippet = snippets[active]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-32 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Code size={14} />
            Live Code Playground
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Code Playground</span>
          </h1>
          <p className="text-gray-400 mt-3">Real code snippets from production projects — edit and run live.</p>
        </div>
      </section>

      <section className="px-4 max-w-5xl mx-auto pb-20">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(snippets).map((name) => (
            <button
              key={name}
              onClick={() => setActive(name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition ${
                active === name
                  ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <Terminal size={14} />
              {name}
            </button>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-white/10">
          <Sandpack
            key={active}
            template={snippet.template}
            theme="dark"
            files={{ [snippet.filename]: snippet.code }}
            options={{
              showNavigator: true,
              showTabs: true,
              editorHeight: 400,
            }}
          />
        </div>

        <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
          <Play size={12} />
          Powered by Sandpack — same engine as CodeSandbox
        </p>
      </section>

      <Footer />
    </main>
  )
}
