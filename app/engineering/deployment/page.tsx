'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, GitBranch, Loader2, CheckCircle, 
  XCircle, Rocket, Clock, Server, Cloud, 
  Code, Shield, Zap, Terminal, Box, Layers,
  Play, Pause, RefreshCw, ChevronDown, 
  ChevronRight, HardDrive, Globe, Lock,
  BarChart3, Activity, AlertCircle
} from 'lucide-react'

interface PipelineStep {
  name: string
  status: 'pending' | 'running' | 'complete' | 'failed'
  icon: string
  description?: string
  duration?: string
  logs?: string[]
}

export default function EngineeringDeploymentPage() {
  const [deploying, setDeploying] = useState(false)
  const [steps, setSteps] = useState<PipelineStep[]>([
    { name: 'Git Push', status: 'pending', icon: '📤', description: 'Push code to repository' },
    { name: 'CI Build', status: 'pending', icon: '🔧', description: 'Build and compile application' },
    { name: 'Unit Tests', status: 'pending', icon: '✅', description: 'Run test suite' },
    { name: 'Security Scan', status: 'pending', icon: '🛡️', description: 'Vulnerability scanning' },
    { name: 'Docker Build', status: 'pending', icon: '🐳', description: 'Container image build' },
    { name: 'Container Registry', status: 'pending', icon: '📦', description: 'Push to registry' },
    { name: 'Deploy to Server', status: 'pending', icon: '🚀', description: 'Deploy to production' },
    { name: 'Health Check', status: 'pending', icon: '🏥', description: 'Verify deployment' },
    { name: 'Production', status: 'pending', icon: '🌐', description: 'Live in production' },
  ])
  const [complete, setComplete] = useState(false)
  const [elapsedTime, setElapsedTime] = useState('')
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [logMessages, setLogMessages] = useState<string[]>([])
  const [showLogs, setShowLogs] = useState(false)
  const [deploymentCount, setDeploymentCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [autoDeploy, setAutoDeploy] = useState(false)

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogMessages(prev => [...prev, `[${timestamp}] ${message}`])
  }

  const handleDeploy = () => {
    if (deploying) return
    
    setDeploying(true)
    setComplete(false)
    setStartTime(new Date())
    setLogMessages([])
    setDeploymentCount(prev => prev + 1)
    setSteps(steps.map(s => ({ ...s, status: 'pending' })))
    addLog('🚀 Starting deployment pipeline...')

    steps.forEach((step, index) => {
      setTimeout(() => {
        setSteps(prev => prev.map((s, i) => 
          i === index ? { ...s, status: 'running' } : s
        ))
        addLog(`⏳ ${step.name}...`)

        const duration = Math.random() * 800 + 400
        
        setTimeout(() => {
          const success = Math.random() > 0.05
          
          setSteps(prev => prev.map((s, i) => 
            i === index ? { 
              ...s, 
              status: success ? 'complete' : 'failed',
              duration: `${(duration / 1000).toFixed(1)}s`
            } : s
          ))
          
          if (success) {
            addLog(`✅ ${step.name} completed in ${(duration / 1000).toFixed(1)}s`)
          } else {
            addLog(`❌ ${step.name} failed!`)
            setDeploying(false)
            return
          }
          
          if (index === steps.length - 1) {
            setComplete(true)
            setDeploying(false)
            setSuccessCount(prev => prev + 1)
            const endTime = new Date()
            const diff = (endTime.getTime() - startTime!.getTime()) / 1000
            setElapsedTime(`${diff.toFixed(1)}s`)
            addLog(`🎉 Deployment successful! (${diff.toFixed(1)}s)`)
          }
        }, duration)
      }, index * 1200 + 500)
    })
  }

  const resetPipeline = () => {
    setSteps(steps.map(s => ({ ...s, status: 'pending', duration: undefined })))
    setComplete(false)
    setElapsedTime('')
    setLogMessages([])
    setDeploying(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <span className="text-gray-500">○</span>
      case 'running': return <Loader2 size={16} className="animate-spin text-[#00f0ff]" />
      case 'complete': return <CheckCircle size={16} className="text-emerald-400" />
      case 'failed': return <XCircle size={16} className="text-red-400" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-500'
      case 'running': return 'text-[#00f0ff]'
      case 'complete': return 'text-white'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-500'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'running': return 'bg-[#00f0ff]/5 border-[#00f0ff]/20'
      case 'complete': return 'bg-white/5'
      case 'failed': return 'bg-red-500/5 border-red-500/20'
      default: return 'bg-white/5'
    }
  }

  const stats = [
    { label: 'Total Deployments', value: deploymentCount, icon: <Rocket size={14} />, color: '#00f0ff' },
    { label: 'Success Rate', value: deploymentCount > 0 ? `${Math.round((successCount / deploymentCount) * 100)}%` : '100%', icon: <CheckCircle size={14} />, color: '#7b2ffc' },
    { label: 'Avg Time', value: '45s', icon: <Clock size={14} />, color: '#ff6b35' },
    { label: 'Uptime', value: '99.98%', icon: <Shield size={14} />, color: '#00f0ff' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
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
            <GitBranch size={14} />
            CI/CD Pipeline
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Live <span className="gradient-text">Deployment</span> Simulator
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Watch a production deployment in action from start to finish.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass p-3 rounded-xl text-center border border-white/5">
              <div className="flex justify-center mb-0.5" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Deploy Button */}
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {deploying ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Deploying...
            </>
          ) : complete ? (
            <>
              <CheckCircle size={18} className="text-emerald-400" />
              Deployment Successful — {elapsedTime}
            </>
          ) : (
            <>
              <Rocket size={18} />
              Deploy to Production
            </>
          )}
        </button>

        {/* Pipeline Steps */}
        <div className="mt-6 space-y-1.5">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-all border ${getStatusBg(step.status)}`}
            >
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-gray-500 flex-shrink-0">
                {index + 1}
              </div>

              <div className="w-6 flex justify-center">
                {getStatusIcon(step.status)}
              </div>

              <span className="text-lg">{step.icon}</span>

              <div className="flex-1">
                <span className={`text-sm font-medium ${getStatusColor(step.status)}`}>
                  {step.name}
                </span>
                {step.description && (
                  <span className="text-gray-500 text-xs ml-2 hidden sm:inline">
                    {step.description}
                  </span>
                )}
              </div>

              {step.duration && (
                <span className="text-xs text-gray-500">{step.duration}</span>
              )}

              {step.status === 'complete' && (
                <span className="text-xs text-emerald-400">✓ Done</span>
              )}
              {step.status === 'running' && (
                <span className="text-xs text-[#00f0ff] animate-pulse">Running...</span>
              )}
              {step.status === 'failed' && (
                <span className="text-xs text-red-400">Failed</span>
              )}
            </div>
          ))}
        </div>

        {/* Logs */}
        <div className="mt-4">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition"
          >
            {showLogs ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            Deployment Logs {logMessages.length > 0 && `(${logMessages.length})`}
          </button>
          
          {showLogs && (
            <div className="mt-2 p-3 rounded-xl bg-black/50 border border-white/5 h-48 overflow-y-auto font-mono text-xs">
              {logMessages.length === 0 ? (
                <span className="text-gray-500">No logs yet. Start a deployment to see logs.</span>
              ) : (
                logMessages.map((msg, i) => (
                  <div key={i} className="text-gray-300 py-0.5">
                    {msg}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        {(complete || deploying) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {complete && !deploying && (
              <button
                onClick={resetPipeline}
                className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#00f0ff] transition flex items-center gap-2"
              >
                <RefreshCw size={14} />
                Reset Pipeline
              </button>
            )}
            {deploying && (
              <span className="text-xs text-gray-500 animate-pulse flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Deployment in progress...
              </span>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/10">
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-[#00f0ff] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">Production Deployment</p>
              <p className="text-gray-400 text-xs mt-1">
                This pipeline simulates a real CI/CD deployment with GitHub Actions, 
                Docker containerization, and automated health checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}