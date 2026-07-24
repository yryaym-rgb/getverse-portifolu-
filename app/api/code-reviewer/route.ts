import { NextResponse } from 'next/server'
import { getCodeReview } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json()

    if (!code || code.trim().length === 0) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }

    const review = getCodeReview(code, language)
    return NextResponse.json({ review })
  } catch {
    return NextResponse.json({ error: 'Failed to review code' }, { status: 500 })
  }
}
