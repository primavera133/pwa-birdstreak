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
  checkInterval: number;
  gameStartDate?: Date;
  lastPeriodEnded?: Date;
  deadline?: Date;
  list: ListItem[];
  lastItem?: ListItem;
  hasRehydrated: boolean;
};
