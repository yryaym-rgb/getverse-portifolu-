import { NextResponse } from 'next/server'
import { getResumeAnalysis } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
    }

    const result = getResumeAnalysis(resumeText)
    return NextResponse.json({ result })
  } catch {
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 })
  }
}
