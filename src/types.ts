export type ListItem = {
  name: string;
  date: Date;
  periodStart: Date;
  periodEnd: Date;
};

export type UnparsedListItem = {
  name: string;
  date: string;
  periodStart: string;
  periodEnd: string;
};

export type BirdStreakStore = {
  streakSpan: number;
  disabledIntervall: number;
  gameStartDate: Date | undefined;
  lastPeriodEnded: Date | undefined;
  deadline: Date | undefined;
  list: ListItem[];
  disabled: boolean;
};
