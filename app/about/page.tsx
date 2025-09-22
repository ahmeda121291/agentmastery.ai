import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  BarChart3,
  Shield,
  Sparkles,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About AgentMastery - Our Methodology',
  description: 'Learn about our independent AI tool ranking methodology, heuristic scoring system, and editorial review process.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">About AgentMastery</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Independent AI Tool Rankings
          </h1>
          <p className="text-xl text-muted-foreground">
            Rankings powered by our heuristic scoring; enhanced by editor review.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              AgentMastery exists to help teams and professionals navigate the overwhelming landscape
              of AI tools. We provide independent, data-driven rankings combined with practical insights
              to help you make informed decisions.
            </p>
            <p>
              Unlike sponsored reviews or pay-to-play directories, our rankings are based on a
              transparent methodology that combines algorithmic scoring with human expertise.
            </p>
          </CardContent>
        </Card>

        {/* Methodology Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Ranking Methodology
            </CardTitle>
            <CardDescription>
              How we evaluate and rank AI tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Heuristic Scoring */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Heuristic Scoring Algorithm
                </h3>
                <p className="text-muted-foreground mb-3">
                  Our proprietary scoring system evaluates tools across multiple dimensions:
                </p>
                <div className="grid gap-3 ml-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Feature Completeness (30%)</span>
                      <p className="text-sm text-muted-foreground">
                        Core capabilities, integrations, and unique features
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Market Performance (25%)</span>
                      <p className="text-sm text-muted-foreground">
                        User adoption, growth trajectory, and market presence
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Value Proposition (20%)</span>
                      <p className="text-sm text-muted-foreground">
                        Pricing fairness, ROI potential, and cost-effectiveness
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-medium">User Experience (15%)</span>
                      <p className="text-sm text-muted-foreground">
                        Interface quality, learning curve, and support
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-medium">Innovation Index (10%)</span>
                      <p className="text-sm text-muted-foreground">
                        AI advancement, unique approaches, and future potential
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial Review */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Editorial Review Process
                </h3>
                <p className="text-muted-foreground mb-3">
                  Our expert editors enhance algorithmic rankings with:
                </p>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Hands-on testing of tool capabilities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Verification of claimed features and benefits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Analysis of real-world use cases and outcomes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Community feedback integration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Continuous monitoring of tool updates and changes
                  </li>
                </ul>
              </div>

              {/* Transparency */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Transparency & Independence
                </h3>
                <p className="text-muted-foreground">
                  We maintain complete editorial independence. While we may earn affiliate commissions
                  when you purchase through our links, this never influences our rankings. Tools cannot
                  pay for better placement, and our scoring methodology remains consistent across all
                  evaluations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Principles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Key Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Data-Driven</h4>
                <p className="text-sm text-muted-foreground">
                  Decisions based on measurable metrics and verifiable data points
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">User-Focused</h4>
                <p className="text-sm text-muted-foreground">
                  Rankings optimized for real business outcomes and user success
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Regularly Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Continuous monitoring ensures rankings reflect current tool performance
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Category-Specific</h4>
                <p className="text-sm text-muted-foreground">
                  Tools evaluated within their specific use-case context
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Find Your Perfect AI Tools?</h2>
          <p className="text-muted-foreground">
            Explore our rankings and discover the tools that will transform your workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/leaderboards" className="flex items-center gap-2">
                View Leaderboards
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz" className="flex items-center gap-2">
                Take the Tool Matcher Quiz
              </Link>
            </Button>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Have questions about our methodology? Want to suggest a tool for review?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Contact us at <span className="text-primary">team@agentmastery.ai</span>
          </p>
        </div>
      </div>
    </div>
  )
}