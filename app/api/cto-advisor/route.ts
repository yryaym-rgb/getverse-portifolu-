import { NextResponse } from 'next/server'
import { getLocalResponse } from '../../lib/responses'

export async function POST(request: Request) {
  try {
    const { question, context } = await request.json()
    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }
    const answer = getLocalResponse(`${context || ''} ${question}`)
    return NextResponse.json({ answer })
  } catch {
    return NextResponse.json({ error: 'Failed to generate advice' }, { status: 500 })
  }
}
