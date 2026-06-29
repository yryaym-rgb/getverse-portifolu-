import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { users, architecture } = await request.json()
    
    if (!users || !architecture) {
      return NextResponse.json(
        { error: 'Please provide users and architecture' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `Calculate estimated infrastructure costs for:
- Users: ${users}
- Architecture: ${architecture}

Provide:
1. Monthly infrastructure cost
2. Annual cost
3. Cost breakdown (compute, storage, database, CDN, AI services)
4. Scaling recommendations
5. Optimization suggestions`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Cost Simulator',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Users: ${users}, Architecture: ${architecture}` }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    })

    const data = await response.json()
    const cost = data.choices?.[0]?.message?.content || 'Unable to calculate costs. Please try again.'

    return NextResponse.json({ cost })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate costs' },
      { status: 500 }
    )
  }
}