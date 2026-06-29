'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Upload, Brain, CheckCircle, XCircle, Loader2, 
  Sparkles, Target, FileText, AlertCircle, Award, TrendingUp, Users, Zap 
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

export default function JobMatcher() {
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
      let jobText = ''
      if (inputMethod === 'upload' && file) {
        jobText = await file.text()
      } else {
        jobText = jobDescription
      }

      const response = await fetch('/api/job-matcher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jobText })
      })
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (data.result) {
        setResult(data.result)
        setUploaded(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze job description')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
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
    <main className="min-h-screen bg-black">
      <Navigation />
      
      <section className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <Link href="/ai-recruiter" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to AI Recruiter
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Target size={14} />
            AI Job Matcher
          </div>
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">AI Match</span> Analyzer
          </h1>
          <p className="text-gray-400 mt-2">Powered by Claude AI — Real-time job matching</p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
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

          {inputMethod === 'upload' && (
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
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
              <Upload size={48} className="mx-auto text-gray-500 mb-4" />
              <p className="text-white font-medium">
                {file ? file.name : 'Upload Job Description'}
              </p>
              <p className="text-gray-400 text-sm">
                {file ? `${(file.size / 1024).toFixed(1)} KB` : 'PDF, TXT, or DOCX'}
              </p>
              {file && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs">
                  <CheckCircle size={12} />
                  File ready
                </div>
              )}
            </div>
          )}

          {inputMethod === 'paste' && (
            <div>
              <textarea
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
              />
              {jobDescription && (
                <div className="mt-2 flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle size={14} />
                  Ready ({jobDescription.split(' ').length} words)
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

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

        {result && (
          <div className="mt-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <p className="text-gray-400 text-sm">Match Score</p>
                <p className="text-3xl font-bold gradient-text">{result.match}%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-400" />
                  <span className="text-emerald-400 font-medium">AI Verified</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass p-3 rounded-xl text-center border border-white/5">
                <div className="text-lg font-bold text-[#00f0ff]">{result.matchDetails.skillsMatch}%</div>
                <p className="text-gray-400 text-xs">Skills</p>
              </div>
              <div className="glass p-3 rounded-xl text-center border border-white/5">
                <div className="text-lg font-bold text-[#7b2ffc]">{result.matchDetails.experienceMatch}%</div>
                <p className="text-gray-400 text-xs">Experience</p>
              </div>
              <div className="glass p-3 rounded-xl text-center border border-white/5">
                <div className="text-lg font-bold text-[#ff6b35]">{result.matchDetails.projectMatch}%</div>
                <p className="text-gray-400 text-xs">Projects</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-gray-400 text-sm mb-1">AI Summary</p>
              <p className="text-white">{result.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
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
              <div className="p-4 rounded-xl bg-white/5">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#00f0ff]" />
                  Experience Match
                </p>
                <p className="text-white text-sm">{result.experienceMatch}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Users size={14} className="text-[#7b2ffc]" />
                  Culture Fit
                </p>
                <p className="text-white text-sm">{result.cultureFit}</p>
              </div>
            </div>

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

            <div className="flex gap-4">
              <Link href="/contact" className="flex-1 text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition">
                Contact Abdul
              </Link>
              <button onClick={resetAll} className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition">
                Try Another
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}