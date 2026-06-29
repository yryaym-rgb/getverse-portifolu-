'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Upload, Brain, CheckCircle, XCircle, 
  Loader2, Sparkles, Target, FileText, 
  AlertCircle, TrendingUp, Award, Zap,
  Download, Eye, Send
} from 'lucide-react'

export default function JobMatcher() {
  const [file, setFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('upload')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [result, setResult] = useState<null | { 
    match: number
    skills: string[]
    projects: string[]
    missing: string[]
    summary: string
    recommendations: string[]
    experienceMatch: string
    cultureFit: string
  }>(null)

  // Simulate AI analysis
  const handleAnalyze = () => {
    if (inputMethod === 'upload' && !file) {
      alert('Please upload a file first')
      return
    }
    if (inputMethod === 'paste' && !jobDescription.trim()) {
      alert('Please paste a job description')
      return
    }

    setAnalyzing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setAnalyzing(false)
      setUploaded(true)
      setResult({
        match: 96,
        skills: ['Python', 'FastAPI', 'React', 'Next.js', 'Docker', 'AWS', 'PostgreSQL', 'AI/ML'],
        projects: ['MAONI (Presidential Platform)', 'ARPTC Tower Map', 'Selzara AI SaaS'],
        missing: ['Kubernetes', 'GraphQL'],
        summary: 'Excellent match for senior engineering role with AI and government experience. Strong track record of delivering production systems at scale with 99.98% uptime.',
        recommendations: [
          'Consider adding Kubernetes to your skill set',
          'GraphQL experience would expand your API capabilities',
          'Your government experience is a major differentiator'
        ],
        experienceMatch: '4+ years of full-stack development with AI integration. Experience building national-scale platforms.',
        cultureFit: 'Remote-first experience, cross-cultural communication, government-grade security mindset'
      })
    }, 3000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploaded(false)
      setResult(null)
    }
  }

  const handlePaste = () => {
    if (jobDescription.trim()) {
      setUploaded(false)
      setResult(null)
    }
  }

  const resetAll = () => {
    setFile(null)
    setUploaded(false)
    setResult(null)
    setJobDescription('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/ai-recruiter" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" />
          Back to AI Recruiter
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Target size={14} />
            AI Job Matcher
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">AI Match</span> Analyzer
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Upload a job description or paste it below. AI will analyze and show you exactly how well I match.
          </p>
        </div>

        {/* Input Section */}
        <div className="glass p-8 rounded-3xl border border-white/5 mb-8">
          {/* Toggle */}
          <div className="flex gap-2 mb-6 bg-white/5 rounded-xl p-1 max-w-xs">
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
                  File ready for analysis
                </div>
              )}
            </div>
          )}

          {/* Paste Area */}
          {inputMethod === 'paste' && (
            <div>
              <textarea
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                onBlur={handlePaste}
                placeholder="Paste the job description here..."
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
              />
              {jobDescription && (
                <div className="mt-2 flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle size={14} />
                  Job description ready for analysis ({jobDescription.split(' ').length} words)
                </div>
              )}
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing || (!file && !jobDescription.trim())}
            className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
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
          <div className="space-y-6 animate-fadeIn">
            {/* Match Score */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Overall Match Score</p>
                  <div className="flex items-center gap-4">
                    <p className="text-5xl font-bold gradient-text">{result.match}%</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Strong Match</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#00f0ff] transition flex items-center gap-2">
                    <Download size={16} />
                    Export
                  </button>
                  <Link 
                    href="/contact" 
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center gap-2"
                  >
                    <Send size={16} />
                    Contact Abdul
                  </Link>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">AI Summary</h3>
              <p className="text-white">{result.summary}</p>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle size={16} />
                  Matching Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill, i) => (
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
                  {result.missing.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Relevant Projects */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-sm font-bold text-[#7b2ffc] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award size={16} />
                Relevant Projects
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.projects.map((project, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-[#7b2ffc]/10 text-[#7b2ffc] text-sm font-medium">
                    {project}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Culture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Experience Match
                </h3>
                <p className="text-gray-300 text-sm">{result.experienceMatch}</p>
              </div>

              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-sm font-bold text-[#ff6b35] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Sparkles size={16} />
                  Culture Fit
                </h3>
                <p className="text-gray-300 text-sm">{result.cultureFit}</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass p-6 rounded-2xl border border-[#00f0ff]/20 bg-[#00f0ff]/5">
              <h3 className="text-sm font-bold text-[#00f0ff] uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap size={16} />
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
        {!result && !analyzing && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400">Upload a job description or paste it above to get started</p>
            <p className="text-gray-500 text-sm mt-1">AI will analyze and show you the match score</p>
          </div>
        )}
      </section>

      <Footer />

      {/* Animations */}
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