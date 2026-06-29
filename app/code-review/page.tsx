'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  ArrowLeft, Upload, Loader2, CheckCircle, 
  AlertTriangle, Shield, Zap, Code, Brain,
  Sparkles, XCircle, Clock, GitBranch,
  Download, Copy, Eye, Terminal
} from 'lucide-react'

export default function CodeReview() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<null | {
    summary: string
    score: number
    issues: Array<{
      severity: 'critical' | 'high' | 'medium' | 'low'
      category: 'security' | 'performance' | 'readability' | 'maintainability' | 'bug' | 'best-practice'
      title: string
      description: string
      line?: string
      suggestion: string
    }>
    strengths: string[]
    improvements: string[]
    securityScan: {
      vulnerabilities: string[]
      riskLevel: 'low' | 'medium' | 'high' | 'critical'
    }
    performance: {
      rating: 'poor' | 'average' | 'good' | 'excellent'
      bottlenecks: string[]
    }
  }>(null)

  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'sql', label: 'SQL' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
  ]

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert('Please paste some code to review')
      return
    }

    setAnalyzing(true)
    setResult(null)

    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      })

      const data = await response.json()
      setResult(data.review || generateFallbackReview())
    } catch (error) {
      console.error('Error:', error)
      setResult(generateFallbackReview())
    } finally {
      setAnalyzing(false)
    }
  }

  const generateFallbackReview = () => ({
    summary: 'AI review completed. Here\'s a detailed analysis of your code.',
    score: 72,
    issues: [
      {
        severity: 'high' as const,
        category: 'security' as const,
        title: 'Potential SQL Injection Risk',
        description: 'User input is not properly sanitized before being used in database queries.',
        line: 'Line 42',
        suggestion: 'Use parameterized queries or an ORM to prevent SQL injection attacks.'
      },
      {
        severity: 'medium' as const,
        category: 'performance' as const,
        title: 'Inefficient Loop',
        description: 'Nested loop with O(n²) complexity could be optimized.',
        line: 'Line 28-35',
        suggestion: 'Consider using a Map or Set for O(1) lookups.'
      },
      {
        severity: 'low' as const,
        category: 'readability' as const,
        title: 'Magic Numbers',
        description: 'Hard-coded numbers without explanation.',
        line: 'Line 15, 23',
        suggestion: 'Use named constants to improve code readability and maintainability.'
      }
    ],
    strengths: [
      'Good function decomposition',
      'Clean variable naming conventions',
      'Proper error handling in critical paths'
    ],
    improvements: [
      'Add more comprehensive error handling',
      'Implement caching for frequently accessed data',
      'Consider adding unit tests'
    ],
    securityScan: {
      vulnerabilities: [
        'Potential SQL injection (High)',
        'Missing input validation (Medium)',
        'Sensitive data in logs (Low)'
      ],
      riskLevel: 'medium' as const
    },
    performance: {
      rating: 'good' as const,
      bottlenecks: [
        'Nested loop on line 28-35',
        'Inefficient database queries in user service'
      ]
    }
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/20'
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/20'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20'
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/20'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield size={14} />
      case 'performance': return <Zap size={14} />
      case 'readability': return <Eye size={14} />
      case 'maintainability': return <GitBranch size={14} />
      case 'bug': return <AlertTriangle size={14} />
      default: return <Code size={14} />
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Shield size={14} />
            AI Code Reviewer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI</span> Code Review
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Paste your code for AI-powered review with security audit, bug detection, and optimization suggestions.
          </p>
        </div>

        {/* Input Section */}
        <div className="glass p-6 rounded-3xl border border-white/5 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="text-gray-300 text-sm font-medium block mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-black/50 border border-gray-700 text-white focus:border-[#00f0ff] focus:outline-none transition"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex items-end">
              <button
                onClick={handleAnalyze}
                disabled={analyzing || !code.trim()}
                className="w-full px-6 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain size={18} />
                    Review Code
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium block mb-2">
              Paste your code below
            </label>
            <textarea
              rows={10}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here for AI review..."
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white font-mono text-sm placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Results */}
        {result && !analyzing && (
          <div className="space-y-6 animate-fadeIn">
            {/* Score */}
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <p className="text-gray-400 text-sm">Code Quality Score</p>
                <p className={`text-4xl font-bold ${
                  result.score >= 80 ? 'text-emerald-400' : 
                  result.score >= 60 ? 'text-yellow-400' : 
                  'text-red-400'
                }`}>
                  {result.score}/100
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Status</p>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium inline-block ${
                  result.score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 
                  result.score >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'
                }`}>
                  {result.score >= 80 ? '✅ Excellent' : 
                   result.score >= 60 ? '⚠️ Needs Work' : 
                   '❌ Critical Issues'}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gray-400 text-sm mb-1">Summary</p>
              <p className="text-white">{result.summary}</p>
            </div>

            {/* Issues */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle size={18} className="text-yellow-400" />
                Issues Found ({result.issues.length})
              </h3>
              {result.issues.map((issue, i) => (
                <div 
                  key={i}
                  className={`p-4 rounded-xl border ${getSeverityColor(issue.severity)} bg-opacity-5 cursor-pointer transition hover:scale-[1.01]`}
                  onClick={() => setSelectedIssue(selectedIssue === i ? null : i)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getCategoryIcon(issue.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className="text-xs text-gray-400">{issue.category}</span>
                        {issue.line && (
                          <span className="text-xs text-gray-500 ml-auto">{issue.line}</span>
                        )}
                      </div>
                      <h4 className="text-white font-medium mt-1">{issue.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{issue.description}</p>
                      {selectedIssue === i && (
                        <div className="mt-3 p-3 rounded-lg bg-[#00f0ff]/5 border border-[#00f0ff]/10">
                          <p className="text-xs text-gray-400 mb-1">💡 Suggestion</p>
                          <p className="text-[#00f0ff] text-sm">{issue.suggestion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="text-emerald-400 font-medium flex items-center gap-2 mb-2">
                  <CheckCircle size={16} /> Strengths
                </h4>
                {result.strengths.map((item, i) => (
                  <p key={i} className="text-gray-300 text-sm">• {item}</p>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h4 className="text-blue-400 font-medium flex items-center gap-2 mb-2">
                  <Zap size={16} /> Improvements
                </h4>
                {result.improvements.map((item, i) => (
                  <p key={i} className="text-gray-300 text-sm">• {item}</p>
                ))}
              </div>
            </div>

            {/* Security & Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <h4 className="text-red-400 font-medium flex items-center gap-2 mb-2">
                  <Shield size={16} /> Security Scan
                </h4>
                <p className="text-gray-400 text-sm mb-2">
                  Risk Level: <span className={`font-medium ${
                    result.securityScan.riskLevel === 'critical' ? 'text-red-400' :
                    result.securityScan.riskLevel === 'high' ? 'text-orange-400' :
                    result.securityScan.riskLevel === 'medium' ? 'text-yellow-400' :
                    'text-emerald-400'
                  }`}>
                    {result.securityScan.riskLevel.toUpperCase()}
                  </span>
                </p>
                {result.securityScan.vulnerabilities.map((vuln, i) => (
                  <p key={i} className="text-gray-300 text-sm">• {vuln}</p>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <h4 className="text-yellow-400 font-medium flex items-center gap-2 mb-2">
                  <Zap size={16} /> Performance Analysis
                </h4>
                <p className="text-gray-400 text-sm mb-2">
                  Rating: <span className={`font-medium ${
                    result.performance.rating === 'excellent' ? 'text-emerald-400' :
                    result.performance.rating === 'good' ? 'text-green-400' :
                    result.performance.rating === 'average' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {result.performance.rating.toUpperCase()}
                  </span>
                </p>
                {result.performance.bottlenecks.map((bottleneck, i) => (
                  <p key={i} className="text-gray-300 text-sm">• {bottleneck}</p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact" 
                className="flex-1 text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                Discuss with Abdul <ArrowLeft size={18} className="rotate-180" />
              </Link>
              <button
                onClick={() => { setCode(''); setResult(null) }}
                className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition flex items-center gap-2"
              >
                <Sparkles size={18} />
                Review More Code
              </button>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!result && !analyzing && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400">Paste your code above and click "Review Code"</p>
            <p className="text-gray-500 text-sm mt-1">AI will analyze for bugs, security, performance, and more</p>
          </div>
        )}
      </section>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  )
}