import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    
    if (!code || code.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide code to analyze' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior software engineer. Analyze the provided code and provide a comprehensive report.

Code:
${code}

Provide:
1. Code quality score (0-100)
2. Technical debt assessment
3. Security issues found
4. Suggested refactors
5. Architecture diagram (text-based)
6. Performance bottlenecks
7. Overall recommendations`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Codebase Analyzer',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: code }
        ],
        temperature: 0.4,
        max_tokens: 1500
      })
    })

    const data = await response.json()
    const analysis = data.choices?.[0]?.message?.content || 'Unable to analyze code. Please try again.'

    return NextResponse.json({ analysis })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze code' },
      { status: 500 }
    )
  }
}