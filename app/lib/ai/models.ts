import { getLocalResponse } from '../responses'

interface ModelResponse {
  model: string
  content: string
  confidence?: number
  latency: number
}

/** Local model orchestration — no external API calls */
export async function orchestrateModels(
  prompt: string,
  models: string[] = ['local-primary', 'local-secondary', 'local-tertiary']
): Promise<ModelResponse[]> {
  const content = getLocalResponse(prompt)
  return models.map((model, i) => ({
    model,
    content,
    confidence: 0.9 - i * 0.05,
    latency: 5 + i * 2,
  }))
}

export async function mergeResponses(responses: ModelResponse[]): Promise<string> {
  if (responses.length === 1) {
    return responses[0].content
  }

  const best = responses.reduce((a, b) =>
    (a.confidence || 0) > (b.confidence || 0) ? a : b
  )

  return best.content
}
