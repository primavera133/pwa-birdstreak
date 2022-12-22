import { parseISO } from "date-fns";
import { BirdStreakStore, UnparsedListItem } from "../types";

export const parseGame = (game: string): BirdStreakStore => {
  const g = JSON.parse(game);

  return {
    ...g,
    gameStartDate: parseISO(g.gameStartDate),
    lastPeriodEnded: g.lastPeriodEnded
      ? parseISO(g.lastPeriodEnded)
      : undefined,
    deadline: parseISO(g.deadline),
    list: g.list.map((unparsedlistItem: UnparsedListItem) => ({
      ...unparsedlistItem,
      date: parseISO(unparsedlistItem.date),
      periodStart: parseISO(unparsedlistItem.periodStart),
      periodEnd: parseISO(unparsedlistItem.periodEnd),
    })),
  };
};
