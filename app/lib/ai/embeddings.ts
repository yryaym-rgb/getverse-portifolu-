import { knowledgeBase, type KnowledgeEntry } from './knowledgeBase'

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a)
  const setB = new Set(b)
  const intersection = [...setA].filter((x) => setB.has(x)).length
  const union = new Set([...setA, ...setB]).size
  return union === 0 ? 0 : intersection / union
}

export interface SimilarMatch {
  entry: KnowledgeEntry
  score: number
}

export function findSimilar(input: string, threshold = 0.15): SimilarMatch | null {
  const inputTokens = tokenize(input)
  if (inputTokens.length === 0) return null

  let best: SimilarMatch | null = null

  for (const entry of knowledgeBase) {
    const haystack = [entry.question, ...entry.keywords, entry.answer].join(' ')
    const score = jaccardSimilarity(inputTokens, tokenize(haystack))

    if (score >= threshold && (!best || score > best.score)) {
      best = { entry, score }
    }
  }

  return best
}

export function findTopMatches(input: string, limit = 3): SimilarMatch[] {
  const inputTokens = tokenize(input)
  const matches: SimilarMatch[] = []

  for (const entry of knowledgeBase) {
    const haystack = [entry.question, ...entry.keywords, entry.answer].join(' ')
    const score = jaccardSimilarity(inputTokens, tokenize(haystack))
    if (score > 0.05) matches.push({ entry, score })
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, limit)
}
