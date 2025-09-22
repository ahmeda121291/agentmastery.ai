import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Large 404 Display */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-foreground">Page Not Found</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tools" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Browse Tools
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">Popular Pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/leaderboards" className="text-sm text-primary hover:underline">
              Leaderboards
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/quiz" className="text-sm text-primary hover:underline">
              Tool Matcher Quiz
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/calculators/roi" className="text-sm text-primary hover:underline">
              ROI Calculator
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/blog" className="text-sm text-primary hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}