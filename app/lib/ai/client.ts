import { NextResponse } from 'next/server'

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

export class AIClient {
  private apiKey: string
  private baseUrl = 'https://openrouter.ai/api/v1/chat/completions'

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || ''
    if (!this.apiKey) {
      console.error('OPENROUTER_API_KEY is not set')
    }
  }

  async chat(options: AIOptions) {
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY is not configured')
    }

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'AI Engineering OS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: options.model || 'anthropic/claude-3.5-sonnet',
        messages: options.messages,
        temperature: options.temperature || 0.5,
        max_tokens: options.maxTokens || 1200,
        stream: options.stream || false
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('AI API Error:', response.status, error)
      throw new Error(`AI API Error: ${response.status}`)
    }

    return response
  }

  async chatJSON<T>(options: AIOptions): Promise<T> {
    const response = await this.chat(options)
    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      throw new Error('No content from AI')
    }

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('No JSON found')
    } catch {
      throw new Error('Failed to parse AI response')
    }
  }

  async chatStream(options: AIOptions): Promise<ReadableStream> {
    const response = await this.chat({ ...options, stream: true })
    return response.body!
  }
}

export const ai = new AIClient()