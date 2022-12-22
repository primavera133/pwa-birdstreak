import { ListItem } from "../types";

export const getLastItem = (list: ListItem[]): ListItem | undefined => {
  if (!list) return;

  return list.reduce((accumulator: ListItem, currentValue: ListItem) => {
    return accumulator.date > currentValue.date ? accumulator : currentValue;
  }, list[0]);
};
