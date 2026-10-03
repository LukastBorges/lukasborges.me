import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

const SECTIONS = ['about', 'experience', 'expertise', 'work', 'education', 'approach', 'contact'];

async function setTheme(page: Page, theme: 'dark' | 'light') {
  await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
}

/** Reveal-on-scroll content must be fully visible before auditing contrast. */
async function revealAll(page: Page) {
  await page.evaluate(() => {
    for (const element of document.querySelectorAll('[data-reveal]')) {
      element.classList.add('is-visible');
    }
  });
}

test.describe('page', () => {
  test('renders every section without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('./');
    await expect(page).toHaveTitle(/Lucas Borges/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Lucas Borges');
    for (const id of SECTIONS) await expect(page.locator(`#${id}`)).toBeAttached();
    expect(errors).toEqual([]);
  });

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('./');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('exposes SEO metadata and structured data', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\//);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og\.png$/);
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(jsonLd ?? '{}');
    expect(data['@type']).toBe('ProfilePage');
    expect(data.mainEntity.name).toBe('Lucas Borges');
  });

  test('never exposes a phone number', async ({ page }) => {
    await page.goto('./');
    const html = await page.content();
    expect(html).not.toMatch(/\+55\s?\(?31\)?\s?9\d{4}/);
  });
});

test.describe('accessibility', () => {
  for (const theme of ['dark', 'light'] as const) {
    test(`has no axe violations (${theme})`, async ({ page }) => {
      await setTheme(page, theme);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('./');
      await revealAll(page);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('skip link moves focus to main content', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard navigation is a desktop concern');
    await page.goto('./');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('reduced motion shows all content immediately', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const hidden = await page.$$eval(
      '[data-reveal]',
      (elements) => elements.filter((element) => getComputedStyle(element).opacity !== '1').length,
    );
    expect(hidden).toBe(0);
  });
});

test.describe('interactions', () => {
  test('theme toggle switches and persists', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Toggle color theme' }).click();
    await expect(html).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');
  });

  test('mobile menu opens, navigates, and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The menu button only exists on small screens');
    await page.goto('./');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const menu = page.locator('#nav-menu');
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: /Experience/ }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#experience$/);
  });

  test('earlier roles expand', async ({ page }) => {
    await page.goto('./');
    const summary = page.getByText(/earlier roles?/);
    await summary.click();
    await expect(page.getByRole('heading', { name: 'Intern' })).toBeVisible();
  });
});

test('works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Where I’ve done the work.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'lucas@lukasborges.me' })).toBeVisible();
  await context.close();
});
