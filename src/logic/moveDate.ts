import { addDays, subDays } from "date-fns";
import { BirdStreakStore } from "../types";

export const moveDate = (
  testData: BirdStreakStore,
  direction: "forward" | "backward",
  amount: number
) => {
  console.log("testData", testData);

  const mover = direction === "forward" ? addDays : subDays;

  if (testData.gameStartDate)
    testData.gameStartDate = mover(testData.gameStartDate, amount);

  if (testData.lastPeriodEnded)
    testData.lastPeriodEnded = mover(testData.lastPeriodEnded, amount);

  if (testData.periodStart)
    testData.periodStart = mover(testData.periodStart, amount);

  if (testData.deadline) testData.deadline = mover(testData.deadline, amount);

  if (testData.list) {
    testData.list = testData.list.map((item) => {
      const newItem = {
        ...item,
      };
      if (newItem.date) newItem.date = mover(newItem.date, amount);
      if (newItem.periodStart)
        newItem.periodStart = mover(newItem.periodStart, amount);
      if (newItem.periodEnd)
        newItem.periodEnd = mover(newItem.periodEnd, amount);

      return newItem;
    });
  }

  if (testData.lastItem) {
    const newItem = {
      ...testData.lastItem,
    };
    if (newItem.date) newItem.date = mover(newItem.date, amount);
    if (newItem.periodStart)
      newItem.periodStart = mover(newItem.periodStart, amount);
    if (newItem.periodEnd) newItem.periodEnd = mover(newItem.periodEnd, amount);

    testData.lastItem = newItem;
  }

  if (testData.editPeriod) {
    const newItem = {
      ...testData.editPeriod,
    };
    if (newItem.date) newItem.date = mover(newItem.date, amount);
    if (newItem.periodStart)
      newItem.periodStart = mover(newItem.periodStart, amount);
    if (newItem.periodEnd) newItem.periodEnd = mover(newItem.periodEnd, amount);

    testData.lastItem = newItem;
  }

  return testData;
};
