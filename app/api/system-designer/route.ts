import { NextResponse } from 'next/server'
import { getSystemDesign } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'System description is required' }, { status: 400 })
    }

    const design = getSystemDesign(prompt)
    return NextResponse.json({ design })
  } catch {
    return NextResponse.json({ error: 'Failed to generate system design' }, { status: 500 })
  }
}
