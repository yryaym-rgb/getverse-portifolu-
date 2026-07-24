import { NextResponse } from 'next/server'
import { getSystemDesign } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { architecture, description } = await request.json()
    const design = getSystemDesign(description || architecture || 'system')
    return NextResponse.json({ review: design, score: 85 })
  } catch {
    return NextResponse.json({ error: 'Failed to review architecture' }, { status: 500 })
  }
}
