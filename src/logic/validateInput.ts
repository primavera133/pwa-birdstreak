import { ListItem } from "../types";

export const validateInput = (input: string, list: ListItem[]) => {
  let isValid = true;

  for (const listItem of list) {
    if (listItem.name === input) {
      isValid = false;
      break;
    }
  }
  return isValid;
};
