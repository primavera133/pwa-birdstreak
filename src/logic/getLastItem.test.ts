import { addDays } from "date-fns";
import { ListItem } from "../types";
import { getLastItem } from "./getLastItem";

describe("getLastItem", () => {
  it("should look for the item with the latest date", () => {
    const ListItem1: ListItem = {
      name: "aaa",
      date: new Date(),
      periodStart: new Date(),
      periodEnd: new Date(),
    };

    const ListItem2 = {
      name: "bbb",
      date: addDays(new Date(), 2),
      periodStart: new Date(),
      periodEnd: addDays(new Date(), 2),
    };

    const ListItem3 = {
      name: "ccc",
      date: addDays(new Date(), 4),
      periodStart: new Date(),
      periodEnd: addDays(new Date(), 4),
    };

    const itemName = "ccc";
    expect(getLastItem([ListItem1, ListItem2, ListItem3])?.name).toEqual(
      itemName
    );
    expect(getLastItem([ListItem3, ListItem2, ListItem1])?.name).toEqual(
      itemName
    );
    expect(getLastItem([ListItem1, ListItem3, ListItem2])?.name).toEqual(
      itemName
    );
  });
});
