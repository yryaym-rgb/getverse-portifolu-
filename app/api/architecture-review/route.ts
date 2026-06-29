import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { architecture } = await request.json()
    
    if (!architecture || architecture.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please describe your architecture' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior software architect. Review the provided architecture and provide feedback.

Architecture: "${architecture}"

Provide a comprehensive review covering:
1. Scalability
2. Performance
3. Security
4. Maintainability
5. Cost optimization
6. Failure points

Then provide recommendations as if Abdul Malik were suggesting improvements based on his experience with government-scale platforms and AI systems.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Architecture Review',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: architecture }
        ],
        temperature: 0.5,
        max_tokens: 1200
      })
    })

    const data = await response.json()
    const review = data.choices?.[0]?.message?.content || 'Unable to generate review. Please try again.'

    return NextResponse.json({ review })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate review' },
      { status: 500 }
    )
  }
}