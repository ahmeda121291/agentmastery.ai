export const clamp = (n: number, min = 0, max = Number.MAX_SAFE_INTEGER) =>
  Math.min(Math.max(n ?? 0, min), max)

export const pct = (x?: number) =>
  Number.isFinite(x!) ? `${(x! * 100).toFixed(1)}%` : '—'

export const money = (x?: number, currency = 'USD', locale = 'en-US') =>
  Number.isFinite(x!)
    ? new Intl.NumberFormat(locale, { style: 'currency', currency }).format(x!)
    : '—'

export function parsePercent(input?: number | string) {
  const n = typeof input === 'string' ? Number(input) : input
  if (!Number.isFinite(n!)) return 0
  return clamp(n!, 0, 100) / 100
}

export function parseNumber(input?: number | string) {
  const n = typeof input === 'string' ? Number(input) : input
  return clamp(n ?? 0, 0)
}

export const formatNumber = (n: number) => {
  return new Intl.NumberFormat('en-US').format(n)
}

export const formatCompact = (n: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(n)
}