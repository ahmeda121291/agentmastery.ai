export default function CompareTable({
  toolA,
  toolB,
  features
}: {
  toolA: { name: string; features?: string[] };
  toolB: { name: string; features?: string[] };
  features: string[]
}) {
  const aSet = new Set((toolA.features || []).map(f => f.toLowerCase()))
  const bSet = new Set((toolB.features || []).map(f => f.toLowerCase()))

  return (
    <div className="overflow-auto rounded-lg border mt-6">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-3 font-medium">Feature</th>
            <th className="text-center p-3 font-medium">{toolA.name}</th>
            <th className="text-center p-3 font-medium">{toolB.name}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => {
            const featureLower = f.toLowerCase()
            const hasA = aSet.has(featureLower) || toolA.features?.some(af =>
              af.toLowerCase().includes(featureLower) || featureLower.includes(af.toLowerCase())
            )
            const hasB = bSet.has(featureLower) || toolB.features?.some(bf =>
              bf.toLowerCase().includes(featureLower) || featureLower.includes(bf.toLowerCase())
            )

            return (
              <tr key={i} className="border-t hover:bg-muted/20 transition-colors">
                <td className="p-3">{f}</td>
                <td className="text-center p-3">
                  {hasA ? (
                    <span className="text-emerald-600 font-semibold">✓</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="text-center p-3">
                  {hasB ? (
                    <span className="text-emerald-600 font-semibold">✓</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}