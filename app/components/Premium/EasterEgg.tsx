'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X } from 'lucide-react'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function EasterEgg() {
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [showTerminal, setShowTerminal] = useState(false)
  const [showHire, setShowHire] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Abdul Malik Lakho\'s hidden terminal.',
    'Type "help" for commands.',
  ])

  const handleKonami = useCallback((key: string) => {
    if (key === KONAMI[konamiIndex]) {
      const next = konamiIndex + 1
      if (next === KONAMI.length) {
        setShowTerminal(true)
        setKonamiIndex(0)
      } else {
        setKonamiIndex(next)
      }
    } else {
      setKonamiIndex(key === KONAMI[0] ? 1 : 0)
    }
  }, [konamiIndex])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKonami(e.key)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKonami])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    setTerminalHistory((prev) => [...prev, `$ ${cmd}`])

    if (trimmed === 'sudo hire abdul' || trimmed === 'hire abdul') {
      setShowHire(true)
      setTerminalHistory((prev) => [...prev, '🎉 INITIATING HIRE PROTOCOL...', '✅ Abdul Malik Lakho — APPROVED FOR HIRE', '🚀 Redirecting to contact page in 3...'])
      setTimeout(() => { window.location.href = '/contact' }, 3000)
    } else if (trimmed === 'help') {
      setTerminalHistory((prev) => [...prev,
        'Available commands:',
        '  help          — Show this message',
        '  whoami        — Who is Abdul?',
        '  projects      — List top projects',
        '  sudo hire abdul — 🥚 Easter egg',
        '  clear         — Clear terminal',
      ])
    } else if (trimmed === 'whoami') {
      setTerminalHistory((prev) => [...prev, 'Abdul Malik Lakho — Full Stack AI Developer, Government Systems Architect'])
    } else if (trimmed === 'projects') {
      setTerminalHistory((prev) => [...prev, 'MAONI | ARPTC | Selzara | JustFly | SolidBridge | AwazPK'])
    } else if (trimmed === 'clear') {
      setTerminalHistory([])
    } else if (trimmed) {
      setTerminalHistory((prev) => [...prev, `Command not found: ${trimmed}. Type "help".`])
    }
    setTerminalInput('')
  }

  return (
    <>
      <AnimatePresence>
        {showHire && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              className="text-6xl"
            >
              🚀
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-6 z-[85] w-[420px] max-w-[calc(100vw-3rem)] rounded-xl overflow-hidden border border-[#00f0ff]/30 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-[#0a1628] border-b border-[#00f0ff]/20">
              <div className="flex items-center gap-2 text-[#00f0ff] text-sm">
                <Terminal size={14} />
                abdul@getverse:~$
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-gray-500 hover:text-white" aria-label="Close terminal">
                <X size={14} />
              </button>
            </div>
            <div className="bg-black/95 p-4 h-48 overflow-y-auto font-mono text-xs text-green-400">
              {terminalHistory.map((line, i) => (
                <div key={i} className="mb-0.5">{line}</div>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); runCommand(terminalInput) }}
              className="flex bg-black border-t border-[#00f0ff]/20"
            >
              <span className="px-3 py-2 text-green-400 font-mono text-xs">$</span>
              <input
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 bg-transparent py-2 text-green-400 font-mono text-xs focus:outline-none"
                placeholder="sudo hire abdul"
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
