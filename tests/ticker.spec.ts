import { test, expect } from '@playwright/test';

test.describe('Site Ticker', () => {
  test('should render exactly one ticker on leaderboards page', async ({ page }) => {
    await page.goto('/leaderboards');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check that exactly one ticker exists
    const tickers = page.locator('[data-testid="site-ticker"]');
    await expect(tickers).toHaveCount(1);

    // Verify ticker is visible
    await expect(tickers.first()).toBeVisible();

    // Verify ticker has content
    await expect(tickers.first()).toContainText('SmartLead');
  });

  test('should render exactly one ticker on tools page', async ({ page }) => {
    await page.goto('/tools');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check that exactly one ticker exists
    const tickers = page.locator('[data-testid="site-ticker"]');
    await expect(tickers).toHaveCount(1);

    // Verify ticker is visible
    await expect(tickers.first()).toBeVisible();
  });

  test('should render exactly one ticker on homepage', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check that exactly one ticker exists
    const tickers = page.locator('[data-testid="site-ticker"]');
    await expect(tickers).toHaveCount(1);

    // Verify ticker is visible
    await expect(tickers.first()).toBeVisible();
  });
});