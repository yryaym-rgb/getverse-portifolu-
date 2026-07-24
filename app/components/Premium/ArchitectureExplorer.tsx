'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Database, Server, Cloud, Monitor, Brain, HardDrive } from 'lucide-react'
import { projectArchitectures, type ArchNode } from '@/app/lib/portfolioData'

const icons: Record<string, React.ReactNode> = {
  frontend: <Monitor size={16} />,
  cloudflare: <Cloud size={16} />,
  gateway: <Server size={16} />,
  api: <Server size={16} />,
  supabase: <Database size={16} />,
  postgres: <Database size={16} />,
  redis: <HardDrive size={16} />,
  ai: <Brain size={16} />,
  storage: <HardDrive size={16} />,
  cdn: <Cloud size={16} />,
  import: <Database size={16} />,
}

function ArchTreeNode({ node, depth = 0 }: { node: ArchNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className={depth > 0 ? 'ml-4 border-l border-white/10 pl-4' : ''}>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
          expanded ? 'bg-white/5 border border-white/10' : 'hover:bg-white/5'
        }`}
      >
        <span className="text-[#00f0ff] mt-0.5 shrink-0">{icons[node.id] || <Server size={16} />}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">{node.name}</span>
            {node.tech && <span className="text-xs text-gray-500 font-mono">{node.tech}</span>}
            {hasChildren && (
              <span className="ml-auto text-gray-500">
                {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{node.description}</p>
        </div>
      </button>

      <AnimatePresence>
        {expanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {node.children!.map((child) => (
              <ArchTreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!hasChildren && depth === 0 && (
        <div className="flex justify-center py-1">
          <div className="w-px h-4 bg-white/10" />
        </div>
      )}
    </div>
  )
}

export default function ArchitectureExplorer() {
  const [activeProject, setActiveProject] = useState<string>('maoni')
  const arch = projectArchitectures[activeProject]

  return (
    <section id="architecture" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#00f0ff] text-sm font-medium tracking-widest uppercase">System Design</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Architecture <span className="gradient-text">Explorer</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm">Click each layer to expand. Every component is explained.</p>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {Object.keys(projectArchitectures).map((slug) => (
            <button
              key={slug}
              onClick={() => setActiveProject(slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeProject === slug
                  ? 'bg-white/10 border border-[#00f0ff]/30 text-[#00f0ff]'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {slug.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl border border-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 font-display">{arch.title}</h3>
          <div className="space-y-1">
            {arch.nodes.map((node, i) => (
              <div key={node.id}>
                <ArchTreeNode node={node} />
                {i < arch.nodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <div className="text-gray-600 text-xs">│</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
