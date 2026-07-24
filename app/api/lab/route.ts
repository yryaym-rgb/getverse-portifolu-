import { NextResponse } from 'next/server'
import { getLabBlueprint } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { idea } = await request.json()

    if (!idea || idea.trim().length === 0) {
      return NextResponse.json({ error: 'Please describe your idea' }, { status: 400 })
    }

    const result = getLabBlueprint(idea)
    return NextResponse.json({ result, confidence: 0.92 })
  } catch {
    return NextResponse.json({ error: 'Failed to generate blueprint. Please try again.' }, { status: 500 })
  }
}
