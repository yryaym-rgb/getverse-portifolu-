'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Code, Send, Loader2, CheckCircle, 
  XCircle, Copy, Trash2, Sparkles, Server, 
  Database, Cloud, Shield, Zap, Clock, Eye,
  Terminal, GitBranch, Layers, Box,
  ChevronDown, ChevronUp, ExternalLink
} from 'lucide-react'

interface ResponseData {
  status: number
  data: any
  time: string
  size?: string
  headers?: Record<string, string>
}

export default function EngineeringAPIPage() {
  const [endpoint, setEndpoint] = useState('/api/projects')
  const [method, setMethod] = useState('GET')
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState(false)
  const [requestBody, setRequestBody] = useState('{\n  "title": "New Project",\n  "description": "Project description"\n}')
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer token",\n  "Content-Type": "application/json"\n}')
  const [showHeaders, setShowHeaders] = useState(false)
  const [showBody, setShowBody] = useState(true)
  const [history, setHistory] = useState<string[]>([])

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']

  const handleRequest = () => {
    setLoading(true)
    const startTime = performance.now()
    
    // Add to history
    setHistory(prev => [endpoint, ...prev].slice(0, 10))
    
    setTimeout(() => {
      const endTime = performance.now()
      const time = (endTime - startTime).toFixed(0)
      
      setLoading(false)
      
      let mockResponse: ResponseData
      
      if (method === 'GET') {
        if (endpoint.includes('/projects/')) {
          const id = endpoint.split('/').pop()
          mockResponse = {
            status: 200,
            data: {
              id: parseInt(id || '1'),
              title: ['MAONI', 'ARPTC Tower Map', 'Selzara'][parseInt(id || '1') - 1] || 'Project',
              status: 'active',
              created_at: '2024-01-15',
              region: 'DRC',
              description: 'Production-grade platform'
            },
            time: `${time}ms`,
            size: '0.8 KB',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=3600',
              'X-Request-ID': `req_${Date.now()}`
            }
          }
        } else {
          mockResponse = {
            status: 200,
            data: {
              projects: [
                { id: 1, title: 'MAONI', status: 'active', created_at: '2024-01-15', region: 'DRC' },
                { id: 2, title: 'ARPTC Tower Map', status: 'active', created_at: '2024-03-22', region: 'DRC' },
                { id: 3, title: 'Selzara', status: 'active', created_at: '2024-06-10', region: 'Global' },
                { id: 4, title: 'AwazPK', status: 'development', created_at: '2024-08-05', region: 'Pakistan' },
                { id: 5, title: 'JustFly', status: 'active', created_at: '2024-09-18', region: 'Nigeria' }
              ],
              total: 18,
              page: 1,
              limit: 5,
              meta: {
                version: 'v2.1.0',
                timestamp: new Date().toISOString()
              }
            },
            time: `${time}ms`,
            size: '2.4 KB',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'public, max-age=3600',
              'X-Total-Count': '18',
              'X-Request-ID': `req_${Date.now()}`
            }
          }
        }
      } else if (method === 'POST') {
        mockResponse = {
          status: 201,
          data: {
            id: Math.floor(Math.random() * 1000) + 19,
            title: JSON.parse(requestBody || '{}').title || 'New Project',
            status: 'created',
            message: 'Project created successfully',
            created_at: new Date().toISOString()
          },
          time: `${time}ms`,
          size: '1.2 KB',
          headers: {
            'Content-Type': 'application/json',
            'Location': `/api/projects/${Math.floor(Math.random() * 1000) + 19}`,
            'X-Request-ID': `req_${Date.now()}`
          }
        }
      } else if (method === 'DELETE') {
        mockResponse = {
          status: 204,
          data: { message: 'Resource deleted successfully' },
          time: `${time}ms`,
          size: '0 B',
          headers: {
            'X-Request-ID': `req_${Date.now()}`
          }
        }
      } else {
        mockResponse = {
          status: 200,
          data: {
            message: `${method} request successful`,
            timestamp: new Date().toISOString(),
            method: method,
            endpoint: endpoint
          },
          time: `${time}ms`,
          size: '0.8 KB',
          headers: {
            'Content-Type': 'application/json',
            'X-Request-ID': `req_${Date.now()}`
          }
        }
      }
      
      setResponse(mockResponse)
    }, 800)
  }

  const handleCopy = () => {
    if (!response) return
    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
  }

  const handleCopyCurl = () => {
    const curlCommand = `curl -X ${method} http://localhost:3000${endpoint}`
    navigator.clipboard.writeText(curlCommand)
  }

  const handleClear = () => {
    setResponse(null)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
    if (status >= 300 && status < 400) return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
    if (status >= 400 && status < 500) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20'
    if (status >= 500) return 'bg-red-500/20 text-red-400 border-red-500/20'
    return 'bg-gray-500/20 text-gray-400 border-gray-500/20'
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      case 'POST': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'PATCH': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const quickEndpoints = [
    { label: 'Get Projects', path: '/api/projects' },
    { label: 'Get Project', path: '/api/projects/1' },
    { label: 'Get Analytics', path: '/api/analytics' },
    { label: 'Get Users', path: '/api/users' },
    { label: 'Health Check', path: '/api/health' },
    { label: 'Get Metrics', path: '/api/metrics' },
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
            <Code size={14} />
            API Explorer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Live <span className="gradient-text">API</span> Explorer
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Test endpoints and see real-time responses with the API explorer.
          </p>
        </div>

        {/* Request Builder */}
        <div className="glass p-6 rounded-3xl border border-white/5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={18} className="text-[#00f0ff]" />
            <h3 className="text-lg font-bold text-white">Request Builder</h3>
            <span className="text-xs text-gray-500">Live Testing</span>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Method Selector */}
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className={`px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none transition ${getMethodColor(method)}`}
            >
              {methods.map((m) => (
                <option key={m} value={m} className="bg-black">{m}</option>
              ))}
            </select>

            {/* Endpoint Input */}
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition font-mono text-sm"
            />

            {/* Send Button */}
            <button
              onClick={handleRequest}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Send
            </button>
          </div>

          {/* Toggle Headers & Body */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setShowHeaders(!showHeaders)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                showHeaders ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Headers {showHeaders ? <ChevronUp size={12} className="inline" /> : <ChevronDown size={12} className="inline" />}
            </button>
            <button
              onClick={() => setShowBody(!showBody)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                showBody ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Body {showBody ? <ChevronUp size={12} className="inline" /> : <ChevronDown size={12} className="inline" />}
            </button>
          </div>

          {/* Headers */}
          {showHeaders && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Headers (JSON)</p>
              <textarea
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-xl bg-black/50 border border-gray-700 text-white font-mono text-sm placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
              />
            </div>
          )}

          {/* Body */}
          {(method === 'POST' || method === 'PUT' || method === 'PATCH') && showBody && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Request Body (JSON)</p>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={5}
                className="w-full px-4 py-2 rounded-xl bg-black/50 border border-gray-700 text-white font-mono text-sm placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
              />
            </div>
          )}
        </div>

        {/* Quick Endpoints */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-gray-500">Quick:</span>
          {quickEndpoints.map((ep) => (
            <button
              key={ep.path}
              onClick={() => setEndpoint(ep.path)}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
            >
              {ep.label}
            </button>
          ))}
        </div>

        {/* Response */}
        {response && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(response.status)}`}>
                  {response.status}
                </span>
                <span className="text-gray-400 text-xs">
                  {response.status >= 200 && response.status < 300 ? 'OK' : 
                   response.status >= 300 && response.status < 400 ? 'Redirect' :
                   response.status >= 400 && response.status < 500 ? 'Client Error' : 'Server Error'}
                </span>
                <span className="text-gray-500 text-xs">• {response.time}</span>
                {response.size && <span className="text-gray-500 text-xs">• {response.size}</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyCurl}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition text-xs flex items-center gap-1"
                >
                  <Terminal size={14} />
                  cURL
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={handleClear}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/5 overflow-x-auto">
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>

            {/* Response Headers */}
            {response.headers && (
              <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs text-gray-400 mb-1">Response Headers</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                      <span className="text-gray-500">{key}:</span>
                      <span className="text-gray-300 font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Response State */}
        {!response && !loading && (
          <div className="text-center py-12 border border-dashed border-gray-700 rounded-3xl">
            <div className="text-5xl mb-3">🔌</div>
            <p className="text-gray-400">Send a request to see the response</p>
            <p className="text-gray-500 text-sm mt-1">Try the quick endpoints above</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <Loader2 size={32} className="animate-spin text-[#00f0ff] mx-auto" />
            <p className="text-gray-400 mt-2">Sending request...</p>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 glass p-4 rounded-2xl border border-white/5">
            <p className="text-xs text-gray-400 mb-2">Recent Requests</p>
            <div className="flex flex-wrap gap-2">
              {history.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setEndpoint(item)}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  )
}