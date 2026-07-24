'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react'

const suggestions = [
  'What government systems has Abdul built?',
  "Explain MAONI's architecture",
  'Show AI projects',
  'Why should I hire Abdul?',
]

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi! I'm Abdul's portfolio assistant — trained on his projects, architecture, and experience. Try asking about government systems, MAONI's architecture, or why you should hire him." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg = text.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const allMessages = [...messages, { role: 'user' as const, content: userMsg }]
      const res = await fetch('/api/digital-twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message || 'Ask me about government systems, MAONI architecture, AI projects, or why you should hire Abdul.' }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I had trouble connecting. Try asking about Abdul\'s government projects or AI experience.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[90] w-[360px] max-w-[calc(100vw-3rem)] glass rounded-2xl border border-white/10 shadow-2xl shadow-[#00f0ff]/10 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-gradient-to-r from-[#00f0ff]/10 to-[#7b2ffc]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff] flex items-center justify-center">
                  <Bot size={16} className="text-black" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Abdul&apos;s AI Assistant</div>
                  <div className="text-xs text-gray-500">Powered by portfolio knowledge</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white p-1" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                    m.role === 'user'
                      ? 'bg-[#00f0ff]/20 text-white'
                      : 'bg-white/5 text-gray-300'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 px-3">
                  <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-4 pb-2 flex flex-wrap gap-1">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-[#00f0ff]/30 transition"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input) }}
              className="p-4 border-t border-white/5 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00f0ff]/30"
              />
              <button type="submit" disabled={loading} className="p-2 rounded-xl bg-[#00f0ff]/20 text-[#00f0ff] hover:bg-[#00f0ff]/30 transition disabled:opacity-50" aria-label="Send">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-gradient-to-r from-[#d4af37] to-[#00f0ff] text-black shadow-lg shadow-[#00f0ff]/20 flex items-center justify-center hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  )
}
