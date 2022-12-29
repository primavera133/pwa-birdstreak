import { addMilliseconds, startOfDay, subDays } from "date-fns";
import { getBackfill } from "./getBackfill";

describe("getBackfill()", () => {
  test.each([
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 2],
    [4, 3],
    [5, 3],
  ])(
    "should return amount of streakSpan periods",
    (startOffset: number, expected: number) => {
      const startDay = subDays(new Date(), startOffset);
      const now = new Date();
      const streakSpan = 1000 * 60 * 60 * 24 * 2;

      const result = getBackfill(startDay, now, streakSpan);

      expect(result.length).toBe(expected);

      expect(result[0].key).toBe("period1");
      expect(result[0].name).toBe("");
      expect(result[0].date).toBeUndefined();
      expect(result[0].periodEnd).toEqual(
        addMilliseconds(result[0].periodStart, streakSpan - 1)
      );
      expect(result[0].periodStart).toEqual(startOfDay(startDay));
      expect(result[0].periodEnd).toEqual(
        addMilliseconds(startOfDay(startDay), streakSpan - 1)
      );
      expect(result[0].isNamed).toEqual(false);
    }
  );
});
