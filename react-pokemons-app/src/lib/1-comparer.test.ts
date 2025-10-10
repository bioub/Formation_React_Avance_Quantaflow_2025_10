import { expect, test } from "vitest";
import { comparer } from "./1-comparer";

test("comparer", () => {
  expect(comparer(5, 10)).toBe("Trop petit");
  expect(comparer(15, 10)).toBe("Trop grand");
  expect(comparer(10, 10)).toBe("Gagné");
});