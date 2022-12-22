import create from "zustand";
import { GAME } from "../config/game";
import { BirdStreakStore } from "../types";

export const useBirdStreakStore = create<BirdStreakStore>((set) => ({
  streakSpan: GAME.streakSpanMillis,
  gameStartDate: undefined,
  lastPeriodEnded: undefined,
  deadline: undefined,
  list: [],
  disabled: true,
}));
