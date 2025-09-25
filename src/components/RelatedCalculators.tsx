import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calculator } from 'lucide-react'

const calculators = [
  {
    slug: 'cold-call-calculator',
    path: '/arcade/cold-call-calculator',
    title: 'Cold Call Calculator',
    description: 'Calculate pipeline value from daily dials',
    color: 'from-blue-500 to-blue-600'
  },
  {
    slug: 'roi',
    path: '/calculators/roi',
    title: 'Email ROI Calculator',
    description: 'Measure email campaign profitability',
    color: 'from-green-500 to-green-600'
  },
  {
    slug: 'chatbot-savings',
    path: '/arcade/chatbot-savings',
    title: 'Chatbot Savings',
    description: 'Calculate support automation savings',
    color: 'from-purple-500 to-purple-600'
  },
  {
    slug: 'video-production-cost',
    path: '/arcade/video-production-cost',
    title: 'Video Production Cost',
    description: 'Compare traditional vs AI video costs',
    color: 'from-orange-500 to-orange-600'
  }
]

export default function RelatedCalculators({
  currentCalculator,
  title = 'Try Another Calculator'
}: {
  currentCalculator: string
  title?: string
}) {
  const related = calculators.filter(c => c.slug !== currentCalculator)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5" />
        {title}
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {related.map(calc => (
          <Link
            key={calc.slug}
            href={calc.path}
            className="group"
          >
            <div className="p-4 border rounded-lg hover:shadow-md transition-all hover:border-emerald-400">
              <div className={`h-2 w-full bg-gradient-to-r ${calc.color} rounded mb-3`} />
              <h4 className="font-medium mb-1 group-hover:text-emerald-600 transition-colors">
                {calc.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {calc.description}
              </p>
              <div className="mt-2 flex items-center gap-1 text-sm text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Try it <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}