import { NextResponse } from 'next/server'
import { getProposal } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { project, industry, budget, timeline } = await request.json()

    if (!project || !industry || !budget) {
      return NextResponse.json({ error: 'Project, industry, and budget are required' }, { status: 400 })
    }

    const proposal = getProposal(project, industry, budget, timeline)
    return NextResponse.json({ proposal })
  } catch {
    return NextResponse.json({ error: 'Failed to generate proposal' }, { status: 500 })
  }
}
