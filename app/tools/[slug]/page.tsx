import { notFound } from 'next/navigation'
import { tools } from '@/src/data/tools'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, CheckCircle, XCircle, DollarSign, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.slug === params.slug)
  if (!tool) return { title: 'Tool Not Found' }

  return {
    title: `${tool.name} - AI Tool Review | AgentMastery`,
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

  // Generate JSON-LD structured data
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tool.name,
    description: tool.blurb,
    offers: {
      '@type': 'Offer',
      price: tool.pricingNote,
      priceCurrency: 'USD',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4',
        bestRating: '5'
      },
      author: {
        '@type': 'Organization',
        name: 'AgentMastery'
      }
    }
  }

  const jsonLdFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${tool.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: tool.blurb
        }
      },
      {
        '@type': 'Question',
        name: `How much does ${tool.name} cost?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: tool.pricingNote
        }
      },
      {
        '@type': 'Question',
        name: `What are the main features of ${tool.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: tool.pros.join(' ')
        }
      }
    ]
  }

  // Generate logo placeholder
  const logoLetter = tool.name.charAt(0).toUpperCase()

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id={`product-jsonld-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdProduct)
        }}
      />
      <Script
        id={`faq-jsonld-${tool.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFAQ)
        }}
      />

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
              <Button size="lg" asChild>
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{tool.blurb}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          {/* Pros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Pros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tool.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Cons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                Cons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tool.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{tool.pricingNote}</p>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">What is {tool.name}?</h3>
              <p className="text-muted-foreground">{tool.blurb}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How much does {tool.name} cost?</h3>
              <p className="text-muted-foreground">{tool.pricingNote}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is {tool.name} worth it?</h3>
              <p className="text-muted-foreground">
                {tool.name} offers strong value for teams looking for {tool.category.toLowerCase()} solutions.
                Consider your specific needs and budget when evaluating this tool.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What are the alternatives to {tool.name}?</h3>
              <p className="text-muted-foreground">
                Check our tools directory for other {tool.category} solutions that might better fit your needs and budget.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <Button size="lg" asChild>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Try {tool.name}
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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
          <Button className="w-full" size="lg" asChild>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
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