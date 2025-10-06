// Visual Regression Tests for Homepage
const { test, expect } = require('@playwright/test');

test.describe('Homepage Visual Tests', () => {
  test('should match homepage full page screenshot', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Wait for animations to complete
    await page.waitForTimeout(1000);
    
    // Take full page screenshot and compare
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match hero section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of hero section only
    const heroSection = await page.locator('[data-testid="hero-section"]');
    await expect(heroSection).toBeVisible();
    await expect(heroSection).toHaveScreenshot('homepage-hero.png');
  });

  test('should match features section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Take screenshot of features section
    const featuresSection = await page.locator('[data-testid="features-section"]');
    await expect(featuresSection).toBeVisible();
    await expect(featuresSection).toHaveScreenshot('homepage-features.png');
  });

  test('should match navigation bar', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of navbar
    const navbar = await page.locator('[data-testid="navbar"]');
    await expect(navbar).toBeVisible();
    await expect(navbar).toHaveScreenshot('navbar.png');
  });

  test('should match stats section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Take screenshot of stats section
    const statsSection = await page.locator('[data-testid="stats-section"]');
    await expect(statsSection).toBeVisible();
    await expect(statsSection).toHaveScreenshot('homepage-stats.png');
  });

  test('should verify all feature cards are present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify all 4 feature cards exist
    const cards = await page.locator('[data-testid^="feature-card-"]');
    await expect(cards).toHaveCount(4);
    
    // Take screenshot of first card
    const firstCard = await page.locator('[data-testid="feature-card-1"]');
    await expect(firstCard).toHaveScreenshot('feature-card-sample.png');
  });
});

