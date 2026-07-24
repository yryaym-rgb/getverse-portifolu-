/**
 * Local structured responses for API routes — no external AI required.
 */

import { getLocalResponse } from './responses'

export function getDigitalTwinResponse(messages: { role: string; content: string }[]): string {
  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')
  return getLocalResponse(lastUserMessage?.content || '')
}

export function getInterviewAnswer(question: string): string {
  const lowerQ = question.toLowerCase()

  if (lowerQ.includes('cap theorem') || lowerQ.includes('consistency')) {
    return `CAP theorem states that in a distributed system, you can only guarantee two of three properties: Consistency, Availability, and Partition tolerance.

Since network partitions are inevitable, you must choose between consistency and availability during a partition.

In my experience building MAONI for DRC government, I chose strong consistency (CP) because citizen consultation data must be accurate. We used PostgreSQL with synchronous replication and conflict resolution.

For Selzara (457 daily visitors), I chose availability (AP) with eventual consistency for analytics dashboards, using Redis caching and read replicas.

Key trade-offs:
- CP systems: Financial transactions, government data, voting systems
- AP systems: Social feeds, analytics, content delivery

The right choice depends on your business requirements, not technical preference.`
  }

  if (lowerQ.includes('redis') || lowerQ.includes('postgresql')) {
    return `Redis and PostgreSQL serve different purposes:

**PostgreSQL** — My primary database for persistent, relational data. Used on MAONI, ARPTC, Selzara. ACID compliance, complex queries, JSON support.

**Redis** — In-memory cache and session store. I use it for rate limiting, session management, real-time leaderboards, and caching expensive queries.

When to use each:
- PostgreSQL: User data, transactions, reports, anything that must survive restarts
- Redis: Sessions, caching, pub/sub, rate limiting, temporary data

On MAONI, I used PostgreSQL for citizen proposals (must persist) and Redis for session tokens and API rate limiting (speed matters).`
  }

  if (lowerQ.includes('fastapi') || lowerQ.includes('django')) {
    return `I choose FastAPI over Django for most API-heavy projects because:

1. **Async performance** — FastAPI handles concurrent requests natively. On JustFly, this gave us 75% faster API response times.
2. **Type safety** — Pydantic models catch bugs at development time.
3. **Auto documentation** — OpenAPI/Swagger docs generated automatically.
4. **Lightweight** — No ORM overhead when I just need an API layer.

I still use Django when I need:
- Built-in admin panel
- ORM-heavy CRUD applications
- Rapid prototyping with batteries included

For MAONI and Selzara, FastAPI was the right choice. For internal tools with complex admin needs, Django wins.`
  }

  if (lowerQ.includes('docker') || lowerQ.includes('deployment')) {
    return `I use Docker in every production deployment:

**Containerization benefits:**
- Consistent environments from dev to production
- Easy rollbacks (tag and redeploy previous image)
- Isolated services (API, worker, database)

**My deployment pipeline:**
1. Code push to GitHub
2. GitHub Actions builds Docker image
3. Push to registry
4. Deploy to VPS with docker-compose
5. Nginx reverse proxy with SSL
6. Health checks and monitoring

Used this on MAONI (5 production versions), Selzara, and TravelAgent.com.ng. Achieved 99.9% uptime on government platforms.`
  }

  if (lowerQ.includes('security') || lowerQ.includes('government')) {
    return `Government system security requires multiple layers:

**Authentication & Authorization:**
- JWT with short-lived access tokens + refresh tokens
- Role-based access control (RBAC) with principle of least privilege
- Multi-factor authentication for admin accounts

**Data Protection:**
- Encryption at rest (AES-256) and in transit (TLS 1.3)
- Input validation and SQL injection prevention
- XSS and CSRF protection

**Audit & Compliance:**
- Complete audit trail for all actions (who, what, when)
- Immutable logs stored separately from application data
- Regular security assessments

On MAONI for DRC government, I implemented military-grade security with hidden multi-role admin panels, full audit logging, and encrypted citizen data handling.`
  }

  if (lowerQ.includes('ai') || lowerQ.includes('llm')) {
    return `My AI experience spans production integrations across multiple projects:

**MAONI (DRC Government):** Claude API for sentiment analysis of citizen proposals, automated briefing reports for presidential office.

**Selzara:** AI-powered PPC optimization, profit analysis, and inventory forecasting for Amazon sellers.

**BookForge AI:** Content generation and book structuring workflows.

**Tech stack:** Claude API, OpenAI GPT-4, LangChain, RAG pipelines, n8n automation, Vapi AI for voice.

**Key lessons:**
- Always validate AI outputs before showing to users
- Use RAG for domain-specific knowledge instead of fine-tuning
- Cache common AI responses to reduce costs and latency
- Build fallback flows when AI services are unavailable`
  }

  return getLocalResponse(question)
}

