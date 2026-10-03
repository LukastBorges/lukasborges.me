/** Prefixes a site-relative path with the configured base (e.g. `/lukasborges.me/`). */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return `${base}${path.replace(/^\//, '')}`;
}

/** Absolute URL for a site-relative path — for canonical, Open Graph, and JSON-LD. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) throw new Error('`site` must be configured in astro.config.ts');
  return new URL(withBase(path), site).href;
}
