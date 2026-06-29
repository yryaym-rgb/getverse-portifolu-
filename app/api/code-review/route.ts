import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code, language = 'javascript' } = await request.json()
    
    // Validate input
    if (!code || code.trim().length === 0) {
      return NextResponse.json(
        { error: 'No code provided for review' },
        { status: 400 }
      )
    }

    // Validate API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'API key not configured. Please set OPENROUTER_API_KEY in .env.local' },
        { status: 500 }
      )
    }

    // Detect language if not provided
    const detectedLanguage = language || detectLanguage(code)

    // Build system prompt for code review
    const systemPrompt = `You are a senior software engineer conducting a thorough code review. 
Analyze the provided code and return a comprehensive review in valid JSON format.

CODE REVIEW GUIDELINES:
1. Be specific and actionable in your feedback
2. Reference line numbers or sections when possible
3. Explain the "why" behind each suggestion
4. Prioritize issues by severity: Critical > High > Medium > Low
5. Consider: Security, Performance, Readability, Maintainability, Best Practices

RETURN EXACTLY THIS JSON STRUCTURE:
{
  "summary": "Brief overview of the code quality and main issues (1-2 sentences)",
  "score": 0-100 (overall quality score),
  "issues": [
    {
      "severity": "critical|high|medium|low",
      "category": "security|performance|readability|maintainability|bug|best-practice",
      "title": "Short descriptive title",
      "description": "Detailed explanation of the issue",
      "line": "Line number or section reference (optional)",
      "suggestion": "Actionable fix or improvement recommendation"
    }
  ],
  "strengths": ["List of things done well"],
  "improvements": ["List of suggested improvements"],
  "securityScan": {
    "vulnerabilities": ["List of security concerns"],
    "riskLevel": "low|medium|high|critical"
  },
  "performance": {
    "rating": "poor|average|good|excellent",
    "bottlenecks": ["Potential performance issues"]
  }
}

CODE LANGUAGE: ${detectedLanguage}

Be thorough but concise. Focus on issues that actually matter.`

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://getverse.dev',
        'X-Title': 'Abdul Malik Code Reviewer',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Review this ${detectedLanguage} code:\n\n\`\`\`${detectedLanguage}\n${code}\n\`\`\``
          }
        ],
        temperature: 0.3,
        max_tokens: 1200,
        top_p: 0.9
      })
    })

    // Handle API response errors
    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API Error:', response.status, errorData)
      
      // Return fallback data
      return NextResponse.json({
        review: {
          summary: "AI service temporarily unavailable. Please try again later.",
          score: 0,
          issues: [],
          strengths: ["Unable to analyze due to service interruption"],
          improvements: ["Please try again later"],
          securityScan: { vulnerabilities: [], riskLevel: "unknown" },
          performance: { rating: "unknown", bottlenecks: [] }
        }
      })
    }

    const data = await response.json()
    const rawContent = data.choices?.[0]?.message?.content

    if (!rawContent) {
      console.error('No content in response:', data)
      return NextResponse.json({
        review: {
          summary: "Unable to get a response from AI. Please try again.",
          score: 0,
          issues: [],
          strengths: ["No analysis available"],
          improvements: ["Try again with clearer code"],
          securityScan: { vulnerabilities: [], riskLevel: "unknown" },
          performance: { rating: "unknown", bottlenecks: [] }
        }
      })
    }

    // Try to parse JSON from the response
    let reviewData
    try {
      // Extract JSON from the response
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        reviewData = JSON.parse(jsonMatch[0])
      } else {
        // If no JSON found, create a structured response from the text
        reviewData = {
          summary: rawContent.substring(0, 200) + '...',
          score: 75,
          issues: [
            {
              severity: "medium",
              category: "best-practice",
              title: "Review generated from AI",
              description: rawContent,
              suggestion: "See detailed analysis above"
            }
          ],
          strengths: ["Code provided for review"],
          improvements: ["Review AI suggestions carefully"],
          securityScan: { vulnerabilities: [], riskLevel: "low" },
          performance: { rating: "good", bottlenecks: [] }
        }
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      reviewData = {
        summary: "Unable to parse AI response. Here's the raw analysis:",
        score: 70,
        issues: [
          {
            severity: "medium",
            category: "best-practice",
            title: "AI Analysis Available",
            description: rawContent.substring(0, 500),
            suggestion: "Review the full AI response above"
          }
        ],
        strengths: ["Analysis generated successfully"],
        improvements: ["Review the detailed feedback"],
        securityScan: { vulnerabilities: [], riskLevel: "low" },
        performance: { rating: "good", bottlenecks: [] }
      }
    }

    return NextResponse.json({ 
      review: reviewData,
      usage: data.usage || null,
      language: detectedLanguage
    })

  } catch (error) {
    console.error('Code Review API Error:', error)
    
    // Return a graceful error response
    return NextResponse.json({
      review: {
        summary: "An error occurred during code review. Please try again.",
        score: 0,
        issues: [
          {
            severity: "low",
            category: "best-practice",
            title: "Error during analysis",
            description: error instanceof Error ? error.message : "Unknown error occurred",
            suggestion: "Please try again with valid code"
          }
        ],
        strengths: [],
        improvements: ["Try again with valid code"],
        securityScan: { vulnerabilities: [], riskLevel: "unknown" },
        performance: { rating: "unknown", bottlenecks: [] }
      }
    }, { status: 200 })
  }
}

// Helper: Detect programming language from code
function detectLanguage(code: string): string {
  const indicators = {
    python: /^\s*(import|from|def|class|print|if __name__)/m,
    javascript: /^\s*(const|let|var|function|=>|console\.)/m,
    typescript: /^\s*(interface|type|export|import|: string|: number)/m,
    java: /^\s*(public|private|class|extends|implements|@Override)/m,
    cpp: /^\s*(#include|using namespace|int main|std::)/m,
    go: /^\s*(package|func|import|:=|go )/m,
    rust: /^\s*(use |fn |pub |let mut|->)/m,
    sql: /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)/i,
    html: /^\s*(<!DOCTYPE|<html|<head|<body|<div)/m,
    css: /^\s*(\.|#|@media|@keyframes|:root)/m,
    json: /^\s*\{[\s\S]*\}/m,
    yaml: /^\s*---|\w+:/m
  }

  for (const [lang, pattern] of Object.entries(indicators)) {
    if (pattern.test(code)) {
      return lang
    }
  }
  return 'javascript'
}
