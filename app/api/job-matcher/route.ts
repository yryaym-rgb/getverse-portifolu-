import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json()
    
    if (!jobDescription || jobDescription.trim().length === 0) {
      return NextResponse.json(
        { error: 'Job description is required' },
        { status: 400 }
      )
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    const profileData = {
      name: 'Abdul Malik Lakho',
      title: 'Full Stack AI Developer',
      experience: '4+ years',
      skills: ['Python', 'React', 'FastAPI', 'TypeScript', 'Docker', 'PostgreSQL', 'Claude API', 'AWS', 'Next.js', 'Django', 'Node.js'],
      projects: ['MAONI', 'ARPTC Tower Map', 'Selzara', 'AwazPK', 'JustFly', 'SolidBridge', 'MediCare Pro'],
      achievements: ['18+ production platforms', '5 countries', '457 daily visitors', '75% faster API response', 'Military-grade security']
    }

    const systemPrompt = `You are an AI job matcher. Compare the job description against Abdul Malik's profile and provide a detailed match analysis.

PROFILE:
${JSON.stringify(profileData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Return a JSON with:
1. match: 0-100
2. skills: string[] (matching skills)
3. projects: string[] (relevant projects)
4. missing: string[] (skills to develop)
5. summary: string
6. experienceMatch: string
7. cultureFit: string
8. recommendations: string[]
9. matchDetails: { skillsMatch: number, experienceMatch: number, projectMatch: number }

Be honest and realistic. Only include skills and projects that exist in the profile.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Job Matcher',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: jobDescription }
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
      { error: 'Failed to match job' },
      { status: 500 }
    )
  }
}