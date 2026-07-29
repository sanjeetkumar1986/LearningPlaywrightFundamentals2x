import { test, expect } from '@playwright/test';

test('verify the cheapest macmini in flipkart', async ({ page }) => {
  // Increase timeout if network is slow
    await page.goto('https://www.flipkart.com/');
    console.log(await page.title());
    expect(page).toHaveTitle('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!');
  const searchInput = await page.getByRole('textbox', { name: 'Search for products, brands and more' });
   await searchInput.clear();
   await searchInput.fill('mac mini');
   if(await page.getByRole('button', { name: '✕' }).isVisible()) {
    await page.getByRole('button', { name: '✕' }).click();
   }
   // Example: Click the SVG inside a specific element
await page.locator('form').locator('svg').click();
   await page.waitForLoadState('domcontentloaded');
  // Wait for product cards to load
  await page.waitForSelector('div._75nlfW, div[data-id]');

  // Locate individual product card elements
  // 3. Wait for search results container to load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000); // Small buffer for dynamic DOM hydration

  // 4. Extract titles & prices inside the browser DOM (Fast & Resilient to class name changes)
  const products = await page.evaluate(() => {
    const results: { title: string; price: number }[] = [];

    // Flipkart product cards are almost always wrapped in anchor <a> tags or standard product containers
    const cards = Array.from(document.querySelectorAll('a[href*="/p/"], div[data-id]'));

    cards.forEach((card) => {
      const text = card.textContent || '';

      // Extract title and price text using regex patterns from the card innerText
      const isMacMini = /apple/i.test(text) && /mac\s*mini/i.test(text);

      if (isMacMini) {
        // Match Indian Rupee symbol followed by numbers
        const priceMatch = text.match(/₹\s*([\d,]+)/);
        if (priceMatch) {
          const rawPrice = priceMatch[1].replace(/,/g, '');
          const numericPrice = parseInt(rawPrice, 10);

          // Get product title (first long readable line of text)
          const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);
          const title = lines.find((line) => /mac\s*mini/i.test(line)) || lines[0];

          if (title && !isNaN(numericPrice)) {
            results.push({ title, price: numericPrice });
          }
        }
      }
    });

    return results;
  });

  // Deduplicate products (since <a> tags and <div> tags might double-count the same item)
  const uniqueProducts = Array.from(
    new Map(products.map((item) => [item.title + item.price, item])).values()
  );

  console.log('Extracted Mac Minis:', uniqueProducts);

  // 5. Assertions
  expect(uniqueProducts.length).toBeGreaterThan(0);

  // 6. Sort by price ascending
  uniqueProducts.sort((a, b) => a.price - b.price);

  const cheapest = uniqueProducts[0];

  console.log('==================================================');
  console.log(`Cheapest Apple Mac Mini on Flipkart:`);
  console.log(`Title : ${cheapest.title}`);
  console.log(`Price : ₹${cheapest.price.toLocaleString('en-IN')}`);
  console.log('==================================================');
});