interface ModelResponse {
  model: string
  content: string
  confidence?: number
  latency: number
}

export async function orchestrateModels(
  prompt: string,
  models: string[] = [
    'anthropic/claude-3.5-sonnet',
    'openai/gpt-4o',
    'google/gemini-pro'
  ]
): Promise<ModelResponse[]> {
  const results = await Promise.all(
    models.map(async (model) => {
      const start = Date.now()
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://getverse.dev',
            'X-Title': 'AI Orchestrator',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 500
          })
        })
        const data = await response.json()
        const content = data.choices?.[0]?.message?.content || ''
        return {
          model,
          content,
          confidence: data.usage ? 0.8 : 0.5,
          latency: Date.now() - start
        }
      } catch (error) {
        return {
          model,
          content: 'Error: Model unavailable',
          confidence: 0,
          latency: Date.now() - start
        }
      }
    })
  )
  return results
}

export async function mergeResponses(responses: ModelResponse[]): Promise<string> {
  // If only one response, return it
  if (responses.length === 1) {
    return responses[0].content
  }

  // Simple merge: take the response with highest confidence
  const best = responses.reduce((a, b) => 
    (a.confidence || 0) > (b.confidence || 0) ? a : b
  )
  
  return best.content
}