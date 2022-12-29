import { ListItem } from "../types";
import { validateInput } from "./validateInput";
describe("validateInput", () => {
  it("should invalidate on duplicates", () => {
    const expectedInput = "aaa";
    const irrelevantProps = {
      key: "periodx",
      date: new Date(),
      periodStart: new Date(),
      periodEnd: new Date(),
      isNamed: true,
    };

    const list1: ListItem[] = [
      {
        ...irrelevantProps,
        name: "aaa",
      },
      {
        ...irrelevantProps,
        name: "bbb",
      },
    ];
    const list2: ListItem[] = [
      {
        ...irrelevantProps,
        name: "bbb",
      },
      {
        ...irrelevantProps,
        name: "aaa",
      },
      {
        ...irrelevantProps,
        name: "ccc",
      },
    ];
    const list3: ListItem[] = [
      {
        ...irrelevantProps,
        name: "bbb",
      },
      {
        ...irrelevantProps,
        name: "ccc",
      },
      {
        ...irrelevantProps,
        name: "aaa",
      },
    ];

    expect(validateInput(expectedInput, list1)).toBe(false);
    expect(validateInput(expectedInput, list2)).toBe(false);
    expect(validateInput(expectedInput, list3)).toBe(false);
  });
});
