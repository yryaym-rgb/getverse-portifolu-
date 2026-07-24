import { getLocalResponse } from '../responses'
import { findSimilar } from './embeddings'

export interface TwinResponse {
  content: string
  source?: string
  mode: 'exact' | 'rag' | 'fallback'
}

export function getTwinResponse(userInput: string): TwinResponse {
  const trimmed = userInput.trim()
  if (!trimmed) {
    return {
      content: 'Ask me about projects, skills, experience, or how I approach engineering.',
      mode: 'fallback',
    }
  }

  const exact = getLocalResponse(trimmed)
  const defaultFallback = "I don't have that info. Try asking about my projects, skills, or experience."

  if (exact && exact !== defaultFallback) {
    return { content: exact, mode: 'exact' }
  }

  const similar = findSimilar(trimmed)
  if (similar && similar.score >= 0.2) {
    return {
      content: similar.entry.answer,
      source: similar.entry.source,
      mode: 'rag',
    }
  }

  if (similar && similar.score >= 0.1) {
    return {
      content: `${similar.entry.answer}\n\n💡 Related topic — ask me more about ${similar.entry.id.replace('-', ' ')}.`,
      source: similar.entry.source,
      mode: 'rag',
    }
  }

  return {
    content: defaultFallback,
    mode: 'fallback',
  }
}
