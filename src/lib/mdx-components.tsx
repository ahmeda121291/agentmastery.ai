import * as React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { buildAffiliateUrl } from '@/lib/seo'
import { tools } from '@/data/tools'
import { Callout, ProsCons, GlossaryTerm } from '@/components/mdx'

const Table = (props: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="overflow-x-auto my-6">
    <table {...props} className={clsx('am-table', props.className)} />
  </div>
)

const Th = (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th {...props} className={clsx('am-th', props.className)} />
)

const Td = (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td {...props} className={clsx('am-td', props.className)} />
)

const Ul = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...props} className={clsx('am-ul', props.className)} />
)

const Ol = (props: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol {...props} className={clsx('am-ol', props.className)} />
)

const Li = (props: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li {...props} className={clsx('am-li', props.className)} />
)

// Task list checkboxes (GFM)
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  if (props.type === 'checkbox') {
    return (
      <input
        {...props}
        className={clsx(
          'am-checkbox',
          'mr-2 align-middle accent-green focus:ring-green'
        )}
        disabled
        readOnly
      />
    )
  }
  return <input {...props} />
}

const A = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href ?? '#'

  // Handle internal tool links with affiliate tracking
  if (href.startsWith('INTERNAL_TOOL:')) {
    const [, slug, source] = href.split(':')
    const tool = tools.find((t: any) => t.slug === slug)

    if (tool?.affiliateUrl) {
      const affiliateUrl = buildAffiliateUrl(tool.affiliateUrl, (source || 'blog') as any, slug)
      return (
        <a
          {...props}
          href={affiliateUrl}
          className={clsx('am-link', props.className)}
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          {props.children}
        </a>
      )
    }

    return (
      <Link href={`/tools/${slug}`} className={clsx('am-link', props.className)}>
        {props.children}
      </Link>
    )
  }

  // Internal links
  const isInternal = href.startsWith('/')
  if (isInternal) {
    return (
      <Link href={href} className={clsx('am-link', props.className)}>
        {props.children}
      </Link>
    )
  }

  // External links
  return (
    <a
      {...props}
      href={href}
      className={clsx('am-link', props.className)}
      target="_blank"
      rel="noopener noreferrer"
    />
  )
}

// Headings with anchor links
const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 {...props} className={clsx('am-h1', props.className)} />
)

const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 {...props} className={clsx('am-h2', props.className)} />
)

const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 {...props} className={clsx('am-h3', props.className)} />
)

const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...props} className={clsx('am-p', props.className)} />
)

const Blockquote = (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
  <blockquote {...props} className={clsx('am-blockquote', props.className)} />
)

const Code = (props: React.HTMLAttributes<HTMLElement>) => (
  <code {...props} className={clsx('am-code', props.className)} />
)

const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => (
  <pre {...props} className={clsx('am-pre', props.className)} />
)

export const mdxComponents = {
  // HTML elements
  table: Table,
  th: Th,
  td: Td,
  ul: Ul,
  ol: Ol,
  li: Li,
  input: Input,
  a: A,
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  // Custom MDX components
  Callout,
  ProsCons,
  GlossaryTerm,
}