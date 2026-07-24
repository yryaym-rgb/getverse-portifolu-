import { getLocalResponse } from '../responses'
import { getLabBlueprint } from '../localApiResponses'

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIOptions {
  model: string
  messages: AIMessage[]
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

/** Local AI client — no external API keys required */
export class AIClient {
  async chat(options: AIOptions) {
    const lastUser = [...options.messages].reverse().find((m) => m.role === 'user')
    const content = getLocalResponse(lastUser?.content || '')
    return new Response(
      JSON.stringify({ choices: [{ message: { content } }] }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  async chatJSON<T>(options: AIOptions): Promise<T> {
    const lastUser = [...options.messages].reverse().find((m) => m.role === 'user')
    const idea = lastUser?.content || ''
    return getLabBlueprint(idea) as T
  }

  async chatStream(options: AIOptions): Promise<ReadableStream> {
    const lastUser = [...options.messages].reverse().find((m) => m.role === 'user')
    const content = getLocalResponse(lastUser?.content || '')
    const encoder = new TextEncoder()
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(content))
        controller.close()
      },
    })
  }
}

export const ai = new AIClient()
