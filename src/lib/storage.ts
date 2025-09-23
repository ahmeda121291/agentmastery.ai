export function loadRecentIds(cat: string, max = 100): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(`quiz_recent_${cat}`)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveRecentIds(cat: string, ids: string[], cap = 100) {
  if (typeof window === 'undefined') return
  try {
    const pruned = Array.from(new Set(ids)).slice(-cap)
    localStorage.setItem(`quiz_recent_${cat}`, JSON.stringify(pruned))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function clearRecentIds(cat: string) {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(`quiz_recent_${cat}`)
  } catch {
    // Silently fail
  }
}