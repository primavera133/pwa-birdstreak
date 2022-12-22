import { parseISO } from "date-fns";
import { Game, ParsedGame } from "../types";

export const parseGame = (game: Game): ParsedGame => {
  return {
    ...game,
    gameStartDate: parseISO(game.gameStartDate),
    lastPeriodEnded: game.lastPeriodEnded
      ? parseISO(game.lastPeriodEnded)
      : undefined,
    deadLine: parseISO(game.deadLine),
  };
};
