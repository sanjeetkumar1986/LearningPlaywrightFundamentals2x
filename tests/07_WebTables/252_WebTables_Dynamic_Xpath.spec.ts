import { test, expect } from '@playwright/test';


test('Basic verify how to handle multiple elements ', async ({ page }) => {

    // First of all, go to the link of the web table, 
    // find the correct Helen banquet, 
    // and then use a for loop to find the following simple 

    await page.goto("https://awesomeqa.com/webtable.html");

    //table[@id="customers"]/tbody/tr[5]/td[2]

    // 5 - i , 1 to 7 ( 1 header) 2 to 7
    // ]/td[
    // 2 - j , j -> 1,2,3
    // ]

    const firstPart = "//table[@id='customers']/tbody/tr[";
    const secondPart = "]/td[";
    const thirdPart = "]";

    const rows = await page.locator("//table[@id='customers']/tbody/tr").count();
    const cols = await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();

    for (let i = 2; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            console.log(dynamicPath);
            const data = await page.locator(dynamicPath).innerText();
            console.log(data);
            if (data.includes('Helen Bennett')) {
                const countryPath = `${dynamicPath}/following-sibling::td`;
                const countryText = await page.locator(countryPath).innerText();
                console.log('------');
                console.log(`Helen Bennett is In - ${countryText}`);
            }
        }

    }

    //await page.pause();






});