import { NextResponse } from 'next/server'
import { getJobMatch } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json()
    if (!jobDescription) {
      return NextResponse.json({ error: 'Job description is required' }, { status: 400 })
    }
    const result = getJobMatch(jobDescription)
    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ error: 'Failed to match job' }, { status: 500 })
  }
}
