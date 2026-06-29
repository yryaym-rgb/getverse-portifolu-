import { NextResponse } from 'next/server'

// Define the fallback function outside
function generateFallbackProposal(
  project: string, 
  industry: string, 
  budget: string, 
  timeline: string
) {
  const techOptions = ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Claude API', 'Docker', 'Nginx', 'AWS', 'TypeScript']
  const shuffled = techOptions.sort(() => 0.5 - Math.random())
  const selectedTech = shuffled.slice(0, 6)

  return {
    title: `${project} — Complete Solution Proposal`,
    solution: `A full-stack platform with AI-powered capabilities, real-time analytics, and secure user management. Designed for ${industry} requirements, this solution will handle high traffic with auto-scaling infrastructure and enterprise-grade security.`,
    architecture: `Next.js Frontend → FastAPI Backend (Python) → PostgreSQL Database → Redis Cache → Claude API for AI → Docker + Nginx Deployment → AWS Cloud Infrastructure with auto-scaling and load balancing.`,
    timeline: timeline || '8-12 weeks',
    tech: selectedTech,
    cost: budget || '$15,000 - $25,000',
    team: '1 Full Stack Developer (Abdul Malik) + QA Specialist + Project Manager (as needed)',
    risks: [
      'AI model accuracy requires ongoing tuning and validation',
      'Third-party API rate limits may impact performance during peak usage',
      'Data migration from existing systems could present challenges',
      'Integration with existing infrastructure requires careful planning'
    ],
    deliverables: [
      'Complete full-stack platform with AI integration',
      'Admin dashboard with analytics and reporting',
      'REST API with comprehensive documentation',
      'Database schema design and migrations',
      'Docker containerization and deployment scripts',
      'CI/CD pipeline with automated testing',
      '30-day post-launch support and maintenance'
    ],
    timelineDetails: [
      'Week 1-2: Requirements gathering, research, and architecture design',
      'Week 3-6: Core development, frontend and backend implementation',
      'Week 7-8: AI integration, testing, and quality assurance',
      'Week 9-10: Deployment, security audit, and performance optimization'
    ],
    summary: `This proposal outlines a comprehensive ${project} solution tailored to ${industry} requirements. With a budget of ${budget} and timeline of ${timeline || '8-12 weeks'}, the project will deliver a production-ready platform with AI capabilities, security, and scalability.`
  }
}

export async function POST(request: Request) {
  try {
    const { project, industry, budget, timeline } = await request.json()
    
    // Validate input
    if (!project || project.trim().length === 0) {
      return NextResponse.json(
        { error: 'Project description is required' },
        { status: 400 }
      )
    }

    if (!industry) {
      return NextResponse.json(
        { error: 'Industry selection is required' },
        { status: 400 }
      )
    }

    if (!budget) {
      return NextResponse.json(
        { error: 'Budget selection is required' },
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

    // Industry mapping for better context
    const industryMap: Record<string, string> = {
      'government': 'Government / Public Sector',
      'ai': 'AI / Machine Learning',
      'saas': 'SaaS / Software as a Service',
      'fintech': 'Fintech / Financial Services',
      'healthcare': 'Healthcare / Medical',
      'telecom': 'Telecommunications',
      'education': 'Education / E-Learning',
      'ecommerce': 'E-Commerce / Retail'
    }

    const industryLabel = industryMap[industry] || industry

    // Build system prompt
    const systemPrompt = `You are a senior solutions architect and proposal writer with expertise in software development, AI integration, and enterprise systems.

ABOUT ABDUL MALIK (THE PROPOSAL PROVIDER):
- Full Stack AI Developer with 4+ years experience
- Built MAONI - Presidential civic consultation platform for DRC
- Built ARPTC Tower Map - National telecom infrastructure (3,500+ towers)
- Founder of Selzara - AI SaaS for Amazon sellers (457 daily visitors)
- Built AwazPK - Multi-lingual civic voice platform (5 languages)
- Built JustFly - Real-time flight scraper (12 airlines, 75% faster)
- 18+ production platforms across 5 countries
- Tech: React, Next.js, Python, FastAPI, Django, Node.js, Supabase, PostgreSQL, Claude API, OpenAI, LangChain, Docker, AWS

PROPOSAL GENERATION GUIDELINES:
1. Be specific and actionable
2. Provide realistic timelines and cost estimates
3. Reference similar projects when relevant
4. Include detailed architecture descriptions
5. Address potential risks honestly
6. Highlight the value proposition

RETURN EXACTLY THIS JSON STRUCTURE:
{
  "title": "Project Name — Complete Solution Proposal",
  "solution": "Overview of the solution (2-3 sentences)",
  "architecture": "Detailed technical architecture description",
  "timeline": "Estimated timeline in weeks with phases",
  "tech": ["Technology 1", "Technology 2", "..."],
  "cost": "Cost range or estimate",
  "team": "Team composition recommendation",
  "risks": ["Risk 1", "Risk 2", "..."],
  "deliverables": ["Deliverable 1", "Deliverable 2", "..."],
  "timelineDetails": ["Week 1-2: Phase 1", "Week 3-4: Phase 2", "..."],
  "summary": "Executive summary of the proposal"
}

BASE THE PROPOSAL ON ABDUL MALIK'S ACTUAL EXPERIENCE AND CAPABILITIES. DO NOT OVERPROMISE. BE REALISTIC.`

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Abdul Malik Proposal Generator',
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
            content: `Create a detailed project proposal with the following details:

PROJECT: ${project}
INDUSTRY: ${industryLabel}
BUDGET: ${budget}
${timeline ? `TIMELINE: ${timeline}` : 'TIMELINE: Not specified (use recommended timeline)'}

Use Abdul Malik's experience and capabilities as the foundation for this proposal. Be specific, realistic, and actionable.`
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
      
      // Return a fallback proposal
      return NextResponse.json({
        proposal: generateFallbackProposal(project, industryLabel, budget, timeline)
      })
    }

    const data = await response.json()
    const rawContent = data.choices?.[0]?.message?.content

    if (!rawContent) {
      console.error('No content in response:', data)
      return NextResponse.json({
        proposal: generateFallbackProposal(project, industryLabel, budget, timeline)
      })
    }

    // Try to parse JSON from the response
    let proposalData
    try {
      // Extract JSON from the response
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        proposalData = JSON.parse(jsonMatch[0])
      } else {
        // If no JSON found, use fallback
        proposalData = generateFallbackProposal(project, industryLabel, budget, timeline)
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      proposalData = generateFallbackProposal(project, industryLabel, budget, timeline)
    }

    return NextResponse.json({ 
      proposal: proposalData,
      usage: data.usage || null
    })

  } catch (error) {
    console.error('Proposal Generator API Error:', error)
    
    // Return a fallback proposal with safe fallback values
    const fallback = generateFallbackProposal(
      'Your Project',
      'General',
      '$10,000 - $25,000',
      '8-12 weeks'
    )
    
    return NextResponse.json({
      proposal: fallback,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 }) // Return 200 to keep UI working
  }
}
