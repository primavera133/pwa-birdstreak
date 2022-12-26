/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";
import { GAME } from "../src/config/game";
import { parseGame } from "../src/logic/parseGame";
import { BirdStreakStore } from "../src/types";

test("starting a game", async ({ page, context }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Birdstreak/);

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

  // TODO: Test dates
  //   const nextPeriod = page.getByTestId("next-period");
  //   await expect(nextPeriod).toHaveText("Next period starts 28/12");

  // Test persisted game in localStorage
  const persistedState = context.storageState();
  let game = (await persistedState).origins
    .find((item) => item.origin === "http://localhost:3000")
    ?.localStorage.find((item) => item.name === "game")?.value;

  expect(game).toBeDefined();

  const parsedGame: BirdStreakStore = parseGame(game ?? "");

  expect(parsedGame.streakSpan).toBe(GAME.streakSpanMillis);
  expect(parsedGame.checkInterval).toBe(GAME.checkInterval);
  //   // TODO: test date values
  expect(parsedGame.gameStartDate instanceof Date).toBeTruthy();
  expect(parsedGame.lastPeriodEnded instanceof Date).toBeTruthy();
  expect(parsedGame.nextPeriodStarts instanceof Date).toBeTruthy();
  expect(parsedGame.deadline instanceof Date).toBeTruthy();

  expect(parsedGame.list.length).toBe(1);
  expect(parsedGame.list[0].date instanceof Date).toBeTruthy();
  expect(parsedGame.list[0].name).toBe("Kråka");
  expect(parsedGame.list[0].periodStart instanceof Date).toBeTruthy();
  expect(parsedGame.list[0].periodEnd instanceof Date).toBeTruthy();

  expect(parsedGame.lastItem?.name).toBe("Kråka");
  expect(parsedGame.lastItem?.date instanceof Date).toBeTruthy();
  expect(parsedGame.lastItem?.name).toBe("Kråka");
  expect(parsedGame.lastItem?.periodStart instanceof Date).toBeTruthy();
  expect(parsedGame.lastItem?.periodEnd instanceof Date).toBeTruthy();

  // TODO: why is this value true?
  expect(parsedGame.hasRehydrated).toBeTruthy();

  const heading3List = page.getByRole("heading", { name: "Your list" });
  await expect(heading3List).toBeVisible();
  const soFar = page.getByTestId("so-far");
  await expect(soFar).toHaveText(
    "So far you've locked in 1 period, a total of 2 days."
  );

  const listItems = await page.getByTestId("list").locator("li").all();
  expect(listItems.length).toBe(1);
  expect(page.getByTestId("listItemPeriod0")).toBeDefined(); // TODO: test date
  await expect(page.getByTestId("listItemName0")).toHaveText("Kråka");
});
