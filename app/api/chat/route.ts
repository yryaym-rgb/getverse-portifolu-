import { NextResponse } from 'next/server'
import { getLocalResponse } from '../../lib/responses'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const lastMessage = messages?.[messages.length - 1]
    const message = getLocalResponse(lastMessage?.content || '')
    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
