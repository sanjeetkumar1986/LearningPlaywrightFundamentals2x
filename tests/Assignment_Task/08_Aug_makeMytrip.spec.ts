import { test, expect, Page } from '@playwright/test';


function extractNumericPrice(flightDetails: string): number | null {
  const match = flightDetails.match(/₹\s*([\d,]+)/);
  if (!match) return null;
  
  // Remove commas and spaces, then parse to a integer
  const numericString = match[1].replace(/,/g, '');
  return parseInt(numericString, 10);
}

async function countRowsinListbox(page: Page): Promise<number> {
  const uniqueFlights = new Set<string>();
  let previousCount = -1;
  let stableRepeats = 0;
  const maxScrolls = 50;

  // MakeMyTrip flight cards selector across virtual list iterations
  const flightCards = page.locator('[data-item-index], .listItem, [id^="listingCard_"]');

  // 1. Wait for at least one flight card to appear on screen (15s limit)
  try {
    await flightCards.first().waitFor({ state: 'visible', timeout: 15000 });
  } catch (e) {
    console.warn('Flight cards did not appear within 15 seconds.');
    return 0;
  }

  for (let i = 0; i < maxScrolls; i++) {
    // 2. Extract texts from currently rendered cards in DOM
    const texts = await flightCards.allInnerTexts();
    for (const text of texts) {
      const cleanText = text.trim();
      if (cleanText) {
        uniqueFlights.add(cleanText);
      }
    }

    // 3. Stop if no new unique flights were collected over 3 consecutive scrolls
    if (uniqueFlights.size === previousCount) {
      stableRepeats++;
      if (stableRepeats >= 3) break;
    } else {
      stableRepeats = 0;
    }
    previousCount = uniqueFlights.size;

    // 4. Scroll window directly (Avoids locator-specific evaluation hangs)
    await page.evaluate(() => window.scrollBy(0, 1000));

    // 5. Short pause for Virtuoso/infinite-scroll to render new DOM nodes
     await page.waitForTimeout(1000); 
  }

  console.log(`Total collected flights across scroll: ${uniqueFlights.size}`);
  let flightPrice: number | null = null;
  flightPrice = 0;
  for (const flight of uniqueFlights) {
   // console.log(`Flight: ${index} ${flight}`);
   if(extractNumericPrice(flight) !== null) {
     if(flightPrice === 0 || flightPrice > extractNumericPrice(flight)) {
       flightPrice = extractNumericPrice(flight);
     }
   }
  }
  console.log(`Lowest flight price found: ₹ ${flightPrice}`);
  return uniqueFlights.size;
}

test('Verify MakeMyTrip flight search functionality', async ({page}) => {
  test.setTimeout(120000);
  await page.addLocatorHandler(
    page.locator('.commonModal__close'), // Selector for the close button
    async () => {
      await page.locator('.commonModal__close').click();
    }
  );
    await page.goto('https://www.makemytrip.com/');
    await page.getByRole('textbox', { name: 'From' }).click();
    await page.getByRole('textbox', { name: 'From', exact: true }).fill('New Delhi');
    await page.getByRole('listbox').getByRole('option').first().click();
    await page.getByRole('textbox', { name: 'To' }).click();
    await page.getByRole('textbox', { name: 'To', exact: true }).fill('Pune');
    await page.waitForTimeout(1000); // Wait for suggestions to load
    await page.getByRole('listbox').getByRole('option').first().click();
   const dateCell = page.getByRole('gridcell', { name: 'Thu Aug 27' });
  await dateCell.click();
    // 5. Close datepicker overlay by hitting Escape
    await page.keyboard.press('Escape');
    const searchBtn = page.locator('a.widgetSearchBtn, a:has-text("Search")');
  await searchBtn.click();
  await expect(page).toHaveURL(/flight\/search/, { timeout: 30000 });
  const heading = page.locator('p.journey-title').first();

  // Verify visibility
  await expect(heading).toBeVisible({timeout: 60000});
  await countRowsinListbox(page).then((count) => {
    console.log(`Total flight options found: ${count}`);
    expect(count).toBeGreaterThan(0);
  });

});