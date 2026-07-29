import {test,expect} from '@playwright/test';

test('verify the cheapest macmini in flipkart',async({page,context})=>{
    //navigate to flipkart
    await page.goto('https://www.flipkart.com/');
    console.log(await page.title());
    expect(page).toHaveTitle('Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!');
  const searchInput = await page.getByRole('textbox', { name: 'Search for products, brands and more' });
   await searchInput.clear();
   await searchInput.fill('macmini');
   await page.getByRole('image', { name: 'Search Icon' }).click();
  // await searchInput.press('Enter');
   await page.waitForLoadState('domcontentloaded');
  const productCards = await page.locator('div[data-id]');
  await productCards.first().waitFor({ state: 'visible' });
  const productCount = await productCards.count();
  console.log(`Found ${productCount} product cards.`);
  const products: { title: string; price: number }[] = [];
  for (let i = 0; i < productCount; i++) {
    const card = productCards.nth(i);
    const title = await card.locator('a.pIpigb').getAttribute('title');
    const priceText = await card.locator('a.fb4uj3').textContent();
    if (title && priceText) {
      const priceMatch = priceText.match(/₹\s*([\d,]+)/);
      if (priceMatch) {
        const rawPrice = priceMatch[1].replace(/,/g, '');
        const numericPrice = parseInt(rawPrice, 10);
        if(title.toLowerCase().includes('mac mini')) {
        products.push({ title, price: numericPrice });
        }
      }
    }
  }
  expect(products.length).toBeGreaterThan(0);
  products.sort((a, b) => a.price - b.price);
  const cheapestProduct = products[0];
  console.log(`Cheapest Mac Mini: ${cheapestProduct.title} at ₹${cheapestProduct.price}`);
});