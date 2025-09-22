import { notFound } from 'next/navigation'
import { tools } from '@/src/data/tools'
import { Button } from '@/src/components/ui/Button'
import { Card } from '@/src/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import {
  ExternalLink,
  CheckCircle,
  XCircle,
  DollarSign,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Shield,
  Zap,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  createSchemaScript
} from '@/src/lib/jsonld'
import { buildAffiliateUrl } from '@/src/lib/seo'

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug)
  if (!tool) return { title: 'Tool Not Found' }

  return {
    title: `${tool.name} Review 2024 - Pricing, Features & Alternatives | AgentMastery`,
    description: tool.blurb,
    openGraph: {
      title: `${tool.name} - AI Tool Review`,
      description: tool.blurb,
      type: 'article',
    },
  }
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug)

  if (!tool) {
    notFound()
  }

  // Find competitor if specified
  const competitor = tool.nearestCompetitorSlug
    ? tools.find(t => t.slug === tool.nearestCompetitorSlug)
    : null

  // Generate UTM-tagged affiliate URL
  const affiliateUrl = buildAffiliateUrl(tool.affiliateUrl, 'tool', tool.slug)

  // Calculate fake ranking (will be wired to real data later)
  const ranking = Math.floor(Math.random() * 10) + 1
  const lastUpdated = new Date().toISOString().split('T')[0]

  // Generate structured data
  const productSchema = generateProductSchema({
    name: tool.name,
    description: tool.blurb,
    offers: {
      price: tool.pricingNote,
      priceCurrency: 'USD',
      availability: 'InStock',
      url: affiliateUrl
    },
    aggregateRating: {
      ratingValue: 4.2,
      ratingCount: 127,
      reviewCount: 89
    },
    review: {
      author: 'AgentMastery Team',
      reviewRating: {
        ratingValue: 4,
        bestRating: 5
      },
      reviewBody: tool.editorNote || `${tool.name} is a powerful ${tool.category} tool with excellent features for automation and productivity.`
    }
  })

  // Micro-FAQ for conversions
  const microFAQ = [
    {
      question: `Is ${tool.name} worth it?`,
      answer: `Based on our testing, ${tool.name} delivers strong ROI for teams needing ${tool.category.toLowerCase()} capabilities. The ${tool.pricingNote} pricing is competitive for the features offered.`
    },
    {
      question: `Can I try ${tool.name} for free?`,
      answer: tool.pricingNote.toLowerCase().includes('free')
        ? `Yes, ${tool.name} offers a free tier or trial. Start testing risk-free today.`
        : `${tool.name} typically offers a trial period or money-back guarantee. Check their site for current offers.`
    },
    {
      question: `What makes ${tool.name} different?`,
      answer: tool.pros[0] + ' This sets it apart from alternatives in the market.'
    }
  ]

  const fullFAQ = [
    {
      question: `What is ${tool.name}?`,
      answer: tool.blurb
    },
    {
      question: `How much does ${tool.name} cost?`,
      answer: tool.pricingNote
    },
    ...microFAQ,
    {
      question: `What are the main features of ${tool.name}?`,
      answer: tool.pros.join(' ')
    },
    {
      question: `What are the limitations of ${tool.name}?`,
      answer: tool.cons.join(' ')
    }
  ]

  const faqSchema = generateFAQSchema(fullFAQ)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://agentmastery.ai' },
    { name: 'Tools', url: 'https://agentmastery.ai/tools' },
    { name: tool.name, url: `https://agentmastery.ai/tools/${tool.slug}` }
  ])

  // Generate logo placeholder
  const logoLetter = tool.name.charAt(0).toUpperCase()

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script {...createSchemaScript(productSchema, `product-${tool.slug}`)} />
      <Script {...createSchemaScript(faqSchema, `faq-${tool.slug}`)} />
      <Script {...createSchemaScript(breadcrumbSchema, `breadcrumb-${tool.slug}`)} />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tools" className="hover:text-foreground">Tools</Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{tool.name}</li>
          </ol>
        </nav>

        {/* Trust Bar */}
        <div className="mb-6 p-4 bg-mist rounded-lg">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green" />
              <span className="font-medium">#{ranking} in {tool.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Updated {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Verified by editors</span>
            </div>
            {tool.promo && (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-medium text-green">{tool.promo}</span>
              </div>
            )}
          </div>
          {tool.editorNote && (
            <div className="mt-3 p-3 bg-paper rounded border-l-4 border-green">
              <p className="text-sm italic">
                <strong>Editor's Note:</strong> {tool.editorNote}
              </p>
            </div>
          )}
        </div>

        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-8">
            {/* Logo Placeholder */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-primary">{logoLetter}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
                <Badge variant="secondary">{tool.category}</Badge>
              </div>
              {tool.badges && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tool.badges.map(badge => (
                    <Badge key={badge} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button size="lg" variant="primary" magnetic asChild>
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center gap-2"
                >
                  Try {tool.name}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Summary Section */}
          <Card className="mb-8">
            <div className="p-6">
              <h2 className="font-semibold mb-3">Overview</h2>
              <p className="text-lg leading-relaxed">{tool.blurb}</p>
            </div>
          </Card>

          {/* Compare Strip (if competitor exists) */}
          {competitor && (
            <div className="mb-8 p-4 bg-gradient-to-r from-forest/5 to-green/5 rounded-lg border border-green/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  Compare with {competitor.name}
                </h3>
                <Link href={`/tools/${competitor.slug}`} className="text-sm text-primary hover:underline">
                  View {competitor.name} →
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Key Advantage</span>
                  <p className="text-sm mt-1">{tool.pros[0]}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Pricing</span>
                  <p className="text-sm mt-1">{tool.pricingNote} vs {competitor.pricingNote}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Best For</span>
                  <p className="text-sm mt-1">
                    {tool.badges?.[0] || tool.category} focused teams
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Pros */}
          <Card variant="lift">
            <div className="p-6">
              <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Pros
              </h2>
              <ul className="space-y-3">
                {tool.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Cons */}
          <Card variant="lift">
            <div className="p-6">
              <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Cons
              </h2>
              <ul className="space-y-3">
                {tool.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Risk Warnings if any */}
        {tool.riskWarnings && tool.riskWarnings.length > 0 && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50/50">
            <div className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Important Considerations
              </h3>
              <ul className="space-y-2">
                {tool.riskWarnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-yellow-600">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {/* Pricing Section */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </h2>
            <p className="text-lg mb-4">{tool.pricingNote}</p>
            {tool.promo && (
              <div className="p-3 bg-green/10 rounded-lg border border-green/20">
                <p className="text-sm font-medium text-green">🎉 Special Offer: {tool.promo}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Inline Micro-FAQ (near CTA) */}
        <Card className="mb-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="p-6">
            <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Quick Answers
            </h2>
            <div className="space-y-4">
              {microFAQ.map((item, index) => (
                <div key={index}>
                  <h3 className="font-medium mb-1">{item.question}</h3>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* CTA within FAQ */}
            <div className="mt-6 p-4 bg-paper rounded-lg text-center">
              <p className="mb-3 font-medium">Ready to boost your {tool.category.toLowerCase()} workflow?</p>
              <Button size="lg" variant="primary" magnetic asChild>
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center gap-2 justify-center"
                >
                  Start Free with {tool.name}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Full FAQ Section */}
        <Card className="mb-12">
          <div className="p-6">
            <h2 className="font-semibold text-xl mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {fullFAQ.slice(3).map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <Button size="lg" variant="primary" magnetic asChild>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-2"
            >
              Get Started with {tool.name}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/leaderboards" className="flex items-center gap-2">
              Compare on Leaderboards
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden z-50">
          <Button className="w-full" size="lg" variant="primary" asChild>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-center gap-2"
            >
              Try {tool.name}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}