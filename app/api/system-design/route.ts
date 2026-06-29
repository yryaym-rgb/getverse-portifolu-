import { NextResponse } from 'next/server'

// Define the fallback function FIRST (before it's used)
function generateFallbackDesign(prompt: string) {
  return {
    architecture: `Next.js Frontend → FastAPI Backend → PostgreSQL Database → Redis Cache → Nginx Load Balancer → AWS Infrastructure with auto-scaling and multi-region support for high availability.`,
    database: `Users (UUID, email, name, role, created_at, last_login), Projects (UUID, user_id, title, status, created_at, updated_at), Analytics (UUID, project_id, metric, value, timestamp, region) with proper indexing on foreign keys and frequently queried fields.`,
    api: `REST API with JWT authentication, rate limiting (100 req/min per user), OpenAPI documentation, role-based access control, and request validation using Pydantic models.`,
    deployment: `Docker containers → Nginx reverse proxy → AWS ECS (Elastic Container Service) → Cloudflare CDN + SSL → GitHub Actions CI/CD with automated testing and deployment.`,
    timeline: '2 weeks research → 4 weeks development → 2 weeks testing → 2 weeks deployment → Ongoing maintenance and monitoring.',
    security: `JWT with refresh tokens (expiry: 15min/7 days), bcrypt encryption, comprehensive audit logging, rate limiting, SQL injection prevention (parameterized queries), CORS configuration, and regular security audits.`,
    cost: 'Development: $15,000-$25,000 | Monthly hosting: ~$300-500 (AWS) | Annual maintenance: ~$2,000 | Monitoring and logging: ~$100/month.',
    scalability: `Horizontal scaling with load balancer, database read replicas, Redis caching, CDN for static assets, and auto-scaling groups based on CPU/memory metrics. Designed to handle 10,000+ concurrent users.`,
    monitoring: `Prometheus + Grafana for metrics, ELK stack for logging, Sentry for error tracking, and AWS CloudWatch for infrastructure monitoring. Alerts configured for critical thresholds.`
  }
}

export async function POST(request: Request) {
  // Declare prompt outside try/catch so it's accessible in catch block
  let prompt = ''
  
  try {
    const body = await request.json()
    prompt = body.prompt || ''
    
    // Validate input
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'System description is required' },
        { status: 400 }
      )
    }

    // Validate API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'API key not configured. Please set OPENROUTER_API_KEY in .env.local' },
        { status: 500 }
      )
    }

    // Build system prompt
    const systemPrompt = `You are a senior system architect with expertise in designing large-scale, distributed systems. You think like a principal engineer at a FAANG company.

YOUR EXPERTISE:
- Building scalable, reliable systems
- Microservices and distributed architecture
- Database design and optimization
- API design and security
- Cloud infrastructure and deployment
- AI integration and automation

ABOUT THE ARCHITECT (ABDUL MALIK):
- Full Stack AI Developer with 4+ years experience
- Built national-scale platforms for governments
- Experience with: React, Next.js, Python, FastAPI, Django, Node.js, PostgreSQL, Supabase, Claude API, OpenAI, LangChain, Docker, AWS
- Built systems handling 3,500+ nodes and millions of users

SYSTEM DESIGN GUIDELINES:
1. Think about scalability from day one
2. Consider security as a primary concern
3. Design for failure (resilience)
4. Keep it simple (but not too simple)
5. Use appropriate technologies for the problem
6. Consider cost and maintenance
7. Design for observability and monitoring

RETURN EXACTLY THIS JSON STRUCTURE:
{
  "architecture": "High-level architecture description with technology choices",
  "database": "Database schema design with tables and relationships",
  "api": "API design with endpoints and authentication",
  "deployment": "Deployment strategy with infrastructure",
  "timeline": "Estimated timeline in weeks",
  "security": "Security considerations and implementation",
  "cost": "Estimated cost breakdown",
  "scalability": "How the system scales",
  "monitoring": "Monitoring and observability strategy"
}

Be specific, practical, and actionable. Use Abdul Malik's actual tech stack where appropriate.`

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Abdul Malik System Designer',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Design a complete system architecture for the following:\n\n${prompt}\n\nProvide a detailed, production-ready system design.`
          }
        ],
        temperature: 0.5,
        max_tokens: 1200,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.3
      })
    })

    // Handle API response errors
    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API Error:', response.status, errorData)
      
      // Return a fallback design
      return NextResponse.json({
        design: generateFallbackDesign(prompt)
      })
    }

    const data = await response.json()
    const rawContent = data.choices?.[0]?.message?.content

    if (!rawContent) {
      console.error('No content in response:', data)
      return NextResponse.json({
        design: generateFallbackDesign(prompt)
      })
    }

    // Try to parse JSON from the response
    let designData
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        designData = JSON.parse(jsonMatch[0])
      } else {
        designData = generateFallbackDesign(prompt)
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      designData = generateFallbackDesign(prompt)
    }

    // Ensure all required fields exist
    const requiredFields = ['architecture', 'database', 'api', 'deployment', 'timeline', 'security', 'cost', 'scalability', 'monitoring']
    for (const field of requiredFields) {
      if (!designData[field]) {
        designData[field] = `Design for ${field} not specified. Please consult with the architect directly.`
      }
    }

    return NextResponse.json({ 
      design: designData,
      usage: data.usage || null
    })

  } catch (error) {
    console.error('System Design API Error:', error)
    
    // Use the prompt variable (which is now in scope)
    const safePrompt = prompt || 'a system'
    const fallback = generateFallbackDesign(safePrompt)
    
    return NextResponse.json({
      design: fallback,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 })
  }
}
