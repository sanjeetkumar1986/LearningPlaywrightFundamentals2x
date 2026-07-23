import { test, expect } from '@playwright/test';
test('Basic Web Test - Verify Orange HRM Page Title', async ({ page }) => {
    await page.goto('https://awesomeqa.com/hr/web/index.php/auth/login');
    console.log(await page.title());
    await expect(page).toHaveTitle('OrangeHRM');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('Awesomeqa@4321');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.locator('//div[text()="Terminated"]/ancestor::div[contains(@class, "table-row")]//i[contains(@class, "bi-trash")]').click();
    await page.screenshot({ path: 'screenshot.png' });
   
});