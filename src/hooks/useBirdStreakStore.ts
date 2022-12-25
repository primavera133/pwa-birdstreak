import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { GAME } from "../config/game";
import { BirdStreakStore } from "../types";

export const initialState = {
  streakSpan: GAME.streakSpanMillis,
  checkInterval: GAME.checkInterval,
  gameStartDate: undefined,
  lastPeriodEnded: undefined,
  deadline: undefined,
  list: [],
  lastItem: undefined,
  hasRehydrated: false,
};

export const useBirdStreakStore = create<BirdStreakStore>(
  (set) => initialState
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useBirdStreakStore);
}
