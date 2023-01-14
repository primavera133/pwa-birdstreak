import { addDays, startOfDay } from "date-fns";
import { GAME } from "../config/game";
import { BirdStreakStore } from "../types";

export const migrate = (rehydratedGame: any): BirdStreakStore => {
  const [major, minor, patch] = rehydratedGame.appVersion
    .split(".")
    .map((v: string) => parseInt(v, 10));

  // Migrate bugfix for periodDate
  if (major === 0 && minor <= 3 && patch < 1) {
    console.log("migrate to 0.3.1");

    interface OldBirdStreakStore030 extends BirdStreakStore {
      nextPeriodStarts: any;
    }

    const lastItem = rehydratedGame.list[rehydratedGame.list.length - 1];

    const newGame: OldBirdStreakStore030 = {
      ...rehydratedGame,
    };
    // update periodStart
    newGame.periodStart = startOfDay(addDays(lastItem.periodEnd, 1));

    // remove legacy nextPeriodStarts
    delete newGame.nextPeriodStarts;

    // Update appVersion
    newGame.appVersion = `${process.env.REACT_APP_VERSION}`;

    // persist new data
    localStorage.setItem(GAME.persistKey, JSON.stringify(newGame));

    return newGame as BirdStreakStore;
  }

  return rehydratedGame;
};
