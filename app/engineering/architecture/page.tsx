'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, ChevronDown, ChevronRight, 
  Server, Database, Cloud, Code, Shield, 
  Cpu, Brain, Users, Globe, Zap, Lock,
  GitBranch, Terminal, Layers, Network,
  Box, Eye, Copy, Download, Sparkles
} from 'lucide-react'

interface ArchitectureNode {
  name: string
  icon: string
  description: string
  color?: string
  children?: ArchitectureNode[]
}

const architectureData: ArchitectureNode = {
  name: 'User',
  icon: '👤',
  description: 'End users accessing the platform',
  color: '#00f0ff',
  children: [
    {
      name: 'CDN & Edge Network',
      icon: '🌐',
      description: 'Cloudflare CDN with edge caching, DDoS protection',
      color: '#00f0ff',
      children: [
        {
          name: 'Next.js Frontend',
          icon: '⚛️',
          description: 'React-based SSR with TypeScript, Tailwind CSS',
          color: '#00f0ff',
          children: [
            {
              name: 'API Gateway',
              icon: '🚪',
              description: 'REST API with JWT authentication, rate limiting',
              color: '#7b2ffc',
              children: [
                {
                  name: 'FastAPI Backend',
                  icon: '🚀',
                  description: 'Python async API with Pydantic, OpenAPI',
                  color: '#ff6b35',
                  children: [
                    {
                      name: 'Redis Cache',
                      icon: '⚡',
                      description: 'Session management, rate limiting, caching',
                      color: '#00f0ff'
                    },
                    {
                      name: 'PostgreSQL',
                      icon: '🐘',
                      description: 'Primary database with migrations, ACID',
                      color: '#7b2ffc'
                    },
                    {
                      name: 'Claude AI',
                      icon: '🧠',
                      description: 'AI integration for sentiment analysis, content generation',
                      color: '#ff6b35'
                    }
                  ]
                },
                {
                  name: 'Authentication Service',
                  icon: '🔐',
                  description: 'JWT auth, role-based access, MFA',
                  color: '#7b2ffc'
                },
                {
                  name: 'WebSocket Server',
                  icon: '📡',
                  description: 'Real-time communication, live updates',
                  color: '#ff6b35'
                }
              ]
            },
            {
              name: 'Monitoring & Logging',
              icon: '📊',
              description: 'Prometheus, Grafana, ELK stack',
              color: '#7b2ffc'
            }
          ]
        }
      ]
    },
    {
      name: 'Docker + Nginx',
      icon: '🐳',
      description: 'Containerized deployment with reverse proxy',
      color: '#00f0ff'
    },
    {
      name: 'CI/CD Pipeline',
      icon: '🔄',
      description: 'GitHub Actions, automated testing, deployment',
      color: '#7b2ffc'
    }
  ]
}

function TreeNode({ 
  node, 
  level = 0, 
  selectedNode, 
  onNodeClick 
}: { 
  node: ArchitectureNode
  level?: number
  selectedNode: ArchitectureNode | null
  onNodeClick: (node: ArchitectureNode) => void
}) {
  const [expanded, setExpanded] = useState(level < 2)
  const [isHovered, setIsHovered] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded)
    }
    onNodeClick(node)
  }

  return (
    <div className="relative" style={{ paddingLeft: level > 0 ? `${level * 24}px` : '0' }}>
      {/* Connection Line */}
      {level > 0 && (
        <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-white/10" />
      )}
      
      {/* Node */}
      <div 
        className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all group ${
          level === 0 ? 'bg-white/5 border border-white/5' : ''
        } ${isHovered ? 'bg-white/10' : ''} ${
          selectedNode?.name === node.name ? 'border border-[#00f0ff]/30 bg-[#00f0ff]/5' : ''
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expand/Collapse */}
        {hasChildren && (
          <span className="text-gray-500 group-hover:text-white transition">
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        
        {/* Icon */}
        <span className="text-lg">{node.icon}</span>
        
        {/* Name */}
        <span 
          className={`text-sm font-medium transition ${
            isHovered || selectedNode?.name === node.name ? 'text-white' : 'text-gray-200'
          }`}
        >
          {node.name}
        </span>
        
        {/* Description */}
        <span className="text-gray-500 text-xs hidden md:inline">—</span>
        <span className="text-gray-400 text-xs hidden md:inline">{node.description}</span>
        
        {/* Status Badge */}
        {!hasChildren && (
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
            live
          </span>
        )}
        
        {/* Color Indicator */}
        {node.color && (
          <span 
            className="w-2 h-2 rounded-full ml-1 flex-shrink-0"
            style={{ background: node.color }}
          />
        )}
      </div>
      
      {/* Children */}
      {hasChildren && expanded && (
        <div className="border-l border-white/10 ml-5 pl-4">
          {node.children!.map((child, i) => (
            <TreeNode 
              key={i} 
              node={child} 
              level={level + 1}
              selectedNode={selectedNode}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function EngineeringArchitecturePage() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null)
  const [showDetails, setShowDetails] = useState(true)

  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNode(node)
    setShowDetails(true)
  }

  const getTechStack = () => {
    return [
      { icon: <Server size={14} />, name: 'Frontend', tech: 'Next.js 14', color: '#00f0ff' },
      { icon: <Database size={14} />, name: 'Database', tech: 'PostgreSQL 15', color: '#7b2ffc' },
      { icon: <Brain size={14} />, name: 'AI', tech: 'Claude API', color: '#ff6b35' },
      { icon: <Cloud size={14} />, name: 'DevOps', tech: 'Docker + Nginx', color: '#00f0ff' },
      { icon: <Shield size={14} />, name: 'Security', tech: 'JWT + RBAC', color: '#7b2ffc' },
      { icon: <GitBranch size={14} />, name: 'CI/CD', tech: 'GitHub Actions', color: '#ff6b35' },
    ]
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/engineering" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Engineering
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Layers size={14} />
            Interactive Architecture
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">System</span> Architecture
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Click on any node to explore the architecture in detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Diagram */}
          <div className="lg:col-span-2 glass p-4 rounded-3xl border border-white/5">
            <div className="bg-black/30 rounded-2xl p-4">
              <TreeNode 
                node={architectureData} 
                selectedNode={selectedNode}
                onNodeClick={handleNodeClick}
              />
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" /> Live
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#00f0ff] rounded-full" /> API
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#7b2ffc] rounded-full" /> Database
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#ff6b35] rounded-full" /> AI
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" /> Cache
              </span>
            </div>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {/* Node Details */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Selected Node
              </h3>
              {selectedNode ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{selectedNode.icon}</span>
                    <div>
                      <h4 className="text-white font-semibold">{selectedNode.name}</h4>
                      {selectedNode.color && (
                        <span 
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ background: selectedNode.color }}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{selectedNode.description}</p>
                  {selectedNode.children && (
                    <p className="text-gray-500 text-xs mt-2">
                      {selectedNode.children.length} child nodes
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Click a node to see details</p>
              )}
            </div>

            {/* Tech Stack */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                Tech Stack
              </h3>
              <div className="space-y-2">
                {getTechStack().map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span className="text-white text-sm">{item.name}</span>
                    <span className="ml-auto text-gray-400 text-xs">{item.tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="glass p-4 rounded-2xl border border-white/5">
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm">
                  <Copy size={14} />
                  Copy Diagram
                </button>
                <button className="flex-1 px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm">
                  <Download size={14} />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}