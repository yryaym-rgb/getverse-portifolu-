'use client'

import { useState } from 'react'
import { 
  ChevronDown, ChevronRight, Server, Database, 
  Cloud, Code, Shield, Cpu, Brain, 
  Users, Globe, Zap, Lock, GitBranch,
  Terminal, Layers, Network, Box
} from 'lucide-react'

interface ArchitectureNode {
  name: string
  icon: string
  description: string
  color?: string
  children?: ArchitectureNode[]
}

interface TreeNodeProps {
  node: ArchitectureNode
  level?: number
  onNodeClick?: (node: ArchitectureNode) => void
}

const architectureData: ArchitectureNode = {
  name: 'User',
  icon: '👤',
  description: 'End users accessing the platform',
  color: '#00f0ff',
  children: [
    {
      name: 'Next.js Frontend',
      icon: '⚛️',
      description: 'React-based SSR with TypeScript, Tailwind CSS',
      color: '#00f0ff',
      children: [
        {
          name: 'CDN & Edge Network',
          icon: '🌐',
          description: 'Cloudflare CDN with edge caching',
          color: '#7b2ffc',
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
                      name: 'Claude API',
                      icon: '🧠',
                      description: 'AI integration for sentiment analysis',
                      color: '#ff6b35'
                    }
                  ]
                },
                {
                  name: 'Authentication Service',
                  icon: '🔐',
                  description: 'JWT auth, role-based access, MFA',
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
          name: 'Monitoring & Logging',
          icon: '📊',
          description: 'Prometheus, Grafana, ELK stack',
          color: '#7b2ffc'
        }
      ]
    }
  ]
}

function TreeNode({ node, level = 0, onNodeClick }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(level < 2)
  const [isHovered, setIsHovered] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded)
    }
    if (onNodeClick) {
      onNodeClick(node)
    }
  }

  const getIconColor = (color?: string) => {
    return color || '#00f0ff'
  }

  return (
    <div className="relative" style={{ paddingLeft: level > 0 ? `${level * 24}px` : '0' }}>
      {/* Connection Line */}
      {level > 0 && (
        <div className="absolute left-0 top-1/2 w-4 h-0.5 bg-white/10" />
      )}
      
      {/* Node */}
      <div 
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all group ${
          level === 0 ? 'bg-white/5' : ''
        } ${isHovered ? 'bg-white/10' : ''}`}
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
            isHovered ? 'text-white' : 'text-gray-200'
          }`}
        >
          {node.name}
        </span>
        
        {/* Description */}
        <span className="text-gray-500 text-xs hidden sm:inline">—</span>
        <span className="text-gray-400 text-xs hidden sm:inline">{node.description}</span>
        
        {/* Status Badge */}
        {!hasChildren && (
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
            live
          </span>
        )}
        
        {/* Color Indicator */}
        {node.color && (
          <span 
            className="w-2 h-2 rounded-full ml-1"
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
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null)
  const [expandedAll, setExpandedAll] = useState(true)

  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNode(node)
  }

  const toggleExpandAll = () => {
    setExpandedAll(!expandedAll)
    // This would require recursive state management
    // For simplicity, we'll just toggle the root
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[#00f0ff]" />
          <h3 className="text-lg font-bold text-white">System Architecture</h3>
          <span className="text-xs text-gray-500">Interactive Diagram</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Click to expand/collapse</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-gray-400">Live</span>
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-[10px] text-gray-400">API</span>
            <span className="w-2 h-2 rounded-full bg-[#7b2ffc]" />
            <span className="text-[10px] text-gray-400">DB</span>
            <span className="w-2 h-2 rounded-full bg-[#ff6b35]" />
            <span className="text-[10px] text-gray-400">AI</span>
          </div>
        </div>
      </div>

      {/* Diagram */}
      <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
        <TreeNode 
          node={architectureData} 
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="glass p-4 rounded-xl border border-[#00f0ff]/20 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="text-2xl">{selectedNode.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-semibold">{selectedNode.name}</h4>
                {selectedNode.color && (
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ background: selectedNode.color }}
                  />
                )}
              </div>
              <p className="text-gray-400 text-sm">{selectedNode.description}</p>
              {selectedNode.children && (
                <p className="text-gray-500 text-xs mt-1">
                  {selectedNode.children.length} child nodes
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tech Stack Summary */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Server size={12} className="text-[#00f0ff]" />
          Frontend: Next.js
        </span>
        <span className="flex items-center gap-1.5">
          <Database size={12} className="text-[#7b2ffc]" />
          Database: PostgreSQL
        </span>
        <span className="flex items-center gap-1.5">
          <Brain size={12} className="text-[#ff6b35]" />
          AI: Claude API
        </span>
        <span className="flex items-center gap-1.5">
          <Cloud size={12} className="text-[#00f0ff]" />
          DevOps: Docker + Nginx
        </span>
        <span className="flex items-center gap-1.5">
          <Shield size={12} className="text-[#7b2ffc]" />
          Security: JWT + RBAC
        </span>
      </div>
    </div>
  )
}