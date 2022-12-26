import { getBirdy } from "./getBirdy";

describe("getBirdy", () => {
  it("should return a random but valid bird url", () => {
    const result = getBirdy();
    expect(result).toMatch(/^\/bird\d\.webp/);
  });
});
