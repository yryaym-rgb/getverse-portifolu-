'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { 
  Upload, Brain, CheckCircle, XCircle, 
  Loader2, Sparkles, Target, FileText, 
  AlertCircle, TrendingUp, Award, Zap,
  Download, Eye, Send, BarChart3,
  Clock, Users, Globe, Shield
} from 'lucide-react'

interface MatchResult {
  match: number
  skills: string[]
  projects: string[]
  missing: string[]
  summary: string
  experienceMatch: string
  cultureFit: string
  recommendations: string[]
  matchDetails: {
    skillsMatch: number
    experienceMatch: number
    projectMatch: number
  }
}

interface JobMatcherProps {
  onMatchComplete?: (result: MatchResult) => void
}

export default function JobMatcher({ onMatchComplete }: JobMatcherProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('upload')
  const [result, setResult] = useState<MatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAnalyze = async () => {
    if (inputMethod === 'upload' && !file) {
      setError('Please upload a file first')
      return
    }
    if (inputMethod === 'paste' && !jobDescription.trim()) {
      setError('Please paste a job description')
      return
    }

    setError(null)
    setAnalyzing(true)
    setResult(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      const mockResult: MatchResult = {
        match: 96,
        skills: ['Python', 'FastAPI', 'React', 'Next.js', 'Docker', 'AWS', 'PostgreSQL', 'AI/ML'],
        projects: ['MAONI (Presidential Platform)', 'ARPTC Tower Map', 'Selzara AI SaaS'],
        missing: ['Kubernetes', 'GraphQL'],
        summary: 'Excellent match for senior engineering role with AI and government experience. Strong track record of delivering production systems at scale with 99.98% uptime.',
        experienceMatch: '4+ years of full-stack development with AI integration. Experience building national-scale platforms with military-grade security.',
        cultureFit: 'Remote-first experience, cross-cultural communication (worked with 5 countries), government-grade security mindset.',
        recommendations: [
          'Consider adding Kubernetes to your skill set for advanced orchestration',
          'GraphQL experience would expand your API capabilities',
          'Your government experience is a major differentiator — highlight it more'
        ],
        matchDetails: {
          skillsMatch: 90,
          experienceMatch: 95,
          projectMatch: 88
        }
      }
      
      setResult(mockResult)
      setUploaded(true)
      if (onMatchComplete) onMatchComplete(mockResult)
    } catch (err) {
      setError('Failed to analyze job description. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploaded(false)
      setResult(null)
      setError(null)
    }
  }

  const resetAll = () => {
    setFile(null)
    setUploaded(false)
    setResult(null)
    setJobDescription('')
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
          <Target size={14} />
          AI Job Matcher
        </div>
        <h2 className="text-3xl font-bold">
          <span className="gradient-text">AI Match</span> Analyzer
        </h2>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Upload a job description or paste it below. AI will analyze and show you exactly how well I match.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
          <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-300">
            ✕
          </button>
        </div>
      )}

      {/* Input Section */}
      <div className="glass p-6 rounded-2xl border border-white/5">
        {/* Toggle */}
        <div className="flex gap-2 mb-4 bg-white/5 rounded-xl p-1 max-w-xs">
          <button
            onClick={() => setInputMethod('upload')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
              inputMethod === 'upload'
                ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Upload size={14} className="inline mr-1" />
            Upload
          </button>
          <button
            onClick={() => setInputMethod('paste')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
              inputMethod === 'paste'
                ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText size={14} className="inline mr-1" />
            Paste
          </button>
        </div>

        {/* Upload Area */}
        {inputMethod === 'upload' && (
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
              file ? 'border-[#00f0ff]/50 bg-[#00f0ff]/5' : 'border-gray-700 hover:border-[#00f0ff]/30'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload size={40} className="mx-auto text-gray-500 mb-3" />
            <p className="text-white font-medium">
              {file ? file.name : 'Upload Job Description'}
            </p>
            <p className="text-gray-400 text-sm">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : 'PDF, TXT, or DOCX'}
            </p>
            {file && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs">
                <CheckCircle size={12} />
                File ready for analysis
              </div>
            )}
          </div>
        )}

        {/* Paste Area */}
        {inputMethod === 'paste' && (
          <div>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
            />
            {jobDescription && (
              <div className="mt-2 flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle size={14} />
                Job description ready ({jobDescription.split(' ').length} words)
              </div>
            )}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={analyzing || (!file && !jobDescription.trim())}
          className="mt-4 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {analyzing ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              AI Analyzing...
            </>
          ) : (
            <>
              <Brain size={18} />
              Analyze Match
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && !analyzing && (
        <div className="space-y-4 animate-fadeIn">
          {/* Match Score */}
          <div className="glass p-5 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-gray-400 text-sm font-medium">Overall Match Score</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-4xl font-bold gradient-text">{result.match}%</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Strong Match</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#00f0ff] transition flex items-center gap-1 text-sm">
                  <Download size={14} />
                  Export
                </button>
                <Link 
                  href="/contact" 
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white text-sm font-semibold hover:shadow-lg transition flex items-center gap-1"
                >
                  <Send size={14} />
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Skills Match', value: result.matchDetails.skillsMatch, color: '#00f0ff' },
              { label: 'Experience Match', value: result.matchDetails.experienceMatch, color: '#7b2ffc' },
              { label: 'Project Match', value: result.matchDetails.projectMatch, color: '#ff6b35' },
            ].map((item, i) => (
              <div key={i} className="glass p-3 rounded-xl text-center border border-white/5">
                <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}%</div>
                <p className="text-gray-400 text-xs">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-gray-400 text-sm mb-1">Summary</p>
            <p className="text-white text-sm">{result.summary}</p>
          </div>

          {/* Skills & Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" />
                Matching Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.skills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <Award size={14} className="text-[#7b2ffc]" />
                Relevant Projects
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.projects.map((project, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-[#7b2ffc]/10 text-[#7b2ffc] text-xs font-medium">
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Skills */}
          {result.missing.length > 0 && (
            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                <AlertCircle size={14} className="text-yellow-400" />
                Skills to Develop
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience & Culture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <TrendingUp size={14} className="text-[#00f0ff]" />
                Experience Match
              </p>
              <p className="text-white text-sm">{result.experienceMatch}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                <Users size={14} className="text-[#7b2ffc]" />
                Culture Fit
              </p>
              <p className="text-white text-sm">{result.cultureFit}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/20">
            <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
              <Zap size={14} className="text-[#00f0ff]" />
              AI Recommendations
            </p>
            <ul className="space-y-1">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-[#00f0ff] font-bold">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Reset */}
          <div className="text-center">
            <button
              onClick={resetAll}
              className="text-gray-400 hover:text-white transition text-sm"
            >
              ← Start Over
            </button>
          </div>
        </div>
      )}

      {/* No Results State */}
      {!result && !analyzing && !error && (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-gray-400">Upload a job description or paste it above to get started</p>
          <p className="text-gray-500 text-sm mt-1">AI will analyze and show you the match score</p>
        </div>
      )}
    </div>
  )
}