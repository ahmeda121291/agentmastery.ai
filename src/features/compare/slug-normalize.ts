import { COMPARES } from "./registry";

export function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type ResolveResult =
  | { type: "match"; target: string }
  | { type: "redirect"; target: string }
  | { type: "unknown"; suggestions?: string[] };

export function resolveToCanonical(input: string): ResolveResult {
  const normalized = normalizeSlug(input);

  // Check if it's already canonical
  const canonical = COMPARES.find(c => c.canonical === normalized);
  if (canonical) {
    return { type: "match", target: canonical.canonical };
  }

  // Check if it's an alias
  const alias = COMPARES.find(c => c.aliases.includes(normalized));
  if (alias) {
    return { type: "redirect", target: alias.canonical };
  }

  // Try to find suggestions based on partial matches
  const suggestions = findSuggestions(normalized);

  return { type: "unknown", suggestions };
}

function findSuggestions(input: string): string[] {
  const parts = input.split('-vs-');
  if (parts.length !== 2) return [];

  const [tool1, tool2] = parts;

  const suggestions: string[] = [];

  // Look for comparisons that include either tool
  for (const compare of COMPARES) {
    const canonicalParts = compare.canonical.split('-vs-');
    if (canonicalParts.includes(tool1) || canonicalParts.includes(tool2)) {
      suggestions.push(compare.canonical);
    }
  }

  return suggestions.slice(0, 5);
}