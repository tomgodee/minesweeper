import { expect, test, describe } from "vitest";
import { isPositiveDigit } from "./Settings.methods";

describe("isPositiveDigit", () => {
  test("should return a match array if the string is a positive digit", () => {
    expect(isPositiveDigit("1")).toHaveLength(1);
    expect(isPositiveDigit("10")).toHaveLength(1);
  });

  test("should return null if the string is not a positive digit", () => {
    expect(isPositiveDigit("1.0")).toBeNull();
    expect(isPositiveDigit("-1")).toBeNull();
    expect(isPositiveDigit("abc")).toBeNull();
  });
});
