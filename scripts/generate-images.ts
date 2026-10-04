/**
 * Generates derived images:
 * - src/assets/avatar.jpg: the profile photo, downloaded from Gravatar.
 * - src/assets/logo-mark.png: circular crop of the brand logo (src/assets/brand/logo.png),
 *   used as the nav logo. Both are optimized further at build time by astro:assets.
 * - public/favicon.png (64×64) and public/apple-touch-icon.png (180×180), from the brand logo.
 * - public/og.png (1200×630).
 *
 * Uses the same Geist fonts and palette as the site. Run after changing the logo, the Gravatar
 * photo or profile copy:
 *
 *   pnpm images
 *
 * Requires network access and Playwright's Chromium (`pnpm exec playwright install chromium`).
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { profile } from '../src/data/profile.ts';

const require = createRequire(import.meta.url);
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const assetsDir = fileURLToPath(new URL('../src/assets/', import.meta.url));

/* Avatar: resolved from the public Gravatar profile, so no email address lives in the repo. */
const GRAVATAR_PROFILE = 'https://gravatar.com/lukastborges.json';
const gravatar = (await (await fetch(GRAVATAR_PROFILE)).json()) as {
  entry: { thumbnailUrl: string }[];
};
const photoUrl = gravatar.entry[0]?.thumbnailUrl;
if (!photoUrl) throw new Error(`No Gravatar photo found at ${GRAVATAR_PROFILE}`);
const photoResponse = await fetch(`${photoUrl}?s=800`);
if (!photoResponse.ok) throw new Error(`Gravatar photo request failed: ${photoResponse.status}`);
const avatar = await sharp(Buffer.from(await photoResponse.arrayBuffer()))
  .resize(800, 800)
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();
await sharp(avatar).toFile(`${assetsDir}avatar.jpg`);
const avatarDataUri = `data:image/jpeg;base64,${avatar.toString('base64')}`;

/* Logo: the badge is a circle centered at (623, 591) with a ~485px radius, on a navy field. */
const logo = `${assetsDir}brand/logo.png`;
const BADGE = { left: 138, top: 106, size: 970 };
const circleMask = Buffer.from(
  `<svg width="${BADGE.size}" height="${BADGE.size}"><circle cx="${BADGE.size / 2}" cy="${BADGE.size / 2}" r="${BADGE.size / 2 - 1}" fill="#fff"/></svg>`,
);
const badge = await sharp(logo)
  .extract({ left: BADGE.left, top: BADGE.top, width: BADGE.size, height: BADGE.size })
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();
await sharp(badge).resize(256, 256).toFile(`${assetsDir}logo-mark.png`);
await sharp(badge).resize(64, 64).toFile(`${publicDir}favicon.png`);
/* Apple touch icons must be opaque: keep the logo's navy field around the badge. */
await sharp(logo)
  .extract({
    left: BADGE.left - 80,
    top: BADGE.top - 80,
    width: BADGE.size + 160,
    height: BADGE.size + 160,
  })
  .resize(180, 180)
  .toFile(`${publicDir}apple-touch-icon.png`);

function fontFace(family: string, pkg: string, file: string) {
  const path = require.resolve(`${pkg}/files/${file}`);
  const data = readFileSync(path).toString('base64');
  return `@font-face { font-family: '${family}'; font-weight: 100 900; src: url(data:font/woff2;base64,${data}) format('woff2'); }`;
}

const fonts = [
  fontFace('Geist', '@fontsource-variable/geist', 'geist-latin-wght-normal.woff2'),
  fontFace('Geist Mono', '@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2'),
].join('\n');

const [lead, rest] = profile.headline.split(/\s—\s/);

const base = `
  ${fonts}
  * { margin: 0; box-sizing: border-box; }
  body { background: #121317; color: #f3f3f6; font-family: 'Geist', sans-serif; -webkit-font-smoothing: antialiased; }
`;

const ogHtml = `<!doctype html><html><head><style>
  ${base}
  .og { position: relative; width: 1200px; height: 630px; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;
        background: radial-gradient(circle at 85% 10%, rgba(245, 185, 122, 0.18), transparent 45%), #121317; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 48px 48px; mask-image: radial-gradient(ellipse at 80% 20%, #000 10%, transparent 70%); }
  .top { position: relative; display: flex; align-items: center; gap: 18px; }
  .avatar { width: 64px; height: 64px; border-radius: 50%; box-shadow: 0 0 0 1px rgba(255,255,255,.15); }
  .name { font-size: 28px; font-weight: 500; letter-spacing: -0.01em; }
  .role { font-size: 28px; color: #8e909c; }
  h1 { position: relative; max-width: 980px; font-size: 64px; line-height: 1.04; letter-spacing: -0.035em; font-weight: 600; }
  h1 span { color: #8e909c; }
  .meta { position: relative; display: flex; gap: 16px; font: 400 20px 'Geist Mono'; color: #8e909c; letter-spacing: .02em; }
  .meta b { color: #f5b97a; font-weight: 400; }
</style></head><body><div class="og"><div class="grid"></div>
  <div class="top"><img class="avatar" src="${avatarDataUri}" alt="" /><div class="name">${profile.name}</div><div class="role">/ ${profile.title}</div></div>
  <h1>${lead} — <span>${rest}</span></h1>
  <div class="meta"><span><b>●</b> ${profile.location.city}, ${profile.location.country}</span><span>·</span><span>React · TypeScript · AI agents</span></div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(ogHtml);
await page.evaluate(() => document.fonts.ready);
await page.locator('.og').screenshot({ path: `${publicDir}og.png` });

await browser.close();
console.log(
  'Wrote src/assets/avatar.jpg, src/assets/logo-mark.png, public/favicon.png, public/apple-touch-icon.png and public/og.png',
);
