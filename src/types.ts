export type ListItem = {
  key: string;
  name: string;
  date?: Date;
  periodStart: Date;
  periodEnd: Date;
  isNamed: boolean;
};

export type UnparsedListItem = {
  name: string;
  date: string;
  periodStart: string;
  periodEnd: string;
};

export type BirdStreakStore = {
  appVersion: string;
  streakSpan: number;
  checkInterval: number;
  gameStartDate?: Date;
  lastPeriodEnded?: Date;
  periodStart?: Date;
  deadline?: Date;
  list: ListItem[];
  lastItem?: ListItem;
  hasRehydrated: boolean;
  editPeriod?: ListItem;
  singleDay: boolean;
};
