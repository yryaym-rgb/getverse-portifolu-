import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json()
    
    if (!code || code.trim().length === 0) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a senior software engineer. Review the following code and provide a detailed report.

Code (${language || 'javascript'}):
${code}

Return a JSON with:
1. summary: string (brief overview)
2. score: number (0-100)
3. issues: array of { severity: "critical"|"high"|"medium"|"low", category: "security"|"performance"|"readability"|"maintainability"|"bug"|"best-practice", title: string, description: string, line: string (optional), suggestion: string }
4. strengths: string[]
5. improvements: string[]
6. securityScan: { vulnerabilities: string[], riskLevel: "low"|"medium"|"high"|"critical" }
7. performance: { rating: "poor"|"average"|"good"|"excellent", bottlenecks: string[] }

Be thorough but concise. Focus on issues that actually matter.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Code Reviewer',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: code }
        ],
        temperature: 0.3,
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

    return NextResponse.json({ review: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to review code' },
      { status: 500 }
    )
  }
}