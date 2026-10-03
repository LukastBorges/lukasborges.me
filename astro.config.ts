import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

/**
 * Deployment target. Defaults to the GitHub Pages project URL.
 * To move to a custom domain, set SITE_URL=https://lukasborges.me and BASE_PATH=/
 * (and add public/CNAME) — no source changes required.
 */
const site = process.env.SITE_URL ?? 'https://lukastborges.github.io';
const base = process.env.BASE_PATH ?? '/lukasborges.me';

/** Latin subset covers English and Portuguese; keeps a single woff2 per family. */
const LATIN_RANGE =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,' +
  'U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [sitemap()],
  build: {
    // ~8 KB gzipped for the whole site: inlining removes render-blocking requests.
    inlineStylesheets: 'always',
  },
  // Self-hosted from the lockfile-pinned @fontsource packages: no network fetch at build time.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-sans',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            unicodeRange: [LATIN_RANGE],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
            unicodeRange: [LATIN_RANGE],
          },
        ],
      },
    },
  ],
});
