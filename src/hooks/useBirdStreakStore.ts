import create from "zustand";
import { GAME } from "../config/game";
import { BirdStreakStore } from "../types";

export const initialState = {
  streakSpan: GAME.streakSpanMillis,
  disabledIntervall: GAME.disabledIntervall,
  gameStartDate: undefined,
  lastPeriodEnded: undefined,
  deadline: undefined,
  list: [],
  disabled: true,
};

export const useBirdStreakStore = create<BirdStreakStore>(
  (set) => initialState
);
