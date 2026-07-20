import { test, expect } from '@playwright/test';
const name: string = "Yoshi Tannamuri";

test('Verify Element inner Text', async ({ page }) => {
     await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');
      const elementText = await page.locator(
        `//td[text()="${name}"]/following-sibling::td`
      ).innerText();
    console.log(elementText);
    expect(elementText).toBe("Canada");
    console.log(`Country of ${name} is ${elementText}`);
});

async function findRowByName(page: Page, name: string): Promise<Locator> {
    while (true) {
        const row = page.locator('#employees-tbody tr').filter({ hasText: name });
        if (await row.count()) return row;

        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) throw new Error(`Row not found: ${name}`);
        await next.click();
    }
}
test('Verify Element by Filter', async ({ page }) => {


    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    //  Finding one person's email and country
    let name: string = "Mia Hoffmann";
    const row = await findRowByName(page, name);
    const email = await row.locator('td[data-col="email"]').innerText();
    const country = await row.locator('td[data-col="country"]').innerText();
    console.log(email, country);
    await page.waitForTimeout(5000);
     expect(email).toBe("mia@tta.dev");
     console.log(`Email of ${name} is ${email}`);

});