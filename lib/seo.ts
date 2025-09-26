// Re-export from new canonical module for backward compatibility
export { origin as SITE_URL, absUrl as canonical } from '@/lib/seo/canonical'

export function buildAffiliateUrl(url: string): string {
  // Keep existing affiliate URL logic
  return url;
}