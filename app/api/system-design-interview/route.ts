import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { question } = await request.json()
    
    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter a system design question' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior system design interviewer. You think like Abdul Malik — a Full Stack AI Developer with 4+ years experience building government-scale platforms, AI systems, and enterprise SaaS.

Answer the system design question: "${question}"

Provide a detailed answer covering:
1. Requirements clarification
2. Core components
3. Database design
4. API design
5. Scalability
6. Security
7. Trade-offs
8. Real-world examples from Abdul's projects

Return the answer as a clean, well-structured response with clear sections.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'System Design Interview',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.6,
        max_tokens: 1500
      })
    })

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content || 'Unable to generate answer. Please try again.'

    return NextResponse.json({ answer })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    )
  }
}