import { addMilliseconds, startOfDay, subMilliseconds } from "date-fns";
import { checkDisabled } from "./checkDisabled";

describe("checkDisabled()", () => {
  const streakSpan = 60000;
  const gameStartDate = startOfDay(new Date());

  it.only("should disble if last date is too recent", () => {
    const lastPeriodEnded = addMilliseconds(new Date(), streakSpan * 0.5); // last period ended less than 1 streak ago
    const deadline = addMilliseconds(lastPeriodEnded, streakSpan);

    const result = checkDisabled(new Date(), {
      lastPeriodEnded,
      deadline,
      gameStartDate,
    });
    expect(result).toBe(true);
  });

  it("should enable if last date is within one streakspan", () => {
    const lastPeriodEnded = subMilliseconds(new Date(), streakSpan * 0.5); // last period ended less than 1 streak ago
    const deadline = addMilliseconds(lastPeriodEnded, streakSpan);
    const result = checkDisabled(new Date(), {
      lastPeriodEnded,
      deadline,
      gameStartDate,
    });

    expect(result).toBe(false);
  });

  it("should disabel if last date is too long ago", () => {
    const lastPeriodEnded = subMilliseconds(new Date(), streakSpan * 1.5); // last period ended more than 1 streak ago
    const deadline = addMilliseconds(lastPeriodEnded, streakSpan);
    const result = checkDisabled(new Date(), {
      lastPeriodEnded,
      deadline,
      gameStartDate,
    });
    expect(result).toBe(true);
  });
});
