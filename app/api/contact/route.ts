import { NextRequest, NextResponse } from 'next/server'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    }

    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'lakho0543@gmail.com'

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>',
          to: [contactEmail],
          reply_to: payload.email,
          subject: `[getverse.dev] ${payload.subject} — ${payload.name}`,
          text: `From: ${payload.name} <${payload.email}>\nSubject: ${payload.subject}\n\n${payload.message}`,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return NextResponse.json({ error: 'Failed to send message. Please email directly.' }, { status: 502 })
      }

      return NextResponse.json({ success: true, method: 'email' })
    }

    // No email provider configured — return mailto fallback
    const mailtoSubject = encodeURIComponent(`[Portfolio] ${payload.subject}`)
    const mailtoBody = encodeURIComponent(
      `Hi Abdul,\n\n${payload.message}\n\n— ${payload.name}\n${payload.email}`
    )
    const mailto = `mailto:lakho0543@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`

    console.log('[Contact form submission]', JSON.stringify(payload))

    return NextResponse.json({
      success: true,
      method: 'mailto',
      mailto,
      message: 'Email service not configured. Opening your email client…',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
