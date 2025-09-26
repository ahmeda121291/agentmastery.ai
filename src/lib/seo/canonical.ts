export function origin() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentmastery.ai").replace(/\/+$/,"");
}

export function absUrl(pathname: string) {
  const base = origin();
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  // normalize: no trailing slash unless root
  const normalized = p === "/" ? "/" : p.replace(/\/+$/,"");
  return `${base}${normalized}`;
}

export function deriveCanonical(routeInfo: { pathname: string, params?: Record<string,string> }) {
  // Build pathname deterministically from route/params.
  // For dynamic routes (/blog/[slug], /tools/[slug], /compare/[slug]) ensure params are normalized (lowercase, no trailing slash).
  const p = routeInfo.pathname === "/" ? "/" : routeInfo.pathname.replace(/\/+$/,"").toLowerCase();
  return absUrl(p);
}