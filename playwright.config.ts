import { defineConfig, devices } from '@playwright/test';

// Dedicated port so tests never collide with a running `astro dev` (4321).
const PORT = 4329;
const BASE_PATH = process.env.BASE_PATH ?? '/lukasborges.me';

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH.replace(/\/$/, '')}/`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // --ignore-lock keeps preview in the foreground even if another preview server is running.
    command: `pnpm exec astro preview --port ${PORT} --ignore-lock`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
