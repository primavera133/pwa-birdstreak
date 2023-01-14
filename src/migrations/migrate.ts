import { addDays, startOfDay } from "date-fns";
import { GAME } from "../config/game";
import { useBirdStreakStore } from "../hooks/useBirdStreakStore";
import { BirdStreakStore } from "../types";

export const migrate = (rehydratedGame: any): BirdStreakStore => {
  const [major, minor, patch] = rehydratedGame.appVersion
    .split(".")
    .map((v: string) => parseInt(v, 10));

  console.log("!!!", major, minor, patch);

  // Migrate bugfix for periodDate
  if (major === 0 && minor <= 3 && patch < 1) {
    console.log(111);
    const lastItem = rehydratedGame.list[rehydratedGame.list.length - 1];
    const newGame = {
      ...rehydratedGame,
      // update periodStart
      periodStart: startOfDay(addDays(lastItem.periodEnd, 1)),

      // remove legacy nextPeriodStarts
    };
    delete newGame.nextPeriodStarts;
    console.log(222);
    localStorage.setItem(
      GAME.persistKey,
      JSON.stringify(useBirdStreakStore.getState())
    );
    console.log(333);
    return newGame as BirdStreakStore;
  }

  return rehydratedGame;
};
