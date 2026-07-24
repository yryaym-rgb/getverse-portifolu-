import { NextResponse } from 'next/server'
import { getLocalResponse } from '../lib/responses'

export async function POST(request: Request) {
  try {
    const { idea } = await request.json()

    if (!idea || idea.trim().length === 0) {
      return NextResponse.json({ error: 'Please describe your idea' }, { status: 400 })
    }

    const lower = idea.toLowerCase()
    const projects = [
      { project: 'MAONI', score: lower.includes('government') || lower.includes('civic') ? 95 : 60, reason: 'Government/civic consultation platform' },
      { project: 'Selzara', score: lower.includes('amazon') || lower.includes('saas') || lower.includes('seller') ? 95 : 55, reason: 'AI SaaS for e-commerce sellers' },
      { project: 'TravelAgent.com.ng', score: lower.includes('travel') || lower.includes('booking') ? 90 : 50, reason: 'Travel booking platform' },
      { project: 'GrapeTask.co', score: lower.includes('freelance') || lower.includes('marketplace') ? 90 : 45, reason: 'Freelance marketplace' },
      { project: 'JustFly', score: lower.includes('flight') || lower.includes('scraping') ? 85 : 40, reason: 'Real-time flight data scraping' },
    ]

    const matches = projects.sort((a, b) => b.score - a.score).slice(0, 3)
    const recommendation = getLocalResponse(idea)

    return NextResponse.json({ matches, recommendation })
  } catch {
    return NextResponse.json({ error: 'Failed to match project' }, { status: 500 })
  }
}
