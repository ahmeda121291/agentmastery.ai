export function toQuery(values: Record<string, any>): string {
  const params = new URLSearchParams()
  Object.entries(values).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.set(k, String(v))
  })
  return params.toString()
}

export function fromQuery<T = any>(search: string): Partial<T> {
  const q = new URLSearchParams(search)
  const out: any = {}
  q.forEach((v, k) => (out[k] = isFinite(Number(v)) ? Number(v) : v))
  return out
}

export function downloadCSV(filename: string, rows: Record<string, string | number>[]) {
  const header = Object.keys(rows[0] || {})
  const body = rows
    .map((r) => header.map((h) => JSON.stringify(r[h] ?? '')).join(','))
    .join('\n')
  const csv = [header.join(','), body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text)
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  return Promise.resolve()
}