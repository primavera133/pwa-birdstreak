/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";
import { setFakeNow } from "../testHelpers/setFakeNow";

test("start a game, log a bird", async ({ page, context }) => {
  // Set date
  const fakeNow = new Date("January 1 2000 10:00:00").valueOf();
  await page.addInitScript(setFakeNow(fakeNow));

  await page.goto("http://localhost:3000/");

  // Expect a H2 element
  const getHeader1 = page.getByRole("heading", {
    level: 2,
  });
  await expect(getHeader1).toHaveText("Start game");

  await page.getByRole("button", { name: "Start a new streak" }).click();

  const header2 = page.getByRole("heading", { level: 2 });
  await expect(header2).toHaveText("Log your next bird");

  await page.getByLabel("Bird name to log").fill("Kråka");

  await page.getByRole("button", { name: "Lock in Kråka" }).click();

  const alert = page.getByRole("alertdialog");
  await expect(alert).toBeVisible();
  const title = alert.getByText("Lock in Kråka");
  await expect(title).toBeVisible();

  const doItBtn = alert.getByRole("button", { name: "Lock" });
  await expect(doItBtn).toBeVisible();
  await doItBtn.click();

  // Expect new infobox wih header
  await expect(
    page.getByRole("heading", {
      name: "You have logged Kråka for this period.",
    })
  ).toBeVisible();

  const nextPeriod = page.getByTestId("next-period");
  await expect(nextPeriod).toHaveText("Next period starts 3/1");

  const heading3List = page.getByRole("heading", { name: "Your list" });
  await expect(heading3List).toBeVisible();
  const soFar = page.getByTestId("so-far");
  await expect(soFar).toHaveText(
    "So far you've locked in 1 period, a total of 2 days."
  );

  const listItems = await page.getByTestId("list").locator("li").all();
  expect(listItems.length).toBe(1);
  await expect(page.getByTestId("listItemPeriod0")).toHaveText("1/1 - 2/1");
  await expect(page.getByTestId("listItemName0")).toHaveText("Kråka");

  // Fast forward 2 days, form should re-appear
  const fakeNow2 = new Date("January 3 2000 10:00:00").valueOf();
  await page.addScriptTag({
    content: setFakeNow(fakeNow2),
  });

  //   // TODO: investigate later
  //   //   const soFar2 = page.getByTestId("so-far");
  //   //   await expect(soFar2).toHaveText(
  //   //     "So far you've locked in 1 period, a total of 2 days."
  //   //   );
  //   //   expect(soFar2).not.toBeDefined();

  const header2again = page.getByRole("heading", { level: 2 });
  await expect(header2again).toHaveText("Log your next bird");
  await page.screenshot({ path: "screenshot.png", fullPage: true });

  // Fast forward 3 days, show urgent deadline reminder
  const fakeNow3 = new Date("January 4 2000 10:00:00").valueOf();
  await page.addScriptTag({
    content: setFakeNow(fakeNow3),
  });

  const deadline = page.getByText("Log next bird before end of today!");
  await expect(deadline).toBeVisible();
  await page.screenshot({ path: "screenshot2.png", fullPage: true });
});
