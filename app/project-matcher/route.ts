import { NextResponse } from 'next/server'

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
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a project matcher. Compare the idea "${idea}" with Abdul Malik's portfolio projects.

Return a JSON with:
1. matches: array of { project: string, score: number, reason: string }
2. recommendation: string

Projects: MAONI (Government Platform), ARPTC Tower Map (Telecom Mapping), Selzara (AI SaaS), AwazPK (Voice Platform), JustFly (Flight Scraping), SolidBridge (Fintech), MediCare Pro (Healthcare)`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Project Matcher',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Match this idea to portfolio projects: ${idea}` }
        ],
        temperature: 0.3,
        max_tokens: 800
      })
    })

    const data = await response.json()
    const result = data.choices?.[0]?.message?.content || 'Unable to match projects. Please try again.'

    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to match projects' },
      { status: 500 }
    )
  }
}