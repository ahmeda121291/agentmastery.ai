'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Share2, Twitter, Linkedin, Link2 } from 'lucide-react'

interface ShareButtonsProps {
  slug: string
  title: string
}

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://agentmastery.ai/blog/${slug}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share This Post
        </CardTitle>
        <CardDescription>
          Help others discover valuable AI insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            asChild
          >
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://agentmastery.ai/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            asChild
          >
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://agentmastery.ai/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
          >
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}