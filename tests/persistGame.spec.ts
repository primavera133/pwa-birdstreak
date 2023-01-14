/* eslint-disable testing-library/prefer-screen-queries */
import { expect, test } from "@playwright/test";
import { GAME } from "../src/config/game";
import { parseGame } from "../src/logic/parseGame";
import { BirdStreakStore } from "../src/types";

test("starting and persisting a game by logging a bird", async ({
  page,
  context,
}) => {
  const fakeNow = new Date("January 1 2000 10:00:00").valueOf();

  await page.addInitScript(`{
  // Extend Date constructor to default to fakeNow
  Date = class extends Date {
    constructor(...args) {
      if (args.length === 0) {
        super(${fakeNow});
      } else {
        super(...args);
      }
    }
  }
  // Override Date.now() to start from fakeNow
  const __DateNowOffset = ${fakeNow} - Date.now();
  const __DateNow = Date.now;
  Date.now = () => __DateNow() + __DateNowOffset;
}`);

  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Start a new streak" }).click();

  await page.getByLabel("Bird name to log").fill("Kråka");

  await page.getByRole("button", { name: "Lock in Kråka" }).click();

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
  expect(parsedGame.gameStartDate).toStrictEqual(
    new Date("1999-12-31T23:00:00.000Z")
  );
  expect(parsedGame.lastPeriodEnded instanceof Date).toBeTruthy();
  expect(parsedGame.lastPeriodEnded).toStrictEqual(
    new Date("2000-01-02T22:59:59.999Z")
  );
  expect(parsedGame.deadline instanceof Date).toBeTruthy();
  expect(parsedGame.deadline).toStrictEqual(
    new Date("2000-01-04T22:59:59.999Z")
  );

  expect(parsedGame.list.length).toBe(1);
  expect(parsedGame.list[0].date instanceof Date).toBeTruthy();
  expect(parsedGame.list[0].date).toStrictEqual(
    new Date("2000-01-01T09:00:00.000Z")
  );
  expect(parsedGame.list[0].name).toBe("Kråka");
  expect(parsedGame.list[0].periodStart instanceof Date).toBeTruthy();
  expect(parsedGame.list[0].periodStart).toStrictEqual(
    new Date("1999-12-31T23:00:00.000Z")
  );
  expect(parsedGame.list[0].periodEnd instanceof Date).toBeTruthy();
  expect(parsedGame.list[0].periodEnd).toStrictEqual(
    new Date("2000-01-02T22:59:59.999Z")
  );

  expect(parsedGame.lastItem?.name).toBe("Kråka");
  expect(parsedGame.lastItem?.date instanceof Date).toBeTruthy();
  expect(parsedGame.lastItem?.date).toStrictEqual(
    new Date("2000-01-01T09:00:00.000Z")
  );
  expect(parsedGame.lastItem?.name).toBe("Kråka");
  expect(parsedGame.lastItem?.periodStart instanceof Date).toBeTruthy();
  expect(parsedGame.lastItem?.periodStart).toStrictEqual(
    new Date("1999-12-31T23:00:00.000Z")
  );
  expect(parsedGame.lastItem?.periodEnd instanceof Date).toBeTruthy();
  expect(parsedGame.lastItem?.periodEnd).toStrictEqual(
    new Date("2000-01-02T22:59:59.999Z")
  );

  // TODO: why is this value true?
  expect(parsedGame.hasRehydrated).toBeTruthy();
});
