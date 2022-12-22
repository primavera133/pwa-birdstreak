import { parseGame } from "./parseGame";

describe("parseGame()", () => {
  it("should parse all dates", () => {
    const g = JSON.stringify({
      streakSpan: 1000,
      gameStartDate: new Date(),
      lastPeriodEnded: new Date(),
      deadLine: new Date(),
    });
    const result = parseGame(JSON.parse(g));
    expect(result.gameStartDate instanceof Date).toBe(true);
  });
  it("should parse all dates, without lastPeriodEnded", () => {
    const g = JSON.stringify({
      streakSpan: 1000,
      gameStartDate: new Date(),
      deadLine: new Date(),
    });
    const result = parseGame(JSON.parse(g));
    expect(result.gameStartDate instanceof Date).toBe(true);
  });
});
