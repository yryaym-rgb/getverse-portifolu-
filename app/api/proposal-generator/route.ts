import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { project, industry, budget, timeline } = await request.json()
    
    if (!project || !industry || !budget) {
      return NextResponse.json(
        { error: 'Project, industry, and budget are required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior solutions architect. Generate a professional project proposal.

PROJECT: ${project}
INDUSTRY: ${industry}
BUDGET: ${budget}
${timeline ? `TIMELINE: ${timeline}` : ''}

Return a JSON with:
1. title: string
2. solution: string
3. architecture: string
4. timeline: string (weeks)
5. tech: string[]
6. cost: string
7. team: string
8. risks: string[]
9. deliverables: string[]
10. timelineDetails: string[]
11. summary: string

Base the proposal on Abdul Malik's experience with similar projects (MAONI, Selzara, JustFly). Be realistic and actionable.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Proposal Generator',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Project: ${project}\nIndustry: ${industry}\nBudget: ${budget}\n${timeline ? `Timeline: ${timeline}` : ''}` }
        ],
        temperature: 0.4,
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

    return NextResponse.json({ proposal: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    )
  }
}