export function getLabBlueprint(idea: string) {
  const topic = idea.trim() || 'your application'
  return {
    architecture: `Microservices architecture for "${topic}":\n\n• Frontend: Next.js 14 with TypeScript and Tailwind CSS\n• API Gateway: FastAPI with async endpoints\n• Database: PostgreSQL with Redis caching layer\n• AI Layer: LangChain + Claude API for intelligent features\n• Deployment: Docker containers on VPS with Nginx`,
    techStack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Claude API', 'Tailwind CSS'],
    database: 'PostgreSQL primary store with users, sessions, and core entities. Redis for caching, rate limiting, and real-time data. Supabase for auth if rapid prototyping.',
    apis: ['REST API with OpenAPI docs', 'JWT authentication', 'Rate limiting middleware', 'WebSocket for real-time updates'],
    security: ['JWT + refresh tokens', 'RBAC authorization', 'Input validation', 'Rate limiting', 'HTTPS/TLS', 'Audit logging'],
    cost: '$50-200/month for MVP (VPS + database). Scales to $500-2000/month at 10K+ daily users.',
    timeline: '4-8 weeks for MVP, 12-16 weeks for full production release',
    deployment: 'Docker + docker-compose on VPS, GitHub Actions CI/CD, Nginx reverse proxy, SSL via Let\'s Encrypt',
    scaling: 'Horizontal scaling with load balancer, database read replicas, Redis cluster, CDN for static assets',
    monitoring: 'Prometheus + Grafana for metrics, structured logging, error tracking, uptime monitoring',
    similarProjects: ['Selzara (AI SaaS)', 'MAONI (Government platform)', 'TravelAgent.com.ng (Booking platform)'],
    summary: `Production-ready blueprint for "${topic}" using proven stack from 18+ shipped projects. Focus on security, scalability, and fast iteration.`,
  }
}

export function getSystemDesign(prompt: string) {
  const topic = prompt.trim() || 'the system'
  return {
    architecture: `Layered microservices for ${topic}: Client (Next.js) → API Gateway (FastAPI) → Services (Auth, Core, AI) → Data Layer (PostgreSQL + Redis)`,
    database: `PostgreSQL schema with users, entities, audit_logs tables. Indexes on frequently queried columns. Redis for sessions and cache.`,
    api: `RESTful API with JWT auth. Endpoints: /auth, /users, /resources. Rate limiting at 100 req/min. OpenAPI documentation auto-generated.`,
    deployment: `Docker containers on VPS. GitHub Actions CI/CD. Nginx reverse proxy. Blue-green deployments for zero downtime.`,
    timeline: '6-10 weeks for MVP, 14-20 weeks for production',
    security: 'JWT auth, RBAC, encryption at rest/transit, input validation, OWASP compliance, audit logging',
    cost: '$100-300/month MVP, scaling to $1000+/month at enterprise scale',
    scalability: 'Horizontal pod scaling, database read replicas, CDN, async job queues for heavy processing',
    monitoring: 'Prometheus metrics, Grafana dashboards, structured JSON logging, alerting on error rates',
  }
}

export function getCodeReview(code: string, language = 'javascript') {
  const lines = code.split('\n').length
  const hasErrorHandling = code.includes('try') || code.includes('catch')
  const hasValidation = code.includes('validate') || code.includes('schema')

  return {
    summary: `Reviewed ${lines} lines of ${language} code. Overall structure is ${lines < 50 ? 'concise' : 'moderate'}.`,
    score: hasErrorHandling && hasValidation ? 85 : hasErrorHandling ? 72 : 60,
    issues: [
      ...(!hasErrorHandling
        ? [
            {
              severity: 'medium' as const,
              category: 'best-practice' as const,
              title: 'Missing error handling',
              description: 'Consider adding try/catch blocks for async operations.',
              suggestion: 'Wrap API calls and file operations in try/catch with meaningful error messages.',
            },
          ]
        : []),
      ...(!hasValidation
        ? [
            {
              severity: 'medium' as const,
              category: 'security' as const,
              title: 'Input validation recommended',
              description: 'Validate all external inputs before processing.',
              suggestion: 'Use Zod or Pydantic for schema validation.',
            },
          ]
        : []),
    ],
    strengths: ['Readable code structure', 'Consistent formatting'],
    improvements: ['Add comprehensive error handling', 'Add input validation', 'Add unit tests for critical paths'],
    securityScan: {
      vulnerabilities: hasValidation ? [] : ['Unvalidated input could lead to injection attacks'],
      riskLevel: hasValidation ? ('low' as const) : ('medium' as const),
    },
    performance: {
      rating: lines < 100 ? ('good' as const) : ('average' as const),
      bottlenecks: lines > 200 ? ['Consider breaking into smaller modules'] : [],
    },
  }
}

