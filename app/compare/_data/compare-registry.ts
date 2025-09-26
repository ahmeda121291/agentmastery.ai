export type ComparePair = {
  canonical: string;
  aliases: string[];
  title?: string;
};

export const COMPARES: ComparePair[] = [
  { canonical: "aiseo-vs-getgenie", aliases: ["getgenie-vs-aiseo"] },
  { canonical: "aiseo-vs-surfer", aliases: ["surfer-vs-aiseo"] },
  { canonical: "apollo-vs-bombbomb", aliases: ["bombbomb-vs-apollo"] },
  { canonical: "apollo-vs-zoominfo", aliases: ["zoominfo-vs-apollo"] },
  { canonical: "clay-vs-leadiq", aliases: ["leadiq-vs-clay"] },
  { canonical: "clearbit-vs-heygen", aliases: ["heygen-vs-clearbit"] },
  { canonical: "copy-ai-vs-jasper", aliases: ["jasper-vs-copy-ai"] },
  { canonical: "copy-ai-vs-pipedrive", aliases: ["pipedrive-vs-copy-ai"] },
  { canonical: "customgpt-vs-chatsimple", aliases: ["chatsimple-vs-customgpt"] },
  { canonical: "drift-vs-intercom", aliases: ["intercom-vs-drift"] },
  { canonical: "heygen-vs-synthesia", aliases: ["synthesia-vs-heygen"] },
  { canonical: "hubspot-vs-salesforce", aliases: ["salesforce-vs-hubspot"] },
  { canonical: "hubspot-vs-writesonic", aliases: ["writesonic-vs-hubspot"] },
  { canonical: "instantly-vs-loom", aliases: ["loom-vs-instantly"] },
  { canonical: "instantly-vs-smartlead", aliases: ["smartlead-vs-instantly"] },
  { canonical: "jasper-vs-loom", aliases: ["loom-vs-jasper"] },
  { canonical: "loom-vs-vidyard", aliases: ["vidyard-vs-loom"] },
  { canonical: "loom-vs-writesonic", aliases: ["writesonic-vs-loom"] },
  { canonical: "lusha-vs-writesonic", aliases: ["writesonic-vs-lusha"] },
  { canonical: "manychat-vs-pipedrive", aliases: ["pipedrive-vs-manychat"] },
  { canonical: "ocean-vs-zoominfo", aliases: ["zoominfo-vs-ocean"] },
  { canonical: "outranking-vs-scalenut", aliases: ["scalenut-vs-outranking"] },
  { canonical: "outreach-vs-salesloft", aliases: ["salesloft-vs-outreach"] },
  { canonical: "pictory-vs-synthesia", aliases: ["synthesia-vs-pictory"] },
  { canonical: "qualified-vs-zoho", aliases: ["zoho-vs-qualified"] },
];

export function getAllCompareUrls(): string[] {
  return COMPARES.map(c => `/compare/${c.canonical}`);
}

export function getCanonicalCompareSlug(slug: string): string | null {
  const normalized = slug.toLowerCase().trim();

  // Check if it's already canonical
  const canonical = COMPARES.find(c => c.canonical === normalized);
  if (canonical) return canonical.canonical;

  // Check if it's an alias
  const alias = COMPARES.find(c => c.aliases.includes(normalized));
  if (alias) return alias.canonical;

  return null;
}