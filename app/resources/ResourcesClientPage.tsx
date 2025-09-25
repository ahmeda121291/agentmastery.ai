'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  resources,
  resourceCategories,
  getFeaturedResources,
  getResourcesByCategory,
  type Resource,
  type ResourceCategory
} from '@/data/resources'
import {
  affiliateLinks,
  internalCrossLinks,
  getFeaturedAffiliateLinks,
  getFeaturedInternalLinks,
  trackDownload,
  trackClick,
  getTrackingUrl
} from '@/data/affiliates'

export default function ResourcesClientPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [downloadCount, setDownloadCount] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const featuredResources = getFeaturedResources()
  const featuredAffiliates = getFeaturedAffiliateLinks()
  const featuredInternalLinks = getFeaturedInternalLinks()

  const filteredResources = selectedCategory === 'all'
    ? resources
    : getResourcesByCategory(selectedCategory)

  const handleDownload = async (resource: Resource) => {
    const newCount = downloadCount + 1
    setDownloadCount(newCount)

    // Track download
    if (resource.downloadUrl) {
      trackDownload(resource.id, 'internal')
    } else if (resource.externalUrl) {
      trackDownload(resource.id, resource.isAffiliate ? 'affiliate' : 'external')
    }

    // Show modal after 2 downloads
    if (newCount >= 2) {
      setShowModal(true)
    }

    // Handle the actual download/redirect
    if (resource.downloadUrl) {
      window.open(resource.downloadUrl, '_blank')
    } else if (resource.externalUrl) {
      window.open(resource.externalUrl, '_blank')
    }
  }

  const handleLinkClick = (linkId: string, url: string, type: 'affiliate' | 'internal' | 'external') => {
    trackClick(linkId, type)
    window.open(url, '_blank')
  }

  const getResourceIcon = (type: Resource['type']) => {
    const icons = {
      template: '📋',
      guide: '📖',
      checklist: '✅',
      toolkit: '🧰',
      worksheet: '📝',
      ebook: '📚'
    }
    return icons[type] || '📄'
  }

  const getFormatIcon = (format: Resource['format']) => {
    const icons = {
      pdf: '📄',
      docx: '📝',
      xlsx: '📊',
      notion: '🗒️',
      sheets: '📈',
      figma: '🎨',
      link: '🔗'
    }
    return icons[format] || '📄'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-paper to-mist/20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-forest to-green text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Implementation Toolkit
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Free templates, guides, and frameworks to accelerate your AI journey.
              Download proven resources used by 15,000+ professionals.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Strategic frameworks
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Implementation guides
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                ROI calculators
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Team training kits
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-mist">
        <Container>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              All Resources
            </Button>
            {resourceCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Resources */}
            {selectedCategory === 'all' && (
              <section>
                <h2 className="text-2xl font-bold text-ink mb-6">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredResources.map((resource) => (
                    <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-ink/60">
                            <span>{getFormatIcon(resource.format)}</span>
                            {resource.size && <span>{resource.size}</span>}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-ink/60">
                          Updated: {new Date(resource.lastUpdated).toLocaleDateString()}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => handleDownload(resource)}
                          className="w-full"
                          variant="primary"
                        >
                          {resource.downloadUrl ? 'Download Free' : 'Get Template'} →
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* All Resources */}
            <section>
              <h2 className="text-2xl font-bold text-ink mb-6">
                {selectedCategory === 'all' ? 'All Resources' :
                  resourceCategories.find(c => c.id === selectedCategory)?.name + ' Resources'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                        <div className="flex items-center gap-1 text-sm text-ink/60">
                          <span>{getFormatIcon(resource.format)}</span>
                          {resource.size && <span className="text-xs">{resource.size}</span>}
                        </div>
                      </div>
                      <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm mb-3 line-clamp-2">
                        {resource.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        onClick={() => handleDownload(resource)}
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        {resource.downloadUrl ? 'Download' : 'Get'} →
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter CTA */}
            <Card className="bg-gradient-to-br from-forest to-green text-white">
              <CardHeader>
                <CardTitle className="text-white">Weekly AI Insights</CardTitle>
                <CardDescription className="text-white/80">
                  Join 15,000+ professionals getting exclusive resources and updates.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-forest hover:bg-white/90"
                  onClick={() => handleLinkClick('newsletter-cta', '/newsletter', 'internal')}
                >
                  Subscribe Free →
                </Button>
              </CardFooter>
            </Card>

            {/* Featured Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended Tools</CardTitle>
                <CardDescription>
                  Popular tools to support your AI implementation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredAffiliates.slice(0, 3).map((affiliate) => (
                  <div key={affiliate.id} className="border-b border-mist last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-sm text-ink">{affiliate.name}</h4>
                    <p className="text-xs text-ink/60 mb-2">{affiliate.description}</p>
                    {affiliate.specialOffer && (
                      <Badge className="bg-green-100 text-green-800 text-xs mb-2">
                        {affiliate.specialOffer}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs p-0 h-auto font-medium text-forest hover:text-green"
                      onClick={() => handleLinkClick(affiliate.id, getTrackingUrl(affiliate), 'affiliate')}
                    >
                      {affiliate.ctaText}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Internal Links */}
            <Card>
              <CardHeader>
                <CardTitle>Explore More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {featuredInternalLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    className="block p-3 rounded-lg hover:bg-mist/50 transition-colors"
                    onClick={() => handleLinkClick(link.id, link.url, 'internal')}
                  >
                    <h4 className="font-medium text-sm text-ink">{link.title}</h4>
                    <p className="text-xs text-ink/60 mt-1">{link.description}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>

      {/* Modal for quiz CTA after downloads */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Find Your Perfect AI Stack</CardTitle>
              <CardDescription>
                You've got the resources, now discover which tools will work best for your specific needs.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button
                onClick={() => {
                  handleLinkClick('quiz-modal', '/quiz', 'internal')
                  setShowModal(false)
                }}
                className="flex-1"
              >
                Take the Quiz →
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}