import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { description } = await request.json()
    
    if (!description || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe your project' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a CTO advisor. You think like Abdul Malik, a Full Stack AI Developer who builds government-scale platforms and AI systems.

Project description: "${description}"

Provide strategic advice including:
1. Technology recommendations
2. Team structure
3. Sprint roadmap
4. Infrastructure design
5. Budget recommendations
6. Risk assessment
7. Timeline

Be realistic and practical. Draw from Abdul's experience with 18+ production platforms.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'CTO Advisor',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: description }
        ],
        temperature: 0.5,
        max_tokens: 1200
      })
    })

    const data = await response.json()
    const advice = data.choices?.[0]?.message?.content || 'Unable to generate advice. Please try again.'

    return NextResponse.json({ advice })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate advice' },
      { status: 500 }
    )
  }
}