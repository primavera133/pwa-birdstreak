import { ListItem } from "../types";

export const validateInput = (
  input: string,
  list: ListItem[],
  currentPeriodStart: Date
) => {
  let isValid = true;

  for (const listItem of list) {
    if (
      listItem.name === input &&
      listItem.periodStart.toString() !== currentPeriodStart.toString()
    ) {
      isValid = false;
      break;
    }
  }
  return isValid;
};
