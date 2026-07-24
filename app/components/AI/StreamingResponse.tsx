'use client'

import { useState, useEffect } from 'react'
import { Loader2, CheckCircle, Zap } from 'lucide-react'

interface StreamingResponseProps {
  onComplete?: (text: string) => void
  onProgress?: (text: string) => void
}

export default function StreamingResponse({ onComplete, onProgress }: StreamingResponseProps) {
  const [text, setText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [stages, setStages] = useState<string[]>([])
  const [currentStage, setCurrentStage] = useState(0)

  const stagesList = [
    'Analyzing your idea...',
    'Designing architecture...',
    'Planning database schema...',
    'Generating APIs...',
    'Estimating costs...',
    'Creating timeline...',
    'Finding similar projects...'
  ]

  useEffect(() => {
    // Simulate streaming response
    let index = 0
    const fullText = 'This is a streaming response that types out like a real AI assistant. Each character appears one by one, creating a natural, engaging experience for the user.'
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(prev => prev + fullText[index])
        onProgress?.(text + fullText[index])
        index++
      } else {
        setIsComplete(true)
        onComplete?.(fullText)
        clearInterval(interval)
      }
    }, 30)

    // Simulate stages
    let stageIndex = 0
    const stageInterval = setInterval(() => {
      if (stageIndex < stagesList.length) {
        setStages(prev => [...prev, stagesList[stageIndex]])
        stageIndex++
      } else {
        clearInterval(stageInterval)
      }
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(stageInterval)
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Stages */}
      {stages.length > 0 && (
        <div className="space-y-2">
          {stagesList.map((stage, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                i < stages.length ? 'bg-emerald-500/20 text-emerald-400' :
                i === stages.length && !isComplete ? 'border-2 border-[#00f0ff] animate-pulse' :
                'border border-gray-700'
              }`}>
                {i < stages.length ? <CheckCircle size={12} /> : null}
              </div>
              <span className={`text-sm ${
                i < stages.length ? 'text-gray-400' :
                i === stages.length && !isComplete ? 'text-[#00f0ff]' :
                'text-gray-600'
              }`}>
                {stage}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Streaming Text */}
      <div className="p-4 rounded-xl bg-black/50 border border-white/5 min-h-[100px]">
        <p className="text-gray-300 text-sm leading-relaxed">
          {text}
          {!isComplete && (
            <span className="inline-block w-2 h-4 bg-[#00f0ff] animate-pulse ml-1" />
          )}
        </p>
        {isComplete && (
          <div className="flex items-center gap-2 mt-2 text-emerald-400 text-xs">
            <CheckCircle size={14} />
            Complete
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {isComplete ? (
          <span className="flex items-center gap-1">
            <Zap size={12} className="text-emerald-400" />
            Response complete
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Loader2 size={12} className="animate-spin text-[#00f0ff]" />
            Generating...
          </span>
        )}
        <span className="text-gray-600">|</span>
        <span>Powered by local knowledge base</span>
      </div>
    </div>
  )
}