import { NextResponse } from 'next/server'
import { getInterviewAnswer } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { question } = await request.json()
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }
    const answer = getInterviewAnswer(question)
    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json({ error: 'Failed to generate answer' }, { status: 500 })
  }
}
