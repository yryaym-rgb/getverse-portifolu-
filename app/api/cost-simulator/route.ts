import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { users, architecture } = await request.json()

    if (!users || !architecture) {
      return NextResponse.json({ error: 'Please provide users and architecture' }, { status: 400 })
    }

    const userCount = parseInt(users, 10) || 1000
    const monthly = Math.max(50, Math.round(userCount * 0.05))

    return NextResponse.json({
      monthlyCost: `$${monthly}/month`,
      annualCost: `$${monthly * 12}/year`,
      breakdown: {
        compute: `$${Math.round(monthly * 0.4)}`,
        storage: `$${Math.round(monthly * 0.15)}`,
        database: `$${Math.round(monthly * 0.25)}`,
        cdn: `$${Math.round(monthly * 0.1)}`,
        monitoring: `$${Math.round(monthly * 0.1)}`,
      },
      recommendations: [
        'Use reserved instances for 30-40% savings at scale',
        'Add Redis caching to reduce database load',
        'CDN for static assets to lower bandwidth costs',
      ],
      architecture,
      users: userCount,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to calculate costs' }, { status: 500 })
  }
}
