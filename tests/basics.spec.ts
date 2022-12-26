/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";

test("starting a game", async ({ page, context }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title
  await expect(page).toHaveTitle(/Birdstreak/);
});
