import { NextResponse } from 'next/server'
import { ai } from '../../lib/ai/client'
import { prompts } from '../../lib/ai/prompts'

export async function POST(request: Request) {
  try {
    const { idea } = await request.json()
    
    if (!idea || idea.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe your idea' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please set OPENROUTER_API_KEY in .env.local' },
        { status: 500 }
      )
    }

    const response = await ai.chatJSON({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: prompts.lab(idea) },
        { role: 'user', content: `Design a complete system for: ${idea}` }
      ],
      temperature: 0.5,
      maxTokens: 1200
    })

    return NextResponse.json({ 
      result: response,
      confidence: 0.92
    })
  } catch (error) {
    console.error('Lab API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate blueprint. Please try again.' },
      { status: 500 }
    )
  }
}