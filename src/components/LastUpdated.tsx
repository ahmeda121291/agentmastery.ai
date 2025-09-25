export default function LastUpdated({ dateISO }: { dateISO?: string }) {
  const date = dateISO ? new Date(dateISO) : new Date(process.env.NEXT_PUBLIC_BUILD_TIME || Date.now())
  const d = date.toISOString().slice(0, 10)
  return <div className="text-xs text-muted-foreground">Last updated: {d}</div>
}