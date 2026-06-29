'use client'

import { useState } from 'react'
import { 
  Code, Send, Loader2, CheckCircle, XCircle, 
  Copy, Trash2, Sparkles, Server, Database,
  Cloud, Shield, Zap, Clock, ArrowRight,
  ChevronDown, ChevronUp, Eye, Terminal
} from 'lucide-react'

interface ResponseData {
  status: number
  data: any
  time: string
  size?: string
}

export default function APIExplorer() {
  const [endpoint, setEndpoint] = useState('/api/projects')
  const [method, setMethod] = useState('GET')
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [loading, setLoading] = useState(false)
  const [requestBody, setRequestBody] = useState('{\n  "title": "New Project",\n  "description": "Project description"\n}')
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer token",\n  "Content-Type": "application/json"\n}')
  const [showHeaders, setShowHeaders] = useState(false)
  const [showBody, setShowBody] = useState(true)

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD']

  const handleRequest = () => {
    setLoading(true)
    const startTime = performance.now()
    
    setTimeout(() => {
      const endTime = performance.now()
      const time = (endTime - startTime).toFixed(0)
      
      setLoading(false)
      
      let mockResponse: ResponseData
      
      if (method === 'GET') {
        mockResponse = {
          status: 200,
          data: {
            projects: [
              { id: 1, title: 'MAONI', status: 'active', created_at: '2024-01-15', region: 'DRC' },
              { id: 2, title: 'ARPTC Tower Map', status: 'active', created_at: '2024-03-22', region: 'DRC' },
              { id: 3, title: 'Selzara', status: 'active', created_at: '2024-06-10', region: 'Global' },
              { id: 4, title: 'AwazPK', status: 'development', created_at: '2024-08-05', region: 'Pakistan' },
              { id: 5, title: 'JustFly', status: 'active', created_at: '2024-09-18', region: 'Nigeria' },
              { id: 6, title: 'SolidBridge', status: 'active', created_at: '2024-10-01', region: 'Global' }
            ],
            total: 18,
            page: 1,
            limit: 6,
            meta: {
              version: 'v2.1.0',
              timestamp: new Date().toISOString()
            }
          },
          time: `${time}ms`,
          size: '2.4 KB'
        }
      } else if (method === 'POST') {
        mockResponse = {
          status: 201,
          data: {
            id: 19,
            title: JSON.parse(requestBody || '{}').title || 'New Project',
            status: 'created',
            message: 'Project created successfully',
            created_at: new Date().toISOString()
          },
          time: `${time}ms`,
          size: '1.2 KB'
        }
      } else if (method === 'DELETE') {
        mockResponse = {
          status: 204,
          data: { message: 'Resource deleted successfully' },
          time: `${time}ms`,
          size: '0 B'
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
          size: '0.8 KB'
        }
      }
      
      setResponse(mockResponse)
    }, 800)
  }

  const handleCopy = () => {
    if (!response) return
    navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))
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
    '/api/projects',
    '/api/projects/1',
    '/api/analytics',
    '/api/users',
    '/api/health',
    '/api/metrics'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={20} className="text-[#00f0ff]" />
          <h3 className="text-xl font-bold text-white">API Explorer</h3>
          <span className="text-xs text-gray-500">Live Testing</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Shield size={12} className="text-emerald-400" />
            HTTPS
          </span>
          <span className="flex items-center gap-1">
            <Server size={12} className="text-[#7b2ffc]" />
            v2.1.0
          </span>
        </div>
      </div>

      {/* Request Builder */}
      <div className="glass p-4 rounded-2xl border border-white/5">
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
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-500">Quick:</span>
        {quickEndpoints.map((ep) => (
          <button
            key={ep}
            onClick={() => setEndpoint(ep)}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
          >
            {ep}
          </button>
        ))}
      </div>

      {/* Response */}
      {response && (
        <div className="animate-fadeIn">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
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

          <div className="p-4 rounded-xl bg-black/50 border border-white/5">
            <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>

          {/* Response Info */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Server size={12} />
              Server: nginx/1.18.0
            </span>
            <span className="flex items-center gap-1">
              <Zap size={12} />
              Cache: MISS
            </span>
            <span className="flex items-center gap-1">
              <Cloud size={12} />
              CORS: Enabled
            </span>
          </div>
        </div>
      )}

      {/* No Response State */}
      {!response && !loading && (
        <div className="text-center py-8 border border-dashed border-gray-700 rounded-2xl">
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
    </div>
  )
}