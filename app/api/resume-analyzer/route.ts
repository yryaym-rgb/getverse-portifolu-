import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json()
    
    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are an AI resume analyzer. Analyze the following resume and provide a detailed evaluation.

Resume:
${resumeText}

Return a JSON with:
1. matchScore: 0-100
2. skills: { matching: string[], missing: string[], years: number }
3. experience: { years: number, level: "Junior"|"Mid"|"Senior"|"Lead", summary: string }
4. projects: string[] (relevant projects from portfolio)
5. recommendations: string[]
6. summary: string
7. detailed: { technical: number, experience: number, culture: number, overall: number }

Be honest and realistic. Only recommend skills that are actually relevant.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Resume Analyzer',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: resumeText }
        ],
        temperature: 0.3,
        max_tokens: 800
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

    return NextResponse.json({ result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}