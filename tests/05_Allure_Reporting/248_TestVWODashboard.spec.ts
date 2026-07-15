import { test, expect } from "@playwright/test";

// Load saved session — already logged in
test.use({
    storageState: "./user-session.json"
});

test.describe("VWO — session reuse", () => {

    test("go directly to dashboard — no login @P0 @smoke", async ({ page }, testInfo) => {

        await test.step("Open VWO dashboard using saved session", async () => {
            await page.goto("https://app.wingify.com/#/dashboard/get-started?accountId=1227004");
            console.log("Open VWO dashboard using saved session — storageState applied, no login form hit");
            await testInfo.attach("step-0-dashboard-loaded", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Verify dashboard URL loaded", async () => {
            await expect(page).toHaveURL(/dashboard/);
            console.log(`Verify dashboard URL loaded — ${page.url()}`);
            await testInfo.attach("step-1-dashboard-verified", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });
    });

    test("go directly to settings — no login @P1 @regression", async ({ page }, testInfo) => {

        await test.step("Open VWO account settings using saved session", async () => {
            await page.goto("https://app.wingify.com/#/settings/accounts/general?accountId=1227007");
            console.log("Open VWO account settings using saved session — still authenticated");
            await testInfo.attach("step-0-settings-loaded", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Verify settings URL loaded", async () => {
            await expect(page).toHaveURL(/settings/);
            console.log(`Verify settings URL loaded — ${page.url()}`);
            await testInfo.attach("step-1-settings-verified", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });
    });
});
