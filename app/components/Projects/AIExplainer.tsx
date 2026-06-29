'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Brain, Send, Loader2, Sparkles, 
  MessageSquare, Code, Database, Server,
  Shield, Zap, Clock, CheckCircle,
  Copy, ThumbsUp, ThumbsDown,
  ChevronDown, ChevronRight, X
} from 'lucide-react'

interface AIExplainerProps {
  projectTitle: string
  projectDescription: string
  projectTech: string[]
  projectSlug?: string
  className?: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

export default function AIExplainer({ 
  projectTitle, 
  projectDescription, 
  projectTech, 
  projectSlug,
  className = ''
}: AIExplainerProps) {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `👋 Hi! I'm the AI Explainer for **${projectTitle}**. Ask me anything about this project — architecture, security, tech choices, challenges, or how it works.\n\n💡 Try asking: "How does the architecture work?" or "What security measures were used?"`,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [conversationCount, setConversationCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const userMessages = messages.filter(m => m.role === 'user').length
    setConversationCount(userMessages)
  }, [messages])

  const suggestions = [
    'How does the architecture work?',
    'What security measures were used?',
    'How was AI integrated?',
    'What was the biggest challenge?',
    'How is it deployed?',
    'What is the tech stack?'
  ]

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response = ''
      const lowerQuestion = userMessage.toLowerCase()
      
      // Simple keyword-based responses
      if (lowerQuestion.includes('architecture') || lowerQuestion.includes('how')) {
        response = `The **${projectTitle}** project uses a modern architecture with:\n\n• **Frontend:** React/Next.js with TypeScript and Tailwind CSS\n• **Backend:** FastAPI (Python) with async support\n• **Database:** PostgreSQL with Supabase\n• **AI:** Claude API integration for intelligent features\n• **Deployment:** Docker + Nginx on VPS\n\nThe architecture is designed for scalability, security, and maintainability.`
      } else if (lowerQuestion.includes('security')) {
        response = `**${projectTitle}** implements military-grade security:\n\n• **Authentication:** JWT with refresh tokens\n• **Authorization:** Role-based access control (RBAC)\n• **Encryption:** Data encrypted at rest and in transit\n• **Audit Logging:** Complete audit trail for all actions\n• **Rate Limiting:** Protection against DDoS attacks\n\nThese measures were implemented to meet government and enterprise security standards.`
      } else if (lowerQuestion.includes('ai') || lowerQuestion.includes('intelligence')) {
        response = `**${projectTitle}** leverages AI in several ways:\n\n• **Claude API:** For natural language processing and analysis\n• **Sentiment Analysis:** Understanding user feedback and proposals\n• **Content Generation:** Automated reports and summaries\n• **Intelligent Search:** Finding relevant information quickly\n\nAI is integrated to enhance user experience and automate complex tasks.`
      } else if (lowerQuestion.includes('challenge') || lowerQuestion.includes('hard')) {
        response = `The biggest challenge with **${projectTitle}** was:\n\n• **Scale:** Handling thousands of concurrent users\n• **Security:** Meeting government-grade security requirements\n• **Complexity:** Integrating multiple systems and APIs\n• **Performance:** Optimizing for fast response times\n\nWe solved these using intelligent caching, load balancing, and a microservices architecture.`
      } else if (lowerQuestion.includes('tech') || lowerQuestion.includes('stack')) {
        response = `**${projectTitle}** uses this tech stack:\n\n${projectTech.map(t => `• **${t}**`).join('\n')}\n\nThis stack was chosen for performance, scalability, and developer productivity.`
      } else if (lowerQuestion.includes('deploy')) {
        response = `**${projectTitle}** is deployed using:\n\n• **Containerization:** Docker for consistent environments\n• **Reverse Proxy:** Nginx for load balancing\n• **Cloud:** VPS with auto-scaling capabilities\n• **CI/CD:** GitHub Actions for automated deployments\n• **Monitoring:** Prometheus and Grafana for metrics\n\nThe deployment strategy ensures 99.98% uptime and fast rollbacks.`
      } else if (lowerQuestion.includes('thank')) {
        response = `You're welcome! 😊 I'm glad I could help you understand **${projectTitle}** better. Is there anything else you'd like to know?`
      } else {
        response = `I can help you with questions about **${projectTitle}**! Try asking about:\n\n• Architecture\n• Security\n• AI integration\n• Challenges\n• Tech stack\n• Deployment\n\nOr feel free to ask anything specific about the project!`
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }])
      setIsLoading(false)
    }, 1000 + Math.random() * 500)
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
        content: `👋 Chat cleared. Ask me anything about **${projectTitle}**!`,
        timestamp: new Date()
      }
    ])
  }

  const copyLastResponse = () => {
    const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')
    if (lastAssistantMessage) {
      navigator.clipboard.writeText(lastAssistantMessage.content)
    }
  }

  return (
    <div className={`glass rounded-2xl border border-white/5 overflow-hidden ${className}`}>
      {/* Header */}
      <div 
        className="p-4 border-b border-white/5 bg-gradient-to-r from-[#00f0ff]/5 to-[#7b2ffc]/5 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <div>
            <span className="text-white font-semibold text-sm flex items-center gap-2">
              AI Explainer
              <Sparkles size={12} className="text-[#00f0ff]" />
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-gray-400">
                {conversationCount > 0 ? `${conversationCount} messages` : 'Ask anything'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{projectTitle}</span>
          {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Messages */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-3 custom-scrollbar bg-black/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] text-white' 
                    : 'bg-white/5 text-gray-200 border border-white/5'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === 'assistant' ? (
                      <Brain size={10} className="text-[#00f0ff]" />
                    ) : (
                      <User size={10} className="text-white/70" />
                    )}
                    <span className="text-[10px] opacity-70">
                      {msg.role === 'assistant' ? 'AI Explainer' : 'You'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
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
                placeholder="Ask about this project..."
                className="flex-1 px-3 py-2 bg-white/5 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-[#00f0ff] focus:outline-none text-sm resize-none min-h-[38px] max-h-[80px]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-gradient-to-r from-[#00f0ff] to-[#7b2ffc] rounded-xl text-white hover:shadow-lg hover:shadow-[#00f0ff]/25 transition disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-1.5">
              <span className="text-[10px] text-gray-500">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs">Enter</kbd> to send
              </span>
              <div className="flex gap-2">
                {conversationCount > 0 && (
                  <>
                    <button
                      onClick={copyLastResponse}
                      className="text-gray-500 hover:text-white transition"
                      title="Copy last response"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={clearChat}
                      className="text-gray-500 hover:text-white transition"
                      title="Clear chat"
                    >
                      <X size={12} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// User Icon component (if not imported)
function User({ size = 24, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}