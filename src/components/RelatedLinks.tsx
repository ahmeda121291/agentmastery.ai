import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Gamepad2,
  GitCompare,
  HelpCircle,
  TrendingUp,
  Sparkles,
  Clock
} from 'lucide-react'

interface RelatedLink {
  href: string
  title: string
  description: string
  category: 'blog' | 'compare' | 'arcade' | 'calculator' | 'tool' | 'quiz' | 'resource'
  popularity?: number
  isNew?: boolean
}

interface RelatedLinksProps {
  currentPath?: string
  currentCategory?: string
  currentTags?: string[]
  title?: string
  inline?: boolean
}

// Static curated lists for different categories
const curatedLinks: Record<string, RelatedLink[]> = {
  popular: [
    {
      href: '/quiz',
      title: 'AI Tool Matcher Quiz',
      description: 'Find your perfect AI stack in 2 minutes',
      category: 'quiz',
      popularity: 100
    },
    {
      href: '/compare/apollo-vs-zoominfo',
      title: 'Apollo vs ZoomInfo',
      description: 'Compare top B2B data platforms',
      category: 'compare',
      popularity: 95
    },
    {
      href: '/arcade',
      title: 'Agent Arcade',
      description: 'Interactive calculators and games',
      category: 'arcade',
      popularity: 90
    },
    {
      href: '/calculators/roi',
      title: 'ROI Calculator',
      description: 'Calculate your AI tool ROI',
      category: 'calculator',
      popularity: 88
    },
    {
      href: '/blog/best-ai-sales-tools-2025',
      title: 'Best AI Sales Tools 2025',
      description: 'Top picks for sales teams',
      category: 'blog',
      popularity: 85
    }
  ],
  blog: [
    {
      href: '/blog/innovative-b2b-lead-generation-strategies-for-2025-outbound-approaches-that-work',
      title: 'B2B Lead Generation 2025',
      description: 'Proven outbound strategies that deliver results',
      category: 'blog'
    },
    {
      href: '/blog/mastering-cold-email-deliverability-proven-strategies-for-success',
      title: 'Cold Email Deliverability Guide',
      description: 'Ensure your emails reach the inbox',
      category: 'blog'
    },
    {
      href: '/blog/choosing-the-right-ai-sales-automation-tools-a-comprehensive-comparison',
      title: 'AI Sales Automation Guide',
      description: 'Compare top automation platforms',
      category: 'blog'
    }
  ],
  compare: [
    {
      href: '/compare/hubspot-vs-salesforce',
      title: 'HubSpot vs Salesforce',
      description: 'CRM platform comparison',
      category: 'compare'
    },
    {
      href: '/compare/jasper-vs-copy-ai',
      title: 'Jasper vs Copy.ai',
      description: 'AI writing tool showdown',
      category: 'compare'
    },
    {
      href: '/compare/instantly-vs-smartlead',
      title: 'Instantly vs SmartLead',
      description: 'Cold email platform comparison',
      category: 'compare'
    }
  ],
  arcade: [
    {
      href: '/arcade/ad-roi',
      title: 'Ad Spend ROI Calculator',
      description: 'Calculate ROAS and net ROI',
      category: 'arcade'
    },
    {
      href: '/arcade/seo-content-roi',
      title: 'SEO Content ROI',
      description: 'Forecast content value',
      category: 'arcade'
    },
    {
      href: '/arcade/price-guess',
      title: 'Tool Price Game',
      description: 'Test your pricing knowledge',
      category: 'arcade'
    }
  ],
  tools: [
    {
      href: '/tools',
      title: 'AI Tools Directory',
      description: 'Browse 250+ reviewed tools',
      category: 'tool'
    },
    {
      href: '/leaderboards',
      title: 'Tool Rankings',
      description: 'Weekly updated leaderboards',
      category: 'tool'
    },
    {
      href: '/updates',
      title: 'New & Updated',
      description: 'Latest content and reviews',
      category: 'resource',
      isNew: true
    }
  ]
}

const categoryIcons = {
  blog: BookOpen,
  compare: GitCompare,
  arcade: Gamepad2,
  calculator: Calculator,
  tool: Sparkles,
  quiz: HelpCircle,
  resource: Clock
}

function getRelatedLinks(
  currentPath?: string,
  currentCategory?: string,
  currentTags?: string[]
): RelatedLink[] {
  const links: RelatedLink[] = []
  const usedPaths = new Set<string>()

  if (currentPath) {
    usedPaths.add(currentPath)
  }

  // 1. Add one from same category if available
  if (currentCategory && curatedLinks[currentCategory]) {
    const sameCategoryLinks = curatedLinks[currentCategory].filter(
      link => !usedPaths.has(link.href)
    )
    if (sameCategoryLinks.length > 0) {
      const link = sameCategoryLinks[0]
      links.push(link)
      usedPaths.add(link.href)
    }
  }

  // 2. Add one cross-category link
  const otherCategories = Object.keys(curatedLinks).filter(cat => cat !== currentCategory)
  for (const category of otherCategories) {
    const crossLinks = curatedLinks[category].filter(link => !usedPaths.has(link.href))
    if (crossLinks.length > 0) {
      const link = crossLinks[0]
      links.push(link)
      usedPaths.add(link.href)
      break
    }
  }

  // 3. Add popular evergreen content
  const popularLinks = curatedLinks.popular.filter(link => !usedPaths.has(link.href))
  if (popularLinks.length > 0) {
    links.push(popularLinks[0])
    usedPaths.add(popularLinks[0].href)
  }

  // 4. Fill up to at least 3 links
  while (links.length < 3) {
    const allLinks = Object.values(curatedLinks).flat()
    const availableLinks = allLinks.filter(link => !usedPaths.has(link.href))
    if (availableLinks.length === 0) break

    const link = availableLinks[Math.floor(Math.random() * Math.min(3, availableLinks.length))]
    links.push(link)
    usedPaths.add(link.href)
  }

  return links
}

export default function RelatedLinks({
  currentPath,
  currentCategory,
  currentTags,
  title = 'Related Resources',
  inline = false
}: RelatedLinksProps) {
  const links = getRelatedLinks(currentPath, currentCategory, currentTags)

  if (inline) {
    // Inline version for mid-article placement
    return (
      <div className="my-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-green" />
          <span className="text-sm font-semibold text-gray-700">See Also:</span>
        </div>
        <div className="space-y-2">
          {links.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-green hover:text-forest transition-colors"
            >
              → {link.title}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  // Full version for bottom of page
  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-green" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => {
            const Icon = categoryIcons[link.category] || Sparkles

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group block p-4 rounded-lg border border-gray-200 hover:border-green hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-green/10 transition-colors">
                    <Icon className="h-4 w-4 text-gray-600 group-hover:text-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-green transition-colors mb-1">
                      {link.title}
                      {link.isNew && (
                        <Badge className="ml-2 bg-green/10 text-green border-green/20 text-xs">
                          NEW
                        </Badge>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green transition-all group-hover:translate-x-1 mt-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}