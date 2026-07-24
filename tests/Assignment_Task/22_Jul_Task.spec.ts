import { test, expect } from '@playwright/test';
test('Basic Web Test - Verify Hover Menu functionality', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');
    console.log(await page.title());
   // await expect(page).toHaveTitle('Hover Menu');
    await page.locator("//div[contains(text(),'Add-ons')]").hover();
    const subMenu = await page.getByLabel('Add-ons submenu');
    await subMenu.waitFor({ state: 'visible' });
    await subMenu.getByRole('menuitem').all().then(async (menuItems) => {
        for (const menuItem of menuItems) {
            const itemName = await menuItem.textContent();
            console.log(`Menu Item: ${itemName}`);
        }
    });
    await subMenu.getByRole('menuitem', { name: 'Wi-Fi' }).click();
    await page.close();

});