import { test, expect } from '@playwright/test';

// Runs once before all tests in this file.
test.beforeAll(async () => {
  console.log('test.beforeAll: set up global state before all tests');
});

// Runs before each test.
test.beforeEach(async ({ page }) => {
  console.log('test.beforeEach: navigate to base page before each test');
  await page.goto('https://playwright.dev/');
});

// Runs after each test.
test.afterEach(async ({ page }, testInfo) => {
  console.log(`test.afterEach: completed ${testInfo.title} with status ${testInfo.status}`);
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `test-results/${testInfo.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.png` });
  }
});

// Runs once after all tests in this file.
test.afterAll(async () => {
  console.log('test.afterAll: clean up global state after all tests');
});

// Example tests to demonstrate the hooks.
test('verify Playwright title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test('verify Get started link is visible', async ({ page }) => {
  await expect(page.locator('text=Get started')).toBeVisible();
});
