import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import {
  Target,
  BarChart3,
  Shield,
  Calendar,
  Zap,
  Eye,
  CheckCircle,
  ArrowRight,
  Download,
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About AgentMastery - Independent AI Tool Rankings',
  description: 'Learn about our proprietary scoring methodology, editorial independence, and commitment to transparent AI tool rankings.',
  openGraph: {
    title: 'About AgentMastery - Independent AI Tool Rankings',
    description: 'Proprietary scoring • Editorial independence • Transparent rankings',
    images: ['/api/og?title=Independent%20AI%20Tool%20Rankings&type=about'],
  },
}

export default function AboutPage() {
  const scoringDimensions = [
    { name: 'Value', score: 85, color: 'bg-green-500', icon: DollarSign },
    { name: 'Quality', score: 92, color: 'bg-blue-500', icon: Star },
    { name: 'Adoption', score: 78, color: 'bg-purple-500', icon: Users },
    { name: 'UX', score: 88, color: 'bg-orange-500', icon: Sparkles },
  ]

  return (
    <div className="min-h-screen">
      {/* Gradient Hero with Blob Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-forest via-forest/90 to-green">
        {/* Subtle blob background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green/20 rounded-full blur-xl" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-forest/30 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-green/15 rounded-full blur-xl" />
        </div>

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Sparkles className="h-3 w-3 mr-1" />
              The First AI Blog with Proprietary Scoring
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Independent AI Tool Rankings
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transparent methodology • Editorial independence • Weekly updates • Fair assessments for every tool
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <section className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-24" data-testid="about-mission">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Target className="h-8 w-8 text-primary" />
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground">
                Cut through the noise. Find tools that actually work.
              </p>
            </div>

            <div className="mt-8 max-w-3xl mx-auto">
              <Card className="p-6 md:p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="text-center space-y-4">
                  <p className="text-lg leading-relaxed">
                    <strong>AgentMastery is the first AI blog with proprietary scoring.</strong> We don't just write about tools—we rank them systematically, transparently, and fairly.
                  </p>
                  <p className="text-muted-foreground">
                    No pay-to-play rankings. No hidden biases. Just data-driven assessments that help you make informed decisions in the chaotic world of AI tools.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Proprietary Method Section */}
          <section className="mx-auto max-w-6xl px-6 md:px-8 py-10 md:py-14">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <BarChart3 className="h-8 w-8 text-primary" />
                Proprietary Scoring Method
              </h2>
              <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
                <p className="text-xl text-ink/80">
                  Four dimensions. One score. Total transparency.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Scoring Visualization */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Sample Tool Score Breakdown</CardTitle>
                  <CardDescription className="text-center">
                    How our algorithm evaluates each tool
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {scoringDimensions.map(dimension => (
                    <div key={dimension.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <dimension.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{dimension.name}</span>
                        </div>
                        <span className="text-sm font-medium">{dimension.score}/100</span>
                      </div>
                      <Progress value={dimension.score} className="h-2" />
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Total Score</span>
                      <span className="text-2xl font-bold text-primary">86</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Methodology Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Our Four Dimensions</CardTitle>
                  <CardDescription>
                    Every tool evaluated consistently across these metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Value</span>
                        <p className="text-sm text-muted-foreground">Cost-effectiveness, ROI potential, pricing fairness</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Quality</span>
                        <p className="text-sm text-muted-foreground">Accuracy, reliability, output excellence</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Adoption</span>
                        <p className="text-sm text-muted-foreground">Market momentum, user growth, community size</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">UX</span>
                        <p className="text-sm text-muted-foreground">Ease of use, learning curve, interface quality</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Download Methodology PDF
                      <Badge variant="secondary" className="ml-2 text-xs">Soon</Badge>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Editorial Independence Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Editorial Independence & Disclosures
              </h2>
              <p className="text-xl text-muted-foreground">
                Transparent about relationships. Uncompromising on rankings.
              </p>
            </div>

            <Card className="border-green/20 bg-green/5">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Our Independence Guarantee
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-sm">Rankings cannot be purchased or influenced</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-sm">Same scoring methodology for all tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-sm">Editorial decisions remain independent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span className="text-sm">We test tools ourselves, not just review marketing claims</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      Affiliate Transparency
                    </h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        <strong>Yes, we earn affiliate commissions</strong> when you purchase through some of our links. This helps fund our research and keeps our rankings free.
                      </p>
                      <p>
                        <strong>No, this doesn't affect rankings.</strong> Our leaderboards clearly distinguish affiliate and non-affiliate tools, with identical scoring standards.
                      </p>
                      <p className="text-xs font-medium text-primary">
                        See our leaderboards transparency note for full details.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rankings Update Process */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                How Rankings Are Updated
              </h2>
              <p className="text-xl text-muted-foreground">
                Fresh data. Weekly snapshots. Real-time insights.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Weekly Snapshots
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Every Monday, we capture fresh scores and rankings for all tools in our database.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Last Update</span>
                      <span className="font-medium">Week 38, 2024</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Tools Tracked</span>
                      <span className="font-medium">65+ Tools</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Categories</span>
                      <span className="font-medium">12 Categories</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Movers & Shakers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track which tools are gaining or losing ground week over week.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Score increases tracked</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span>Rank changes monitored</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>New tools integrated</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Continuous Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Beyond weekly snapshots, we track tool updates, pricing changes, and feature releases.
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Feature launches</p>
                    <p>• Pricing updates</p>
                    <p>• User feedback analysis</p>
                    <p>• Performance monitoring</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
              <p className="text-xl text-muted-foreground">
                Three pillars that set AgentMastery apart
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-blue/20 bg-blue/5">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Transparent</h3>
                  <p className="text-muted-foreground">
                    Open methodology, clear scoring criteria, and honest disclosure of all relationships and revenue sources.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-green/20 bg-green/5">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Practical</h3>
                  <p className="text-muted-foreground">
                    Real-world testing, hands-on reviews, and rankings that reflect actual business value, not just hype.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-orange/20 bg-orange/5">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fast</h3>
                  <p className="text-muted-foreground">
                    Weekly updates, rapid tool evaluation, and quick insights to help you stay ahead in the fast-moving AI space.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <section className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20" data-testid="about-cta">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-semibold">Ready to Find Your Perfect AI Tools?</h3>
              <p className="mt-3 text-muted-foreground">
                Explore our transparent rankings and discover tools that will actually transform your workflow.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" magnetic asChild>
                  <Link href="/leaderboards" className="flex items-center gap-2">
                    View Leaderboards
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/quiz">
                    Take Tool Matcher Quiz
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-16 pt-8 border-t text-center">
            <p className="text-muted-foreground mb-2">
              Questions about our methodology? Want to suggest a tool for evaluation?
            </p>
            <p className="text-muted-foreground">
              Contact us at <span className="text-primary font-medium">team@agentmastery.ai</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}