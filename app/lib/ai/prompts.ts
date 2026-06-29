export const prompts = {
  lab: (idea: string) => `You are a senior software architect and technical consultant. You help founders and product owners turn ideas into complete technical blueprints.

For the idea: "${idea}"

Generate a comprehensive technical blueprint with:
1. Architecture with technology choices
2. Tech Stack (specific technologies)
3. Database Schema (key tables and relationships)
4. APIs (key endpoints and authentication)
5. Security considerations
6. Cost Estimate (monthly/hosting)
7. Timeline (weeks)
8. Deployment Strategy
9. Scaling Strategy
10. Monitoring

Return ONLY valid JSON with fields: architecture, techStack, database, apis, security, cost, timeline, deployment, scaling, monitoring, similarProjects, summary`,

  architect: (idea: string) => `You are a senior system architect. Design a complete system architecture for: "${idea}"

Return JSON with: architecture, components, database, apis, security, cost, timeline.`,

  review: (architecture: string) => `You are a senior software architect. Review this architecture and provide feedback:

${architecture}

Provide: scalability, performance, security, maintainability, cost optimization, failure points, and improvements.`,

  cto: (description: string) => `You are a CTO advisor. Provide strategic advice for: "${description}"

Include: technology recommendations, team structure, sprint roadmap, infrastructure, budget, risks, timeline.`,

  cost: (users: number, architecture: string) => `Calculate infrastructure costs for:
- Users: ${users}
- Architecture: ${architecture}

Provide: monthly cost, annual cost, breakdown, scaling recommendations, optimization tips.`,

  proposal: (industry: string, budget: string, team: string, problem: string) => `Generate a professional proposal for:
- Industry: ${industry}
- Budget: ${budget}
- Team: ${team}
- Problem: ${problem}

Include: executive summary, solution, technical approach, timeline, cost breakdown, why Abdul Malik is the right choice.`,

  matcher: (idea: string) => `Match "${idea}" with portfolio projects.

Return JSON with matches array (project, score, reason) and recommendation.`,

  interview: (question: string) => `Answer this system design question: "${question}"

Provide: requirements, core components, database, API design, scalability, security, trade-offs, real examples from Abdul's projects.`
}