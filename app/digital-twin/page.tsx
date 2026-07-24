'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getLocalResponse } from '../lib/responses'
import { simulateTyping } from '../lib/simulateTyping'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { 
  Send, Brain, Sparkles, Loader2, Bot, User,
  Code, Database, Server, Shield, Zap,
  MessageSquare, Clock, Award, Globe,
  Users, CheckCircle, ArrowRight
} from 'lucide-react'

export default function DigitalTwin() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { 
      role: 'assistant', 
      content: "👋 Hi, I'm Abdul Malik's Digital Twin — a local knowledge base trained on my portfolio, CV, and engineering philosophy.\n\nAsk me about system design, architecture, projects, or how I approach engineering.\n\n💡 Try: 'How would you design a voting system?' or 'Tell me about MAONI.'"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationCount, setConversationCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingCleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Track conversation depth
    const userMessages = messages.filter(m => m.role === 'user').length
    setConversationCount(userMessages)
  }, [messages])

  useEffect(() => {
    return () => typingCleanupRef.current?.()
  }, [])

  const handleSend = () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    const response = getLocalResponse(userMessage)
    const assistantIndex = messages.length + 1

    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    typingCleanupRef.current?.()
    typingCleanupRef.current = simulateTyping(
      response,
      (partial) => {
        setMessages(prev => {
          const updated = [...prev]
          updated[assistantIndex] = { role: 'assistant', content: partial }
          return updated
        })
      },
      () => setIsTyping(false)
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: "👋 Chat cleared. Ask me anything about Abdul's experience, skills, or engineering philosophy!" 
      }
    ])
  }

  const suggestions = [
    'How would you design Uber?',
    'Explain your engineering philosophy',
    'Why FastAPI over Django?',
    'How do you think about scalability?',
    'What mistakes have you learned from?',
    'How would you build a voting system?'
  ]

  const quickStats = [
    { label: 'Trained On', value: '18+ Projects', icon: <Code size={14} />, color: '#00f0ff' },
    { label: 'Knowledge', value: '100% CV', icon: <Brain size={14} />, color: '#7b2ffc' },
    { label: 'Tech Stack', value: 'Full Coverage', icon: <Server size={14} />, color: '#ff6b35' },
    { label: 'Experience', value: '4+ Years', icon: <Clock size={14} />, color: '#00f0ff' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7b2ffc] opacity-[0.02] rounded-full  " />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Brain size={14} />
            AI Digital Twin
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Talk to <span className="gradient-text">Abdul's AI</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            A local knowledge base built from my portfolio — answers instantly, no API keys required.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 max-w-4xl mx-auto pb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickStats.map((stat, i) => (
            <div key={i} className="glass p-3 rounded-xl text-center border border-white/5">
              <div className="flex justify-center mb-1" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Section */}
      <section className="px-4 max-w-4xl mx-auto pb-20">
        <div className="glass rounded-3xl border border-white/5 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#00f0ff]/5 to-[#7b2ffc]/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm flex items-center gap-2">
                  Abdul's AI Twin
                  <Sparkles size={14} className="text-[#00f0ff]" />
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full " />
                  <span className="text-[10px] text-gray-400">Local knowledge base</span>
                  {conversationCount > 0 && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span className="text-[10px] text-gray-400">{conversationCount} messages</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {conversationCount > 0 && (
                <button
                  onClick={clearChat}
                  className="text-xs text-gray-400 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5"
                >
                  Clear
                </button>
              )}
              <span className="text-xs text-gray-500">📚 Portfolio knowledge base</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[450px] overflow-y-auto p-4 space-y-3 custom-scrollbar bg-black/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white' 
                    : 'bg-white/5 text-gray-200 border border-white/5'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && messages[messages.length - 1]?.content === '' && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-2xl">
                  <Loader2 size={20} className="animate-spin text-[#00f0ff]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 border-t border-gray-800/50 bg-black/20">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">💡 Try asking</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(suggestion)
                    setTimeout(() => handleSend(), 100)
                  }}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800/50 bg-white/5">
            <div className="flex gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Abdul's AI anything..."
                className="flex-1 px-3 py-2 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none text-sm resize-none min-h-[42px] max-h-[120px]"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-2 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] rounded-xl text-white hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>
            Powered by local knowledge base • Based on CV, projects, and engineering notes
          </p>
          <p className="mt-1">
            🔒 All conversations are private • No data is stored
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}