// Visual Regression Tests for Profile Page
const { test, expect } = require('@playwright/test');

test.describe('Profile Page Visual Tests', () => {
  test('should match profile full page screenshot', async ({ page }) => {
    // Navigate to profile page
    await page.goto('/profile');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Wait for animations
    await page.waitForTimeout(1000);
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('profile-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('should match profile header', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    
    const header = await page.locator('[data-testid="profile-header"]');
    await expect(header).toBeVisible();
    await expect(header).toHaveScreenshot('profile-header.png');
  });

  test('should match profile sidebar', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const sidebar = await page.locator('[data-testid="profile-sidebar"]');
    await expect(sidebar).toBeVisible();
    await expect(sidebar).toHaveScreenshot('profile-sidebar.png');
  });

  test('should match profile content area', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const content = await page.locator('[data-testid="profile-content"]');
    await expect(content).toBeVisible();
    await expect(content).toHaveScreenshot('profile-content.png');
  });

  test('should match project items', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Test first project item
    const project1 = await page.locator('[data-testid="project-1"]');
    await expect(project1).toBeVisible();
    await expect(project1).toHaveScreenshot('profile-project-item.png');
  });

  test('should verify user information is displayed', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    
    // Verify user name is present
    await expect(page.locator('.profile-name')).toContainText('Chisato Yaguchi');
    
    // Verify role is present
    await expect(page.locator('.profile-role')).toContainText('DevOps Engineer');
  });

  test('should verify navigation highlighting', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    
    // Verify profile nav link is active
    const profileNav = await page.locator('[data-testid="nav-profile"]');
    await expect(profileNav).toHaveClass(/active/);
  });
});

