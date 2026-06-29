'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Upload, Brain, Loader2, CheckCircle,
  XCircle, FileText, Users, Award, Zap,
  TrendingUp, AlertCircle, Download, Eye,
  Sparkles, BarChart3, Target, Shield
} from 'lucide-react'
import build from 'next/dist/build'

interface AnalysisResult {
  matchScore: number
  skills: {
    matching: string[]
    missing: string[]
    years: number
  }
  experience: {
    years: number
    level: 'Junior' | 'Mid' | 'Senior' | 'Lead'
    summary: string
  }
  projects: string[]
  recommendations: string[]
  summary: string
  detailed: {
    technical: number
    experience: number
    culture: number
    overall: number
  }
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit')
        return
      }
      setFile(selected)
      setError(null)
      setResult(null)
      analyzeResume(selected)
    }
  }

  const analyzeResume = async (resumeFile: File) => {
    setAnalyzing(true)
    setError(null)
    try {
      const text = await resumeFile.text()
      
      const response = await fetch('/api/resume-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: text })
      })
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (data.result) {
        setResult(data.result)
      } else {
        throw new Error('No result returned from AI')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.')
      console.error('Resume analysis error:', err)
    } finally {
      setAnalyzing(false)
    }
  }

  const resetAll = () => {
    setFile(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        <Link href="/ai-recruiter" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to AI Recruiter
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Brain size={14} />
            AI Resume Analyzer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI</span> Resume Analyzer
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered analysis with match scores, skill gaps, and recommendations.
          </p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5 mb-8">
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
              file ? 'border-[#00f0ff]/50 bg-[#00f0ff]/5' : 'border-gray-700 hover:border-[#00f0ff]/30'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-white font-medium">
              {file ? file.name : 'Upload Resume/CV'}
            </p>
            <p className="text-gray-400 text-sm">
              {file ? `${(file.size / 1024).toFixed(1)} KB` : 'PDF, DOCX, or TXT (Max 5MB)'}
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {analyzing && (
            <div className="mt-6 text-center py-8">
              <Loader2 size={40} className="animate-spin text-[#00f0ff] mx-auto" />
              <p className="text-gray-400 mt-4">AI analyzing your resume...</p>
              <p className="text-gray-500 text-sm">This may take a moment</p>
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-6 animate-fadeIn">
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Overall Match Score</p>
                  <div className="flex items-center gap-4">
                    <p className="text-5xl font-bold gradient-text">{result.matchScore}%</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Strong Match</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white transition flex items-center gap-2">
                    <Download size={16} />
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Technical', value: result.detailed.technical, color: '#00f0ff' },
                { label: 'Experience', value: result.detailed.experience, color: '#7b2ffc' },
                { label: 'Culture', value: result.detailed.culture, color: '#ff6b35' },
                { label: 'Overall', value: result.detailed.overall, color: '#00f0ff' },
              ].map((item, i) => (
                <div key={i} className="glass p-4 rounded-xl text-center border border-white/5">
                  <div className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.value}%
                  </div>
                  <p className="text-gray-400 text-xs">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">AI Summary</h3>
              <p className="text-white">{result.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Matching Skills ({result.skills.matching.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.matching.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Skills to Develop
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.missing.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Experience Match
                </h3>
                <p className="text-white text-sm">{result.experience.summary}</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                  <span className="px-2 py-1 rounded bg-white/5">{result.experience.years} years</span>
                  <span className="px-2 py-1 rounded bg-[#00f0ff]/10 text-[#00f0ff]">{result.experience.level}</span>
                </div>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Award size={16} />
                  Relevant Projects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.projects.map((project, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-[#7b2ffc]/10 text-[#7b2ffc] text-sm font-medium">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-[#00f0ff]/20 bg-[#00f0ff]/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles size={16} />
                AI Recommendations
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-[#00f0ff] font-bold">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Link href="/contact" className="flex-1 text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                Contact Abdul
              </Link>
              <button 
                onClick={resetAll}
                className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition"
              >
                Analyze Another
              </button>
            </div>
          </div>
        )}

        {!result && !analyzing && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-400">Upload your resume above to get started</p>
            <p className="text-gray-500 text-sm mt-1">AI will analyze and show you the match score</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}