'use client'

import { useState, useRef, useEffect } from 'react'
import { getLocalResponse } from '../../lib/responses'
import { simulateTyping } from '../../lib/simulateTyping'
import {
  Send, Loader2, Bot, User, Sparkles, 
  Brain, Clock, Code, Server, Shield,
  MessageSquare, Zap, Award, Globe,
  CheckCircle, ArrowRight, Trash2,
  Copy, ThumbsUp, ThumbsDown
} from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

interface ChatProps {
  className?: string
  onMessageSent?: (message: string) => void
  onMessageReceived?: (message: string) => void
}

export default function DigitalTwinChat({ className = '', onMessageSent, onMessageReceived }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: "👋 Hi, I'm Abdul Malik's AI Digital Twin. I've been trained on his entire portfolio, CV, GitHub, and engineering philosophy.\n\nI think exactly how he would. Ask me anything about system design, architecture, AI, or engineering in general.\n\n💡 Try asking: 'How would you design a voting system?' or 'Explain your engineering philosophy.'",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationCount, setConversationCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
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
    setIsTyping(true)

    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }])
    if (onMessageSent) onMessageSent(userMessage)

    const response = getLocalResponse(userMessage)
    const assistantIndex = messages.length + 1

    setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: new Date() }])

    typingCleanupRef.current?.()
    typingCleanupRef.current = simulateTyping(
      response,
      (partial) => {
        setMessages(prev => {
          const updated = [...prev]
          updated[assistantIndex] = { role: 'assistant', content: partial, timestamp: new Date() }
          return updated
        })
      },
      () => {
        setIsTyping(false)
        if (onMessageReceived) onMessageReceived(response)
      }
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
        content: "👋 Chat cleared. Ask me anything about Abdul's experience, skills, or engineering philosophy!",
        timestamp: new Date()
      }
    ])
    setConversationCount(0)
  }

  const copyLastResponse = () => {
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')
    if (lastAssistantMessage) {
      navigator.clipboard.writeText(lastAssistantMessage.content)
    }
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
    <div className={`glass rounded-3xl border border-white/5 overflow-hidden ${className}`}>
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
              <span className="text-[10px] text-gray-400">Trained on 18+ projects</span>
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
            <>
              <button
                onClick={copyLastResponse}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
                title="Copy last response"
              >
                <Copy size={14} />
              </button>
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
                title="Clear chat"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
          <span className="text-xs text-gray-500">🧠 100% knowledge</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-2 border-b border-white/5 bg-black/20">
        {quickStats.map((stat, i) => (
          <div key={i} className="text-center p-1.5">
            <div className="flex justify-center" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <p className="text-white text-xs font-medium">{stat.value}</p>
            <p className="text-gray-500 text-[10px]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="h-[420px] overflow-y-auto p-4 space-y-3 custom-scrollbar bg-black/30">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white' 
                : 'bg-white/5 text-gray-200 border border-white/5'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {msg.role === 'assistant' ? (
                  <Bot size={12} className="text-[#00f0ff]" />
                ) : (
                  <User size={12} className="text-white/70" />
                )}
                <span className="text-[10px] opacity-70">
                  {msg.role === 'assistant' ? 'AI Twin' : 'You'}
                </span>
                {msg.timestamp && (
                  <span className="text-[10px] opacity-50 ml-auto">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && messages[messages.length - 1]?.content === '' && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
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
            ref={inputRef}
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
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-gray-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs">Enter</kbd> to send
          </span>
          <span className="text-[10px] text-gray-500">
            🔒 Private • No data stored
          </span>
        </div>
      </div>
    </div>
  )
}