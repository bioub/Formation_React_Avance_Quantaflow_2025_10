import { expect, test } from "vitest";
import { racineCarre } from "./3-racineCarre";

test("racineCarre", () => {
  expect(racineCarre(4)).toBe(2);
  expect(racineCarre(9)).toBe(3);
  expect(racineCarre(0)).toBe(0);
  expect(() => racineCarre(-1)).toThrow();
});