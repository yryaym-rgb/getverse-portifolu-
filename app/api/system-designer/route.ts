import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'System description is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior system architect. Design a complete system architecture for: "${prompt}"

Return a JSON with:
1. architecture: string (high-level architecture with technology choices)
2. database: string (database schema design with tables and relationships)
3. api: string (API design with endpoints and authentication)
4. deployment: string (deployment strategy with infrastructure)
5. timeline: string (estimated timeline in weeks)
6. security: string (security considerations)
7. cost: string (estimated cost breakdown)
8. scalability: string (how the system scales)
9. monitoring: string (monitoring and observability strategy)

Be specific, practical, and actionable. Use Abdul Malik's actual tech stack where appropriate.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'System Designer',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 1200
      })
    })

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    let result
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found')
      }
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    return NextResponse.json({ design: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate system design' },
      { status: 500 }
    )
  }
}