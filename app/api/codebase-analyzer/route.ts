import { NextResponse } from 'next/server'
import { getCodeReview } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { code, language } = await request.json()
    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 })
    }
    const analysis = getCodeReview(code, language)
    return NextResponse.json({ analysis })
  } catch {
    return NextResponse.json({ error: 'Failed to analyze codebase' }, { status: 500 })
  }
}
