import { test, expect } from '@playwright/test';

test('has correct title', async ({ page }) => {
  await page.goto('https://www.tylertech.com');
  await expect(page).toHaveTitle(/Tyler Technologies/);
});

test('twitter link correct', async ({ page, context }) => {
  await page.goto('https://www.tylertech.com');
  const pagePromise = context.waitForEvent('page');
  await page.getByTitle("Twitter").click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL("https://twitter.com/tylertech");
});


