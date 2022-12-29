import {
  addDays,
  differenceInMilliseconds,
  startOfDay,
  subMilliseconds,
} from "date-fns";
import { ListItem } from "../types";

export const getBackfill = (
  startDate: Date,
  now: Date,
  streakSpan: number
): ListItem[] => {
  const diff = differenceInMilliseconds(startOfDay(now), startOfDay(startDate));
  const periodInDays = streakSpan / (1000 * 60 * 60 * 24);
  const amountOfListItems = Math.floor(diff / streakSpan);

  const list = [];
  for (let i = 0; i <= amountOfListItems; i++) {
    const itemStartDate = startOfDay(addDays(startDate, i * periodInDays));
    const itemEndDate = subMilliseconds(
      startOfDay(addDays(addDays(startDate, i * periodInDays), periodInDays)),
      1
    );
    list.push({
      key: `period${i + 1}`,
      name: "", // cannot use undefined, because JSON.stringify removes it
      date: itemStartDate,
      periodStart: itemStartDate,
      periodEnd: itemEndDate,
      isNamed: false,
    });
  }
  return list;
};
