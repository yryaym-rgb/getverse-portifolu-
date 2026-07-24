import { NextResponse } from 'next/server'
import { getDigitalTwinResponse } from '../../lib/localApiResponses'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const message = getDigitalTwinResponse(messages || [])
    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
