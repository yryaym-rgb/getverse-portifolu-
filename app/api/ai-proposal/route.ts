import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { industry, budget, team, problem } = await request.json()
    
    if (!industry || !budget || !problem) {
      return NextResponse.json(
        { error: 'Please provide industry, budget, and problem' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a solutions architect. Generate a professional proposal for:
- Industry: ${industry}
- Budget: ${budget}
- Team: ${team || 'Not specified'}
- Problem: ${problem}

Include:
1. Executive summary
2. Solution overview
3. Technical approach
4. Timeline
5. Cost breakdown
6. Why Abdul Malik is the right choice (based on his experience)

Make it professional, detailed, and persuasive.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'AI Proposal Generator',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Industry: ${industry}, Budget: ${budget}, Team: ${team || 'Not specified'}, Problem: ${problem}` }
        ],
        temperature: 0.4,
        max_tokens: 1500
      })
    })

    const data = await response.json()
    const proposal = data.choices?.[0]?.message?.content || 'Unable to generate proposal. Please try again.'

    return NextResponse.json({ proposal })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}