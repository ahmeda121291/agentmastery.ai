import { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Ticker } from './Ticker'

interface SiteLayoutProps {
  children: ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="hidden md:block">
        <Ticker />
      </div>
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
