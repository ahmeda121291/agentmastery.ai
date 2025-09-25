import Link from 'next/link'

export default function InlineCTA({
  href,
  label = 'Try Now',
  track = 'affiliate_cta_inline',
  className = ''
}: {
  href: string;
  label?: string;
  track?: string;
  className?: string
}) {
  if (!href) return null

  return (
    <div className={`my-6 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center rounded-md border border-emerald-600 px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-700 font-medium transition-colors"
        data-cta={track}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {label} →
      </Link>
    </div>
  )
}