/**
 * Simulates a typing effect for local chat responses.
 */

export function simulateTyping(
  text: string,
  onUpdate: (partial: string) => void,
  onComplete: () => void,
  charDelayMs = 20
): () => void {
  let index = 0
  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval)
      onComplete()
      return
    }
    index++
    onUpdate(text.slice(0, index))
  }, charDelayMs)

  return () => clearInterval(interval)
}
