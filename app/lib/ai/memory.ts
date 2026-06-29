import { cookies } from 'next/headers'

export interface SessionMemory {
  userId: string
  lastVisit: string
  previousConversations: Array<{
    topic: string
    timestamp: string
  }>
  preferences: {
    role?: 'recruiter' | 'founder' | 'cto' | 'engineer'
    interests: string[]
  }
}

export class AIMemory {
  private sessionId: string

  constructor(sessionId?: string) {
    this.sessionId = sessionId || this.generateSessionId()
  }

  private generateSessionId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
  }

  async getMemory(): Promise<SessionMemory | null> {
    // In production, this would fetch from a database or cache
    // For now, use cookies
    const cookieStore = cookies()
    const memoryData = cookieStore.get('ai_memory')?.value
    if (memoryData) {
      try {
        return JSON.parse(memoryData)
      } catch {
        return null
      }
    }
    return null
  }

  async saveMemory(memory: Partial<SessionMemory>) {
    // In production, save to database
    const current = await this.getMemory()
    const updated = { ...current, ...memory, userId: this.sessionId }
    // Set cookie
    cookies().set('ai_memory', JSON.stringify(updated), { maxAge: 30 * 24 * 60 * 60 })
  }

  async updateContext(conversation: { topic: string; summary: string }) {
    const memory = await this.getMemory()
    if (!memory) return
    
    const conversations = memory.previousConversations || []
    conversations.push({
      topic: conversation.topic,
      timestamp: new Date().toISOString()
    })
    
    await this.saveMemory({
      previousConversations: conversations.slice(-10) // Keep last 10
    })
  }
}