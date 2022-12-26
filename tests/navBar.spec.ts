/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Birdstreak/);
});

test("navbar has logo", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // create a locator for link around Logo
  const linkedLogo = page.getByTestId("logoLink");
  await expect(linkedLogo).toHaveAttribute("href", "/");
  await linkedLogo.click();
  await expect(page).toHaveURL(/^/);
});

test("navbar has header", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a H1 element
  const getHeader1 = page.getByRole("heading", {
    level: 1,
  });
  await expect(getHeader1).toHaveText("Birdstreak");
  const linkedHeader1 = page.getByRole("link", { name: "Birdstreak" });
  await expect(linkedHeader1).toHaveAttribute("href", "/");
  await linkedHeader1.click();
  await expect(page).toHaveURL(/^/);
});

// TODO: Test right side menu
