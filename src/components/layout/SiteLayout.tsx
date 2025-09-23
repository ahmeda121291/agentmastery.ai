import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Ticker } from './Ticker'

interface SiteLayoutProps {
  children: ReactNode
  hideTicker?: boolean
}

export function SiteLayout({ children, hideTicker = false }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {!hideTicker && (
        <div className="overflow-hidden">
          <Ticker />
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
