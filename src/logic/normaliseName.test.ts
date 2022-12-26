import { normaliseName } from "./normaliseName";

describe("normaliseName", () => {
  it("should lower case all chars, except first", () => {
    const name = "Warbler From Hell";
    const result = normaliseName(name);
    expect(result).toBe("Warbler from hell");
  });
});
