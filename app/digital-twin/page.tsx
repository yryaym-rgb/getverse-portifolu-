'use client'

import { useState } from 'react'
import { getTwinResponse, type TwinResponse } from '../lib/ai/twin'
import { getWebLlmState, initWebLlm } from '../lib/ai/twin-webllm'
import { simulateTyping } from '../lib/simulateTyping'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import {
  Send, Brain, Sparkles, Loader2, Bot, Zap, BookOpen,
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  source?: string
  mode?: TwinResponse['mode']
}

export default function DigitalTwin() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "👋 Hi, I'm Abdul Malik's Digital Twin — powered by RAG with semantic search over my portfolio knowledge base.\n\nAsk about system design, projects, skills, or engineering philosophy.\n\n💡 Try: 'How would you design Uber?' or 'Tell me about MAONI.'",
      mode: 'exact',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiMode, setAiMode] = useState<'rag' | 'webllm'>('rag')
  const [modelState, setModelState] = useState(getWebLlmState().state)
  const [loadProgress, setLoadProgress] = useState('')

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)

    let response: TwinResponse

    if (aiMode === 'webllm' && modelState === 'ready') {
      const { getWebLlmResponse } = await import('../lib/ai/twin-webllm')
      const llmResponse = await getWebLlmResponse(userMessage)
      response = llmResponse
        ? { content: llmResponse.content, mode: 'exact' as const }
        : getTwinResponse(userMessage)
    } else {
      response = getTwinResponse(userMessage)
    }

    const assistantIndex = messages.length + 1
    setMessages((prev) => [...prev, { role: 'assistant', content: '', mode: response.mode, source: response.source }])

    simulateTyping(
      response.content,
      (partial) => {
        setMessages((prev) => {
          const updated = [...prev]
          updated[assistantIndex] = {
            role: 'assistant',
            content: partial,
            mode: response.mode,
            source: response.source,
          }
          return updated
        })
      },
      () => setIsTyping(false)
    )
  }

  const enableWebLlm = async () => {
    setModelState('loading')
    const ok = await initWebLlm((text) => setLoadProgress(text))
    setModelState(ok ? 'ready' : 'error')
    if (ok) setAiMode('webllm')
  }

  const suggestions = [
    'Tell me about MAONI',
    'What are your rates?',
    'Why FastAPI over Django?',
    'How do you think about scalability?',
    'What is ARPTC?',
    'How would you design Uber?',
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      <section className="relative pt-32 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00f0ff]/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 text-[#00f0ff] text-sm mb-4">
            <Brain size={14} />
            AI Digital Twin
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7b2ffc]/20 text-[#7b2ffc]">
              RAG + Citations
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Talk to <span className="gradient-text">Abdul&apos;s AI</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Semantic search over portfolio knowledge — instant answers with source citations.
          </p>
        </div>
      </section>

      <section className="px-4 max-w-4xl mx-auto pb-20">
        <div className="glass rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-gradient-to-r from-[#00f0ff]/5 to-[#7b2ffc]/5 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm flex items-center gap-2">
                  Abdul&apos;s AI Twin
                  <Sparkles size={14} className="text-[#00f0ff]" />
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span className="text-[10px] text-gray-400">
                    {aiMode === 'webllm' ? 'Powered by WebLLM' : 'RAG knowledge base'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAiMode('rag')}
                className={`text-xs px-3 py-1.5 rounded-lg transition ${
                  aiMode === 'rag' ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-gray-400 hover:text-white'
                }`}
              >
                RAG Mode
              </button>
              {modelState !== 'ready' && modelState !== 'loading' && (
                <button
                  onClick={enableWebLlm}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[#7b2ffc]/20 text-[#7b2ffc] hover:bg-[#7b2ffc]/30 transition flex items-center gap-1"
                >
                  <Zap size={12} />
                  Enable WebLLM
                </button>
              )}
              {modelState === 'loading' && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Loader2 size={12} className="animate-spin" />
                  {loadProgress || 'Loading model...'}
                </span>
              )}
              {modelState === 'ready' && (
                <button
                  onClick={() => setAiMode('webllm')}
                  className={`text-xs px-3 py-1.5 rounded-lg transition ${
                    aiMode === 'webllm' ? 'bg-[#7b2ffc]/20 text-[#7b2ffc]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  WebLLM
                </button>
              )}
            </div>
          </div>

          <div className="h-[450px] overflow-y-auto p-4 space-y-3 custom-scrollbar bg-black/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white'
                      : 'bg-white/5 text-gray-200 border border-white/5'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  {msg.source && msg.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/10">
                      <BookOpen size={12} className="text-[#00f0ff]" />
                      <span className="text-[10px] text-gray-400">Source: {msg.source}</span>
                    </div>
                  )}
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
          </div>

          <div className="px-4 py-2 border-t border-gray-800/50 bg-black/20">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Try asking</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s); setTimeout(handleSend, 100) }}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-gray-800/50 bg-white/5">
            <div className="flex gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="Ask Abdul's AI anything..."
                className="flex-1 px-3 py-2 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none text-sm resize-none min-h-[42px]"
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-2 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] rounded-xl text-white hover:shadow-lg transition disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          RAG mode runs locally with semantic matching • WebLLM downloads ~1GB model on first use
        </p>
      </section>

      <Footer />
    </main>
  )
}
