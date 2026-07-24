'use client'

import { useEffect, useRef, useId, useState } from 'react'

interface MermaidDiagramProps {
  code: string
  title?: string
}

export default function MermaidDiagram({ code, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId().replace(/:/g, '')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#00f0ff',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#7b2ffc',
            lineColor: '#7b2ffc',
            secondaryColor: '#1a1a2e',
            tertiaryColor: '#0a0a0f',
          },
        })

        if (cancelled || !containerRef.current) return

        const { svg } = await mermaid.render(`mermaid-${uniqueId}`, code)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (e) {
        if (!cancelled) {
          setError('Unable to render diagram')
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [code, uniqueId])

  return (
    <div className="glass p-6 rounded-2xl border border-white/5">
      {title && (
        <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-4">{title}</h3>
      )}
      {error ? (
        <pre className="text-xs text-gray-400 overflow-x-auto p-4 bg-black/50 rounded-xl">{code}</pre>
      ) : (
        <div
          ref={containerRef}
          className="mermaid-diagram overflow-x-auto flex justify-center"
          role="img"
          aria-label={title || 'Architecture diagram'}
        />
      )}
    </div>
  )
}
