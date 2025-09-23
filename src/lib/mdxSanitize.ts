/**
 * MDX content sanitizer for normalizing links
 */

/**
 * Normalizes links in MDX content
 * - Ensures all http(s) links have explicit https:// prefix
 * - Converts bare affiliate hosts to full https:// URLs
 * - Leaves mailto:, tel: untouched
 */
export function mdxSanitize(content: string): string {
  // Pattern to match markdown links [text](url)
  const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g

  // Pattern to match HTML anchor tags
  const htmlLinkPattern = /<a\s+([^>]*href=["']?)([^"'\s>]+)(["']?[^>]*)>/gi

  // Common affiliate domains that might appear bare
  const affiliateDomains = [
    'smartlead.ai',
    'apollo.io',
    'clay.com',
    'jasper.ai',
    'synthesia.io',
    'elevenlabs.io',
    'motion.io',
    'perplexity.ai'
  ]

  // Function to normalize a URL
  const normalizeUrl = (url: string): string => {
    // Skip if it's already a full URL with protocol
    if (/^https?:\/\//i.test(url)) {
      // Ensure https for http links
      return url.replace(/^http:\/\//i, 'https://')
    }

    // Skip special protocols
    if (/^(mailto:|tel:|#|\/)/i.test(url)) {
      return url
    }

    // Check if it's a bare domain (no protocol)
    // Could be something like "example.com" or "www.example.com"
    if (/^(www\.)?[\w-]+(\.[\w-]+)+/i.test(url)) {
      return `https://${url}`
    }

    // Check if it starts with // (protocol-relative)
    if (url.startsWith('//')) {
      return `https:${url}`
    }

    return url
  }

  // Process markdown links
  content = content.replace(markdownLinkPattern, (match, text, url) => {
    const normalizedUrl = normalizeUrl(url)
    return `[${text}](${normalizedUrl})`
  })

  // Process HTML links
  content = content.replace(htmlLinkPattern, (match, prefix, url, suffix) => {
    const normalizedUrl = normalizeUrl(url)
    return `<a ${prefix}${normalizedUrl}${suffix}>`
  })

  // Extra pass for bare affiliate domains in text that should be links
  affiliateDomains.forEach(domain => {
    // Match bare domain mentions not already in links
    const barePattern = new RegExp(`(?<!["'>/])\\b(${domain.replace('.', '\\.')})\\b(?!["'<])`, 'gi')
    content = content.replace(barePattern, (match) => {
      // Only replace if not already part of a URL
      if (!content.slice(Math.max(0, content.lastIndexOf(match) - 10), content.lastIndexOf(match)).includes('://')) {
        return `https://${match}`
      }
      return match
    })
  })

  return content
}

/**
 * Adds UTM parameters to internal tool links
 * Processes MDX content to wrap /tools/[slug] links with proper affiliate URLs
 */
export function processInternalToolLinks(content: string, source: string = 'blog'): string {
  // Pattern to match internal tool links
  const toolLinkPattern = /\[([^\]]+)\]\(\/tools\/([a-z0-9-]+)\)/gi

  // Replace with UTM-enhanced links
  content = content.replace(toolLinkPattern, (match, text, slug) => {
    // We'll use a special marker that the MDX compiler can recognize
    // This avoids importing buildAffiliateUrl here
    return `[${text}](INTERNAL_TOOL:${slug}:${source})`
  })

  return content
}

/**
 * Combined MDX sanitization and processing
 */
export function processMDXContent(content: string, source: string = 'blog'): string {
  // First normalize all links
  content = mdxSanitize(content)

  // Then process internal tool links
  content = processInternalToolLinks(content, source)

  return content
}