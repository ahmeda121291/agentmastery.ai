'use client'

import Link from 'next/link'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Check, X, ArrowRight, DollarSign, Zap, Users, Star, ExternalLink } from 'lucide-react'
import { createSchemaScript, faqPageSchema, softwareAppSchema, breadcrumbSchema } from '@/lib/jsonld'
import { canonical } from '@/lib/seo'
import CompareTable from '@/components/CompareTable'
import BestForBadges from '@/components/BestForBadges'
import InlineCTA from '@/components/InlineCTA'

interface ComparisonData {
  toolA: {
    slug: string
    name: string
    category: string
    pricing: number
    features: string[]
    affiliateUrl?: string | null
  }
  toolB: {
    slug: string
    name: string
    category: string
    pricing: number
    features: string[]
    affiliateUrl?: string | null
  }
  content: {
    intro: string
    toolAOverview: string
    toolBOverview: string
    comparison: string
    verdict: string
    pros: {
      toolA: string[]
      toolB: string[]
    }
    cons: {
      toolA: string[]
      toolB: string[]
    }
  }
  slug: string
}

export default function ComparisonPage({ data }: { data: ComparisonData }) {
  const { toolA, toolB, content } = data

  // Generate JSON-LD schema for SEO/AEO
  const pagePath = `/compare/${data.slug}`
  const pageUrl = canonical(pagePath)

  const faqItems = [
    { question: `${toolA.name} vs ${toolB.name}: what are the key differences?`, answer: content.comparison || content.intro },
    { question: `Which is more affordable?`, answer: `${toolA.name} starts at $${toolA.pricing}/mo, while ${toolB.name} starts at $${toolB.pricing}/mo.` },
    { question: `Who is each tool best for?`, answer: content.verdict }
  ]

  const schemaList = [
    breadcrumbSchema([
      { name: 'Home', url: canonical('/') },
      { name: 'Comparisons', url: canonical('/blog?category=Comparisons') },
      { name: `${toolA.name} vs ${toolB.name}`, url: pageUrl },
    ]),
    faqPageSchema(faqItems, pageUrl),
    softwareAppSchema({
      name: toolA.name,
      description: content.toolAOverview || content.intro,
      url: toolA.affiliateUrl || undefined,
      applicationCategory: toolA.category,
      offers: {
        price: toolA.pricing,
        priceCurrency: 'USD',
        url: toolA.affiliateUrl || undefined
      }
    }),
    softwareAppSchema({
      name: toolB.name,
      description: content.toolBOverview || content.intro,
      url: toolB.affiliateUrl || undefined,
      applicationCategory: toolB.category,
      offers: {
        price: toolB.pricing,
        priceCurrency: 'USD',
        url: toolB.affiliateUrl || undefined
      }
    }),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-paper">
      <Script {...createSchemaScript(schemaList, `comparison-schema-${data.slug}`)} />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-forest to-green text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Zap className="h-3 w-3 mr-1" />
              AI Tool Comparison
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {toolA.name} vs {toolB.name}
            </h1>
            <p className="text-xl md:text-2xl text-green-100">
              Which AI Tool Wins in 2025?
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Direct Answer Block for AEO */}
        {content.verdict && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="rounded-lg border border-green/20 bg-green/5 p-4">
              <p className="text-sm font-medium text-gray-900 mb-1">Our Verdict:</p>
              <p className="text-sm text-gray-700">{content.verdict}</p>
            </div>
          </div>
        )}

        {/* Best For Badges */}
        <div className="max-w-6xl mx-auto mb-8">
          <BestForBadges
            items={[
              { label: `${toolA.name}: Best for ${toolA.pricing < 100 ? 'SMB' : 'Enterprise'}`, icon: '🏆' },
              { label: `${toolB.name}: Best for ${toolB.pricing < 100 ? 'Startups' : 'Scale'}`, icon: '🚀' },
              { label: `Winner: ${toolA.pricing < toolB.pricing ? toolA.name + ' (Value)' : toolB.name + ' (Features)'}`, icon: '⭐' }
            ]}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-ink/80 leading-relaxed">
              {content.intro}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Feature Comparison</CardTitle>
                <CardDescription>Side-by-side comparison of key features</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/3">Feature</TableHead>
                      <TableHead className="text-center">{toolA.name}</TableHead>
                      <TableHead className="text-center">{toolB.name}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Category</TableCell>
                      <TableCell className="text-center">{toolA.category}</TableCell>
                      <TableCell className="text-center">{toolB.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Starting Price</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">{toolA.pricing}/mo</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">{toolB.pricing}/mo</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Key Features</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {toolA.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {toolB.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <Check className="h-3 w-3 text-green" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Feature Comparison Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Detailed Feature Comparison</h2>
            <CompareTable
              toolA={toolA}
              toolB={toolB}
              features={[
                'AI Capabilities',
                'Automation',
                'API Access',
                'Team Collaboration',
                'Analytics & Reporting',
                'Customer Support',
                'Mobile App',
                'Integrations',
                'Data Export',
                'Custom Workflows'
              ]}
            />
          </div>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Tool A Pros/Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{toolA.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {content.pros.toolA.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green shrink-0 mt-0.5" />
                        <span className="text-sm text-ink/80">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {content.cons.toolA.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-ink/80">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Tool B Pros/Cons */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{toolB.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green mb-2">Pros</h4>
                  <ul className="space-y-1">
                    {content.pros.toolB.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green shrink-0 mt-0.5" />
                        <span className="text-sm text-ink/80">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                  <ul className="space-y-1">
                    {content.cons.toolB.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-ink/80">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown */}
          <div className="space-y-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>{toolA.name} Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink/80 leading-relaxed">{content.toolAOverview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{toolB.name} Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink/80 leading-relaxed">{content.toolBOverview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direct Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink/80 leading-relaxed">{content.comparison}</p>
              </CardContent>
            </Card>

            <Card className="border-green/20 bg-green/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-green" />
                  Final Verdict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ink leading-relaxed font-medium">{content.verdict}</p>
              </CardContent>
            </Card>
          </div>

          {/* Inline CTA for tools with affiliate links */}
          <div className="mb-8 text-center">
            {toolA.affiliateUrl && (
              <InlineCTA
                href={toolA.affiliateUrl}
                label={`Try ${toolA.name} Free`}
                track="comparison_cta_inline_a"
                className="inline-block mr-4"
              />
            )}
            {toolB.affiliateUrl && (
              <InlineCTA
                href={toolB.affiliateUrl}
                label={`Try ${toolB.name} Free`}
                track="comparison_cta_inline_b"
                className="inline-block"
              />
            )}
          </div>

          {/* CTAs */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Try {toolA.name}</h3>
                {toolA.affiliateUrl ? (
                  <Button asChild>
                    <a href={toolA.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      Visit {toolA.name}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <Link href={`/tools/${toolA.slug}`}>
                      View {toolA.name} Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Try {toolB.name}</h3>
                {toolB.affiliateUrl ? (
                  <Button asChild>
                    <a href={toolB.affiliateUrl} target="_blank" rel="noopener noreferrer">
                      Visit {toolB.name}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <Link href={`/tools/${toolB.slug}`}>
                      View {toolB.name} Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Related Links */}
          <Card>
            <CardHeader>
              <CardTitle>Related Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Link href="/leaderboards">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-forest hover:text-white">
                    View All Leaderboards
                  </Badge>
                </Link>
                <Link href="/answers">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-forest hover:text-white">
                    AI Tool Q&As
                  </Badge>
                </Link>
                <Link href="/blog">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-forest hover:text-white">
                    Latest Blog Posts
                  </Badge>
                </Link>
                <Link href="/quiz">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-forest hover:text-white">
                    Tool Matcher Quiz
                  </Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}