import { test, expect } from '@playwright/test';

test('Click on Amazon product and verify in new tab', async ({ page, context }) => {
  // 1. Navigate to the Amazon search results page
  await page.goto('https://www.amazon.in/s?k=samsung+galaxy+z+fold8');

  // 2. Locate the link (adjust selector to target the exact title link)
  const productLink = page.getByRole('link', { name: 'Sponsored Ad - Galaxy Z Fold8 5G Smartphone with Galaxy AI' }).first();
  //await page.pause();
  // 3. Listen for the new page (tab) event while clicking the link
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    productLink.click()
  ]);
await newPage.bringToFront();
await newPage.waitForLoadState('domcontentloaded');
  // 4. Ensure the new tab finishes loading
 // await newPage.waitForLoadState();
// 5. Assertions
  // Verify the product title element is visible on the new page
  const titleLocator = newPage.locator('#productTitle').first();
  await expect(titleLocator).toBeVisible({ timeout: 10000 });
  // 5. Perform assertions/verifications on the new tab
  // Verify the new page URL contains the Amazon product details path
  await expect(newPage).toHaveURL(/\/dp\//);

  // Verify the product title is visible on the new page
  const newPageProductTitle = await newPage.title();
  console.log(`Product title in new tab: ${newPageProductTitle}`);
  //await expect(newPageProductTitle).toBeVisible();
  await page.bringToFront();
  const searchInput = page.getByRole('textbox', { name: 'Search Amazon.in' });
  await searchInput.fill('Book');
  await searchInput.press('Enter');

});