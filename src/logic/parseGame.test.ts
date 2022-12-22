import { parseGame } from "./parseGame";

describe("parseGame()", () => {
  const d = new Date();
  it("should parse all dates", () => {
    const g = JSON.stringify({
      streakSpan: 1000,
      gameStartDate: new Date(),
      lastPeriodEnded: new Date(),
      deadLine: new Date(),
      list: [
        {
          name: "blåmes",
          date: d,
          periodStart: d,
          periodEnd: d,
        },
      ],
    });
    const result = parseGame(g);
    expect(result.gameStartDate instanceof Date).toBe(true);
  });
});
