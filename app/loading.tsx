import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Skeleton className="h-4 w-32 mx-auto" />
            <Skeleton className="h-16 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-5/6 max-w-2xl mx-auto" />
            <div className="flex gap-4 justify-center pt-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="py-16 px-4 border-y">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-10 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Tools Grid Skeleton */}
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}