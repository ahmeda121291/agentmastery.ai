export default function BestForBadges({
  items
}: {
  items: { label: string; icon?: string }[]
}) {
  if (!items?.length) return null

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {items.map((b, i) => (
        <span
          key={i}
          className="text-xs rounded-full px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium"
        >
          {b.icon && <span className="mr-1">{b.icon}</span>}
          {b.label}
        </span>
      ))}
    </div>
  )
}