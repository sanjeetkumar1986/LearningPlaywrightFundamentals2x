import { test, expect } from '@playwright/test';
test('Basic Web Test - Verify Page Title', async ({ page }) => {
    await page.goto('https://www.spicejet.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle('SpiceJet - Flight Booking for Domestic and International, Cheap Air Tickets');
    await page.locator("//div[text()='From']/following-sibling::div/input").click();
    await page.locator("//div[text()='From']/following-sibling::div/input").fill("De");
    await page.getByText('Delhi', { exact: true }).click();
    
    await page.locator("//div[text()='To']/following-sibling::div/input").click();
    await page.locator("//div[text()='To']/following-sibling::div/input").fill("B");
    await page.getByText('Bengaluru', { exact: true }).click();
    await page.close();
    
});

// test.use({
//   // Use real installed Chrome channel if available to prevent bot drops
//   channel: 'chrome', 
//   launchOptions: {
//     args: ['--disable-http2'], // Prevents HTTP/2 network hangs on bot-protected sites
//   },
// });
test('Basic Web Test - Verify make my trip booking', async ({ page }) => {
    await page.goto('https://www.makemytrip.com/',{timeout: 60000});
    console.log(await page.title());
    await page.getByRole('textbox', { name: 'From' }).click();
   // await page.getByRole('textbox', { name: 'From' }).fill('De');
   await page.getByPlaceholder('From').fill('De');
    await page.getByRole('option', { name: 'DEL New Delhi' }).click();
    await page.locator('//input[@id="toCity"]').click();
    await page.getByPlaceholder('To').fill('PNQ');
   await page.getByRole('option', { name: 'PNQ Pune, India Pune Airport' }).click();
   // page.pause();
});