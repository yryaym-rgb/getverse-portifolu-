import { NextResponse } from 'next/server'
import { resumeData } from '../../lib/resumeData'

export async function GET() {
  return NextResponse.json(resumeData, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="abdul-malik-lakho-resume.json"',
    },
  })
}
