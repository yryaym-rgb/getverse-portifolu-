'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, Brain, Scan, Mic, Eye, 
  MessageSquare, Sparkles, Loader2, CheckCircle,
  Zap, Code, FileText, Image as ImageIcon,
  Volume2, Languages, BarChart3, Activity,
  Server, Database, Cloud, Shield
} from 'lucide-react'

interface LabTest {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  status: 'ready' | 'running' | 'complete'
  result?: string
}

export default function EngineeringLabPage() {
  const [tests, setTests] = useState<LabTest[]>([
    {
      id: 'ocr',
      icon: <Scan size={24} />,
      title: 'OCR Text Extraction',
      description: 'Extract text from images using AI-powered OCR',
      color: '#00f0ff',
      status: 'ready'
    },
    {
      id: 'sentiment',
      icon: <Brain size={24} />,
      title: 'Sentiment Analysis',
      description: 'Analyze sentiment and emotion in text',
      color: '#7b2ffc',
      status: 'ready'
    },
    {
      id: 'speech',
      icon: <Mic size={24} />,
      title: 'Speech Recognition',
      description: 'Convert speech to text in real-time',
      color: '#ff6b35',
      status: 'ready'
    },
    {
      id: 'vision',
      icon: <Eye size={24} />,
      title: 'Image Recognition',
      description: 'Detect objects and analyze images',
      color: '#00f0ff',
      status: 'ready'
    },
    {
      id: 'translate',
      icon: <Languages size={24} />,
      title: 'Translation',
      description: 'Translate text between multiple languages',
      color: '#7b2ffc',
      status: 'ready'
    },
    {
      id: 'summarize',
      icon: <FileText size={24} />,
      title: 'Text Summarization',
      description: 'Generate concise summaries of long text',
      color: '#ff6b35',
      status: 'ready'
    }
  ])

  const [inputText, setInputText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [results, setResults] = useState<Record<string, string>>({})
  const [isRunning, setIsRunning] = useState(false)

  const handleTest = (testId: string) => {
    setIsRunning(true)
    setTests(prev => prev.map(t => 
      t.id === testId ? { ...t, status: 'running' } : t
    ))

    setTimeout(() => {
      const result = generateResult(testId)
      setResults(prev => ({ ...prev, [testId]: result }))
      setTests(prev => prev.map(t => 
        t.id === testId ? { ...t, status: 'complete', result } : t
      ))
      setIsRunning(false)
    }, 2000)
  }

  const generateResult = (testId: string): string => {
    switch (testId) {
      case 'ocr':
        return `✅ Text detected successfully!\n\n• "Building Mission-Critical AI Systems for Governments & Enterprises"\n• Confidence: 97.3%\n• Language: English\n• Processing time: 0.8s`
      case 'sentiment':
        return `✅ Sentiment Analysis Complete\n\n• Sentiment: Positive (92%)\n• Category: Technology / Government\n• Key Topics: AI, Government, Enterprise, Security\n• Summary: This text describes building AI systems for government and enterprise use with a focus on security and scalability.`
      case 'speech':
        return `✅ Speech Recognition Complete\n\n• Transcription: "I build AI systems for governments and enterprises. My focus is on mission-critical applications that require security and scalability."\n• Language: English\n• Confidence: 94.1%\n• Duration: 2.3s`
      case 'vision':
        return `✅ Image Analysis Complete\n\n• Detected: 5 objects\n• Faces: 0\n• Text: "AI Engineering Command Center"\n• Dominant Colors: #00f0ff, #0a0a0f, #7b2ffc\n• Scene: Technology / Corporate`
      case 'translate':
        return `✅ Translation Complete\n\n• Original: "${inputText || 'Hello, I build AI systems for governments.'}"\n• French: "Bonjour, je construis des systèmes d'IA pour les gouvernements."\n• Spanish: "Hola, construyo sistemas de IA para gobiernos."\n• German: "Hallo, ich baue KI-Systeme für Regierungen."`
      case 'summarize':
        return `✅ Text Summarization Complete\n\n• Original Length: 245 words\n• Summary Length: 68 words\n• Key Points:\n  - AI systems built for governments\n  - Focus on security and scalability\n  - Trusted by presidential offices\n  - National-scale deployments\n\n• Readability Score: 92%`
      default:
        return 'Test completed successfully!'
    }
  }

  const resetTest = (testId: string) => {
    setTests(prev => prev.map(t => 
      t.id === testId ? { ...t, status: 'ready', result: undefined } : t
    ))
    setResults(prev => {
      const newResults = { ...prev }
      delete newResults[testId]
      return newResults
    })
  }

  const resetAll = () => {
    setTests(prev => prev.map(t => ({ ...t, status: 'ready', result: undefined })))
    setResults({})
    setInputText('')
    setImageUrl('')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return <span className="text-xs text-gray-500">Ready</span>
      case 'running': return <span className="text-xs text-[#00f0ff] animate-pulse flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Running</span>
      case 'complete': return <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> Complete</span>
      default: return null
    }
  }

  const labStats = [
    { label: 'AI Models', value: '6', icon: <Brain size={14} />, color: '#00f0ff' },
    { label: 'Languages', value: '10+', icon: <Languages size={14} />, color: '#7b2ffc' },
    { label: 'Processing', value: 'Real-time', icon: <Zap size={14} />, color: '#ff6b35' },
    { label: 'Accuracy', value: '94%+', icon: <CheckCircle size={14} />, color: '#00f0ff' },
  ]

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
            <Brain size={14} />
            Engineering Lab
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Engineering</span> Lab
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Test AI models for OCR, sentiment analysis, speech recognition, translation, and more.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {labStats.map((stat, i) => (
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

        {/* Input Area (for translation) */}
        <div className="glass p-4 rounded-2xl border border-white/5 mb-6">
          <p className="text-sm text-gray-400 mb-2">Test Input (for Translation & Summarization)</p>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate or summarize..."
            className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none text-sm"
            rows={3}
          />
        </div>

        {/* Lab Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <div key={test.id} className="glass p-5 rounded-2xl border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${test.color}15` }}
                >
                  <span style={{ color: test.color }}>{test.icon}</span>
                </div>
                {getStatusBadge(test.status)}
              </div>

              <h3 className="text-white font-semibold">{test.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{test.description}</p>

              {test.status === 'ready' && (
                <button
                  onClick={() => handleTest(test.id)}
                  disabled={isRunning}
                  className="mt-4 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition text-sm disabled:opacity-50"
                >
                  Run Test
                </button>
              )}

              {test.status === 'running' && (
                <div className="mt-4 text-center py-2">
                  <Loader2 size={20} className="animate-spin text-[#00f0ff] mx-auto" />
                  <p className="text-gray-400 text-xs mt-1">Processing...</p>
                </div>
              )}

              {test.status === 'complete' && test.result && (
                <div className="mt-4">
                  <div className="p-3 rounded-xl bg-black/50 border border-white/5">
                    <pre className="text-gray-300 text-xs whitespace-pre-wrap font-mono leading-relaxed">
                      {test.result}
                    </pre>
                  </div>
                  <button
                    onClick={() => resetTest(test.id)}
                    className="mt-2 text-xs text-gray-400 hover:text-white transition"
                  >
                    Reset Test
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reset All */}
        {Object.keys(results).length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={resetAll}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Reset All Tests
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/10">
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-[#00f0ff] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium">AI Models Powered by Claude</p>
              <p className="text-gray-400 text-xs mt-1">
                All tests are powered by local knowledge — no external API required.
                Results are simulated for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}