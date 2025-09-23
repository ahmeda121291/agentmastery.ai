import { Metadata } from 'next'
import { ColdCallCalculator } from '@/components/arcade/ColdCallCalculator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cold Call Calculator | AgentMastery',
  description: 'Turn dials into dollars. Calculate pipeline value, ROI, and activity metrics for your cold calling efforts.',
  openGraph: {
    title: 'Cold Call Calculator - Forecast Your Sales Pipeline',
    description: 'Calculate value per dial, pipeline coverage, and dials needed to hit quota.',
    images: ['/api/og/calculator?type=cold-call'],
  },
}

export default function ColdCallCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-paper">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/arcade">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Arcade
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green/10 text-green border-green/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Sales Calculator
          </Badge>
        </div>

        {/* Calculator */}
        <div className="max-w-5xl mx-auto">
          <ColdCallCalculator />
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to optimize your outbound strategy?
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/calculators/roi">
              <Button variant="outline">
                Try Email ROI Calculator
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="primary">
                Find Your Sales Stack
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}