'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getInterviewAnswer } from '../../lib/localApiResponses'
import { simulateTyping } from '../../lib/simulateTyping'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  ArrowLeft, ArrowRight, Mic, Brain, Loader2, CheckCircle, 
  Sparkles, Clock, Award, BarChart3, Users,
  Send, Zap, Target, Star, Volume2, VolumeX,
  AlertCircle, ChevronDown
} from 'lucide-react'

interface Question {
  id: number
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  sampleAnswer: string
  hints?: string[]
}

export default function Interview() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const typingCleanupRef = useRef<(() => void) | null>(null)

  const questions: Question[] = [
    {
      id: 1,
      category: 'Distributed Systems',
      difficulty: 'Hard',
      question: 'Explain the CAP theorem and how you handle consistency in distributed systems.',
      sampleAnswer: '',
      hints: [
        'Think about the three properties: Consistency, Availability, Partition tolerance',
        'Consider which two are most important for your system',
        'Remember that partition tolerance is non-negotiable in distributed systems'
      ]
    },
    {
      id: 2,
      category: 'Databases',
      difficulty: 'Medium',
      question: 'What is the difference between Redis and PostgreSQL? When would you use each?',
      sampleAnswer: '',
      hints: [
        'Consider the data structure needs: key-value vs relational',
        'Think about persistence requirements',
        'Consider performance vs durability trade-offs'
      ]
    },
    {
      id: 3,
      category: 'Frameworks',
      difficulty: 'Medium',
      question: 'Why did you choose FastAPI over Django for your projects?',
      sampleAnswer: '',
      hints: [
        'Think about async vs sync performance',
        'Consider documentation needs',
        'Think about type safety and developer experience'
      ]
    },
    {
      id: 4,
      category: 'DevOps',
      difficulty: 'Medium',
      question: 'Explain Docker and how you use it in your deployment pipeline.',
      sampleAnswer: '',
      hints: [
        'Think about containerization benefits',
        'Consider the deployment workflow',
        'Remember orchestration and scaling'
      ]
    },
    {
      id: 5,
      category: 'Security',
      difficulty: 'Hard',
      question: 'How do you handle security in a government system?',
      sampleAnswer: '',
      hints: [
        'Think about authentication and authorization',
        'Consider data protection and encryption',
        'Remember audit trails and compliance'
      ]
    },
    {
      id: 6,
      category: 'AI',
      difficulty: 'Hard',
      question: 'What is your experience with AI and LLMs?',
      sampleAnswer: '',
      hints: [
        'Think about specific AI integrations',
        'Consider real-world applications',
        'Remember the challenges and solutions'
      ]
    }
  ]

  const totalQuestions = questions.length
  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  useEffect(() => {
    if (started && !completed) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [started, completed])

  const handleStart = () => {
    setStarted(true)
    setCurrentQuestion(0)
    setAnswers([])
    setCompleted(false)
    setScore(null)
    setTimeElapsed(0)
  }

  useEffect(() => {
    return () => typingCleanupRef.current?.()
  }, [])

  const handleShowAnswer = () => {
    setShowAnswer(true)
    setIsLoading(true)
    setCurrentAnswer('')

    const answer = getInterviewAnswer(currentQ.question)
    typingCleanupRef.current?.()
    typingCleanupRef.current = simulateTyping(
      answer,
      (partial) => setCurrentAnswer(partial),
      () => {
        setIsLoading(false)
        setAnswers(prev => (prev.includes(answer) ? prev : [...prev, answer]))
      }
    )
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowAnswer(false)
      setUserAnswer('')
      setShowHint(false)
      setCurrentAnswer('')
    } else {
      const baseScore = 70
      const bonus = Math.min(Math.floor(timeElapsed / 30), 15)
      const answerBonus = answers.length * 2
      const calculatedScore = Math.min(baseScore + bonus + answerBonus, 100)
      setScore(calculatedScore)
      setCompleted(true)
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setUserAnswer(prev => prev + ' (Voice input captured)')
      }, 3000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Hard': return 'text-red-400 bg-red-500/20 border-red-500/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/20'
      case 'Easy': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/20'
      default: return 'text-gray-400 bg-white/5 border-white/5'
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
            <Mic size={14} />
            AI Interview
          </div>
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">AI</span> Interview
          </h1>
          <p className="text-gray-400 mt-2">Local expert answers — instant responses from portfolio knowledge</p>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
          {!started ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00f0ff]/10 to-[#7b2ffc]/10 flex items-center justify-center mx-auto mb-6">
                <Brain size={48} className="text-[#00f0ff] opacity-70" />
              </div>
              <h3 className="text-2xl font-bold text-white">Ready for Interview?</h3>
              <p className="text-gray-400 mt-2 max-w-md mx-auto">
                AI will ask {totalQuestions} technical questions covering distributed systems, databases, frameworks, DevOps, security, and AI.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {questions.map((q, i) => (
                  <span key={i} className={`px-2.5 py-1 rounded-full text-xs border ${getDifficultyColor(q.difficulty)}`}>
                    {q.category}
                  </span>
                ))}
              </div>
              <button 
                onClick={handleStart} 
                className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg hover:shadow-[#00f0ff]/25 transition flex items-center gap-2"
              >
                <Sparkles size={18} />
                Start Interview
              </button>
            </div>
          ) : completed ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Interview Complete! 🎉</h3>
              <p className="text-gray-400 mt-2">
                All {totalQuestions} questions answered with engineering-level depth
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {score && (
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/5">
                    <Award size={24} className="text-[#00f0ff]" />
                    <div>
                      <p className="text-gray-400 text-sm">Score</p>
                      <p className="text-3xl font-bold gradient-text">{score}/100</p>
                    </div>
                  </div>
                )}
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/5">
                  <Clock size={24} className="text-[#7b2ffc]" />
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {answers.map((_, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs">
                    ✓ Q{i+1}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <button 
                  onClick={handleStart} 
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition"
                >
                  Try Again
                </button>
                <Link href="/ai-recruiter" className="px-6 py-3 rounded-xl border border-gray-700 text-white hover:border-[#00f0ff] transition">
                  Back to Tools
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} />
                    {formatTime(timeElapsed)}
                  </span>
                </div>
                <span className="text-sm text-[#00f0ff]">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] transition-all duration-500" 
                  style={{ width: `${progress}%` }} 
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] text-xs font-medium">
                  {currentQ.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(currentQ.difficulty)}`}>
                  {currentQ.difficulty}
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-gray-500 hover:text-white transition text-xs flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                <p className="text-white text-lg font-medium">Q: {currentQ.question}</p>
              </div>

              {showHint && currentQ.hints && (
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 animate-fadeIn">
                  <p className="text-blue-400 text-sm font-medium mb-1">💡 Hint</p>
                  <ul className="space-y-1">
                    {currentQ.hints.map((hint, i) => (
                      <li key={i} className="text-gray-300 text-sm">• {hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isRecording 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-[#00f0ff]/30'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Volume2 size={16} />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Mic size={16} />
                      Voice Input
                    </>
                  )}
                </button>
                <span className="text-xs text-gray-500">(Optional — type or use voice)</span>
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium block mb-2">
                  Your Answer (optional)
                </label>
                <textarea
                  rows={3}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here... or click 'View Expert Answer'"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none transition resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleShowAnswer}
                  disabled={showAnswer || isLoading}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7b2ffc] to-[#ff6b35] text-white font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Loading Expert Answer...
                    </>
                  ) : (
                    <>
                      <Brain size={18} />
                      {showAnswer ? 'Answer Revealed' : 'View Expert Answer'}
                    </>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'Complete Interview'}
                  <ArrowRight size={16} />
                </button>
              </div>

              {showAnswer && currentAnswer && (
                <div className="mt-4 p-6 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/20 animate-fadeIn">
                  <div className="flex items-center gap-2 text-[#00f0ff] text-sm font-medium mb-2">
                    <Star size={14} />
                    Expert Answer (Portfolio Knowledge)
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {currentAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}