export function getJobMatch(jobDescription: string) {
  const lower = jobDescription.toLowerCase()
  const skills = ['Python', 'React', 'FastAPI', 'TypeScript', 'Docker', 'PostgreSQL', 'Next.js', 'Node.js']
  const matchedSkills = skills.filter(
    (s) => lower.includes(s.toLowerCase()) || lower.includes(s.split(' ')[0].toLowerCase())
  )
  const matchScore = Math.min(60 + matchedSkills.length * 8 + (lower.includes('ai') ? 10 : 0), 98)

  return {
    match: matchScore,
    skills: matchedSkills.length > 0 ? matchedSkills : ['Python', 'React', 'FastAPI', 'TypeScript'],
    projects: ['MAONI', 'Selzara', 'ARPTC Tower Map', 'JustFly', 'TravelAgent.com.ng'],
    missing: skills.filter((s) => !matchedSkills.includes(s)).slice(0, 3),
    summary: `Strong match (${matchScore}%) — Abdul Malik's experience with government platforms, AI SaaS, and full-stack development aligns well with this role.`,
    experienceMatch: '4+ years with 18+ production platforms shipped across USA, Nigeria, and DRC.',
    cultureFit: 'Experienced remote developer with proven delivery track record and client communication skills.',
    recommendations: [
      'Highlight MAONI government platform experience',
      'Emphasize Selzara AI SaaS metrics (457 daily visitors)',
      'Mention FastAPI performance improvements (75% faster APIs)',
    ],
    matchDetails: { skillsMatch: matchScore, experienceMatch: 90, projectMatch: 85 },
  }
}

export function getResumeAnalysis(resumeText: string) {
  const lower = resumeText.toLowerCase()
  const techKeywords = ['react', 'python', 'javascript', 'typescript', 'node', 'docker', 'aws', 'postgresql', 'ai', 'fastapi']
  const found = techKeywords.filter((k) => lower.includes(k))

  return {
    matchScore: Math.min(50 + found.length * 8, 95),
    skills: {
      matching: found.length > 0 ? found.map((s) => s.charAt(0).toUpperCase() + s.slice(1)) : ['General development'],
      missing: techKeywords.filter((k) => !found.includes(k)).slice(0, 4),
      years: lower.includes('senior') ? 5 : lower.includes('junior') ? 1 : 3,
    },
    experience: {
      years: lower.includes('senior') ? 5 : 3,
      level: lower.includes('senior') ? 'Senior' : lower.includes('lead') ? 'Lead' : 'Mid',
      summary: 'Candidate shows relevant technical background with room for growth in AI and cloud technologies.',
    },
    projects: ['MAONI', 'Selzara', 'ARPTC Tower Map'],
    recommendations: [
      'Add quantifiable metrics to project descriptions',
      'Highlight AI/ML experience if applicable',
      'Include links to live projects and GitHub',
    ],
    summary: `Resume analysis complete. ${found.length} matching tech skills identified. Strong potential for full-stack and AI roles.`,
    detailed: { technical: 75 + found.length * 3, experience: 80, culture: 85, overall: 78 + found.length * 2 },
  }
}

export function getProposal(project: string, industry: string, budget: string, timeline?: string) {
  return {
    title: `${project} — ${industry} Solution Proposal`,
    solution: `End-to-end ${project} platform built with Next.js, FastAPI, and PostgreSQL. Includes user authentication, admin dashboard, and AI-powered features tailored for ${industry}.`,
    architecture: 'Microservices: Next.js frontend → FastAPI API → PostgreSQL + Redis → Docker deployment on VPS',
    timeline: timeline || '8-12 weeks',
    tech: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    cost: budget,
    team: '1 Senior Full-Stack Developer (Abdul Malik) with AI specialization',
    risks: ['Scope creep — mitigated with phased delivery', 'Third-party API dependencies — fallback strategies included'],
    deliverables: ['MVP in 4 weeks', 'Full platform in 8-12 weeks', 'Documentation and deployment guide', '30-day post-launch support'],
    timelineDetails: ['Week 1-2: Architecture and setup', 'Week 3-6: Core features', 'Week 7-8: Testing and deployment', 'Week 9-12: Polish and launch'],
    summary: `Professional proposal for ${project} in ${industry}. Based on proven delivery of MAONI, Selzara, and TravelAgent.com.ng. Budget: ${budget}.`,
  }
}
