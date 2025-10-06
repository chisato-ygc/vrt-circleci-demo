// Visual Regression Tests for Dashboard
const { test, expect } = require('@playwright/test');

test.describe('Dashboard Visual Tests', () => {
  test('should match dashboard full page screenshot', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/dashboard');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Wait for animations
    await page.waitForTimeout(1000);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('dashboard-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match dashboard header', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const header = await page.locator('[data-testid="dashboard-header"]');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('dashboard-header.png');
  });

  test('should match metrics grid', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const metricsGrid = await page.locator('[data-testid="dashboard-grid"]');
    await expect(metricsGrid).toBeVisible();
    await expect(metricsGrid).toHaveScreenshot('dashboard-metrics.png');
  });

  test('should match individual metric cards', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Test each metric card
    const metricCards = [
      'metric-users',
      'metric-revenue',
      'metric-growth',
      'metric-satisfaction'
    ];
    
    for (const testId of metricCards) {
      const card = await page.locator(`[data-testid="${testId}"]`);
      await expect(card).toBeVisible();
      await expect(card).toHaveScreenshot(`${testId}.png`);
    }
  });

  test('should match chart section', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const chartSection = await page.locator('[data-testid="chart-section"]');
    await expect(chartSection).toBeVisible();
    await expect(chartSection).toHaveScreenshot('dashboard-chart.png');
  });

  test('should match recent activity section', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const activitySection = await page.locator('[data-testid="recent-activity"]');
    await expect(activitySection).toBeVisible();
    await expect(activitySection).toHaveScreenshot('dashboard-activity.png');
  });

  test('should verify navigation highlighting', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Verify dashboard nav link is active
    const dashboardNav = await page.locator('[data-testid="nav-dashboard"]');
    await expect(dashboardNav).toHaveClass(/active/);
  });
});

