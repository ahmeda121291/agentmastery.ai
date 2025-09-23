export function buildAffiliateUrl(baseUrl: string, source: string, toolSlug: string): string {
  // Simple affiliate URL builder
  // Add tracking parameters or modify URL as needed
  if (baseUrl.includes('?')) {
    return `${baseUrl}&utm_source=agentmastery&utm_medium=${source}&utm_campaign=${toolSlug}`
  } else {
    return `${baseUrl}?utm_source=agentmastery&utm_medium=${source}&utm_campaign=${toolSlug}`
  }
}