import { expect, test } from "vitest";
import { pairs } from "./2-pairs";

test("pairs", () => {
  expect(pairs([1, 2, 3, 4, 5])).toEqual([2, 4]);
  expect(pairs([10, 15, 20, 25])).toEqual([10, 20]);
  expect(pairs([1, 3, 5])).toEqual([]);
});
