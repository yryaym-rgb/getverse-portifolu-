import { NextResponse } from 'next/server'
import { getTwinResponse } from '../../lib/ai/twin'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const lastUser = [...(messages || [])].reverse().find((m: { role: string }) => m.role === 'user')
    const twin = getTwinResponse(lastUser?.content || '')
    return NextResponse.json({ message: twin.content, source: twin.source, mode: twin.mode })
  } catch {
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
