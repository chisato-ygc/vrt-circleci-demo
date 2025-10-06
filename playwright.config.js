// Playwright Configuration for Visual Regression Testing
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/visual',
  
  // Maximum time one test can run
  timeout: 30 * 1000,
  
  // Test configuration
  fullyParallel: false, // Run tests sequentially for VRT
  forbidOnly: !!process.env.CI, // Fail on CI if test.only is used
  retries: process.env.CI ? 2 : 0, // Retry on CI
  workers: 1, // Single worker for consistent screenshots
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'test-results/report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for tests
    baseURL: process.env.BASE_URL || 'http://localhost:5000',
    
    // Screenshot settings
    screenshot: 'only-on-failure',
    
    // Video settings
    video: 'retain-on-failure',
    
    // Trace settings (for debugging)
    trace: 'retain-on-failure',
  },

  // Configure projects for different browsers/viewports
  projects: [
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    {
      name: 'firefox-desktop',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },
    
    {
      name: 'mobile',
      use: { 
        ...devices['iPhone 12'],
      },
    },
  ],

  // Web server configuration - start Flask app before tests
  webServer: {
    command: 'python app/app.py',
    port: 5000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI, // Always start fresh in CI
    // In CI, stdout/stderr goes to terminal
    stdout: 'pipe',
    stderr: 'pipe',
  },
});

