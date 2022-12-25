import { parseISO } from "date-fns";
import { BirdStreakStore, UnparsedListItem } from "../types";

export const parseGame = (game: string): BirdStreakStore => {
  const g = JSON.parse(game);

  const parsedGame = {
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

  if (g.lastItem) {
    parsedGame.lastItem = {
      ...g.lastItem,
      date: parseISO(g.lastItem.date),
      periodStart: parseISO(g.lastItem.periodStart),
      periodEnd: parseISO(g.lastItem.periodEnd),
    };
  }
  return parsedGame;
};
