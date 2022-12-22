import isWithinInterval from "date-fns/isWithinInterval";
import { BirdStreakStore } from "../types";

export const checkDisabled = (
  now: Date,
  {
    lastPeriodEnded,
    gameStartDate,
    deadline,
  }: Pick<BirdStreakStore, "deadline" | "gameStartDate" | "lastPeriodEnded">
): boolean => {
  if (!lastPeriodEnded || !gameStartDate || !deadline) return true;

  const interval = {
    start: lastPeriodEnded ?? gameStartDate,
    end: deadline,
  };

  return !isWithinInterval(now, interval);
};
