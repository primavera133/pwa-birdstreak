export type ListItem = {
  name: string;
  date: Date;
  periodStart: Date;
  periodEnd: Date;
};

export type Game = {
  streakSpan: number;
  gameStartDate: string;
  lastPeriodEnded?: string;
  deadLine: string;
};

export type ParsedGame = {
  streakSpan: number;
  gameStartDate: Date;
  lastPeriodEnded?: Date;
  deadLine: Date;
};

export type BirdStreakStore = {
  streakSpan: number;
  gameStartDate: Date | undefined;
  lastPeriodEnded: Date | undefined;
  deadline: Date | undefined;
  list: ListItem[];
  disabled: boolean;
};
