'use client'
export default function FormRow({
  label,
  suffix,
  children,
  hint
}: {
  label: string
  suffix?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="block">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          {suffix && (
            <span className="text-xs text-muted-foreground">{suffix}</span>
          )}
        </div>
        {children}
      </label>
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}