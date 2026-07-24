export type ModelLoadState = 'idle' | 'loading' | 'ready' | 'error'

let webLlmEngine: unknown = null
let loadState: ModelLoadState = 'idle'
let loadProgress = ''

const SYSTEM_CONTEXT = `You are Abdul Malik's engineering twin. You know:
- 4+ years experience building production systems
- Projects: MAONI (DRC Gov), ARPTC, Selzara, TravelAgent, GrapeTask
- Skills: React, Next.js, Python, FastAPI, AI, LangChain
- Rates: $15-35/hr or $150-2500 fixed
Answer accurately about his work.`

export function getWebLlmState() {
  return { state: loadState, progress: loadProgress }
}

export async function initWebLlm(
  onProgress?: (text: string) => void
): Promise<boolean> {
  if (loadState === 'ready' && webLlmEngine) return true
  if (loadState === 'loading') return false

  try {
    loadState = 'loading'
    // Dynamic import — only loads if @mlc-ai/web-llm is installed
    const webLlm = await Function('return import("@mlc-ai/web-llm")')() as {
      CreateMLCEngine: (model: string, opts: { initProgressCallback: (p: { text: string }) => void }) => Promise<unknown>
    }
    webLlmEngine = await webLlm.CreateMLCEngine('Llama-3.2-1B-Instruct-q4f16_1-MLC', {
      initProgressCallback: (progress: { text: string }) => {
        loadProgress = progress.text
        onProgress?.(progress.text)
      },
    })
    loadState = 'ready'
    return true
  } catch {
    loadState = 'error'
    return false
  }
}

export async function getWebLlmResponse(userInput: string): Promise<{ content: string } | null> {
  if (!webLlmEngine || loadState !== 'ready') return null

  try {
    const engine = webLlmEngine as {
      chat: {
        completions: {
          create: (opts: {
            messages: { role: string; content: string }[]
            temperature: number
            max_tokens: number
          }) => Promise<{ choices: { message: { content: string } }[] }>
        }
      }
    }

    const response = await engine.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_CONTEXT },
        { role: 'user', content: userInput },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    return { content: response.choices[0].message.content }
  } catch {
    return null
  }
}
