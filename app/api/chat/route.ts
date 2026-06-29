import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    
    // Validate API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'API key not configured. Please set OPENROUTER_API_KEY in .env.local' },
        { status: 500 }
      )
    }

    // Get the last user message for context
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.content || ''

    // Build system prompt
    const systemPrompt = `You are Abdul Malik's AI Assistant. You help people understand his skills, experience, and how he can help with their projects.

ABOUT ABDUL MALIK:
- Full Stack AI Developer with 4+ years experience
- Built MAONI - Presidential civic consultation platform for DRC
- Built ARPTC Tower Map - National telecom infrastructure (3,500+ towers)
- Founder of Selzara - AI SaaS for Amazon sellers (457 daily visitors, $0 ad spend)
- Built AwazPK - Multi-lingual civic voice platform (5 languages)
- Built JustFly - Real-time flight scraper (12 airlines, 75% faster)
- Built SolidBridge - AI-Enhanced Investment Platform
- Built MediCare Pro - Healthcare management platform
- Built Archive Management System & Police Station System for DRC government
- 18+ production platforms across 5 countries (DRC, USA, Germany, Nigeria, Pakistan)

TECH STACK:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Bootstrap
- Backend: Python, FastAPI, Django, Node.js, Flask
- Databases: PostgreSQL, Supabase, MySQL, MongoDB
- AI: Claude API, OpenAI API, LangChain, RAG pipelines, n8n, Make.com, Zapier
- DevOps: Docker, Nginx, AWS S3, Cloudflare, Git/GitHub, CI/CD
- Mobile: Flutter, Electron

KEY ACHIEVEMENTS:
- Built presidential consultation platform with military-grade security
- National telecom infrastructure map tracking 3,500+ towers
- SaaS platform with 457 daily organic visitors, $0 ad spend
- Reduced API response time from 2+ minutes to 30-45 seconds (75% faster)
- Delivered 18+ production platforms on time, every time

AVAILABILITY:
- Location: Sukkur, Sindh, Pakistan
- Timezone: GMT+5
- Available for: Full-time, Contract, Remote, On-site
- Response time: Within 24 hours
- Email: lakho0543@gmail.com
- Phone: +92 328 672 5204

INSTRUCTIONS:
1. Be helpful, professional, and concise
2. Reference specific projects and achievements when relevant
3. Provide clear, actionable answers
4. If you don't know something, say "I'll connect you with Abdul directly"
5. Keep responses under 300 words unless more detail is requested
6. Always be positive and solution-oriented
7. Never make up information about Abdul's experience or skills`

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Abdul Malik Portfolio AI Chat',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages
        ],
        temperature: 0.6,
        max_tokens: 500,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.3
      })
    })

    // Handle API response errors
    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API Error:', response.status, errorData)
      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Extract the response message
    const assistantMessage = data.choices?.[0]?.message?.content

    if (!assistantMessage) {
      console.error('No message in response:', data)
      return NextResponse.json(
        { error: 'No response from AI service' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: assistantMessage,
      usage: data.usage || null // Token usage for tracking
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
