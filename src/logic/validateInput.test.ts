import { subDays } from "date-fns";
import { ListItem } from "../types";
import { validateInput } from "./validateInput";
describe("validateInput", () => {
  it("should invalidate on duplicates", () => {
    const expectedInput = "aaa";
    const currentPeriodStart = new Date();
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
        periodStart: subDays(new Date(), 2),
      },
      {
        ...irrelevantProps,
        name: "bbb",
        periodStart: subDays(new Date(), 4),
      },
    ];
    const list2: ListItem[] = [
      {
        ...irrelevantProps,
        name: "bbb",
        periodStart: subDays(new Date(), 2),
      },
      {
        ...irrelevantProps,
        name: "aaa",
        periodStart: subDays(new Date(), 4),
      },
      {
        ...irrelevantProps,
        name: "ccc",
        periodStart: subDays(new Date(), 6),
      },
    ];
    const list3: ListItem[] = [
      {
        ...irrelevantProps,
        name: "bbb",
        periodStart: subDays(new Date(), 2),
      },
      {
        ...irrelevantProps,
        name: "ccc",
        periodStart: subDays(new Date(), 4),
      },
      {
        ...irrelevantProps,
        name: "aaa",
        periodStart: subDays(new Date(), 6),
      },
    ];

    expect(validateInput(expectedInput, list1, currentPeriodStart)).toBe(false);
    expect(validateInput(expectedInput, list2, currentPeriodStart)).toBe(false);
    expect(validateInput(expectedInput, list3, currentPeriodStart)).toBe(false);
  });

  it("should allow edit of item of same date", () => {
    const expectedInput = "aaa";
    const currentPeriodStart = new Date();
    const irrelevantProps = {
      key: "periodx",
      date: new Date(),
      periodStart: new Date(),
      periodEnd: new Date(),
      isNamed: true,
    };

    const list: ListItem[] = [
      {
        ...irrelevantProps,
        name: "aaa",
        periodStart: new Date(),
      },
      {
        ...irrelevantProps,
        name: "bbb",
        periodStart: subDays(new Date(), 4),
      },
      {
        ...irrelevantProps,
        name: "ccc",
        periodStart: subDays(new Date(), 6),
      },
    ];

    expect(validateInput(expectedInput, list, currentPeriodStart)).toBe(true);
  });
});
