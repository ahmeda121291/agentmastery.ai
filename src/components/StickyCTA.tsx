'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function StickyCTA({
  href,
  label = 'Try Now',
  track = 'affiliate_cta_sticky',
}: { href: string; label?: string; track?: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!href) return null

  return (
    <div className={`fixed bottom-4 left-0 right-0 z-40 flex justify-center px-3 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full px-6 py-3 shadow-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors font-medium"
        data-cta={track}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {label}
      </Link>
    </div>
  )
}