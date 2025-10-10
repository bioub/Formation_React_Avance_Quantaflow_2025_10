import { expect, test } from "vitest";
import { promiseRandomTimeout } from "./4-promiseRandomTimeout";

test("promiseRandomTimeout", async () => {
  const result = await promiseRandomTimeout("resolved");
  expect(result).toBe("resolved");
});