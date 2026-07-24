import { NextResponse } from 'next/server'
import { getProposal } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { industry, budget, team, problem } = await request.json()

    if (!industry || !budget || !problem) {
      return NextResponse.json({ error: 'Please provide industry, budget, and problem' }, { status: 400 })
    }

    const proposal = getProposal(problem, industry, budget, team)
    return NextResponse.json({ proposal })
  } catch {
    return NextResponse.json({ error: 'Failed to generate proposal' }, { status: 500 })
  }
}
