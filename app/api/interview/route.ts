import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { question, context } = await request.json()
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior engineer conducting a technical interview. Answer the question as if you were Abdul Malik — a Full Stack AI Developer with 4+ years experience building government-scale platforms and AI systems.

Question: ${question}

Provide a comprehensive, thoughtful answer that demonstrates senior-level engineering thinking. Include:
1. Direct answer to the question
2. Relevant examples from real projects (MAONI, Selzara, JustFly, etc.)
3. Trade-offs and considerations
4. Best practices and lessons learned

${context ? `Context: ${context}` : ''}`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'AI Interview',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.5,
        max_tokens: 800
      })
    })

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content

    return NextResponse.json({ answer })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    )
  }
}