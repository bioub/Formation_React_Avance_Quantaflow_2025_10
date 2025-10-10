import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { timeoutUpper } from "./5-timeoutUpper";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("timeoutUpper", async () => {
  // const originalSetTimeout = global.setTimeout;
  // (global as any).setTimeout = (fn: () => void, timeout?: number) => originalSetTimeout(fn, 10);

  // vi.useFakeTimers();

  const spy = vi.fn();
  timeoutUpper("abc", spy);
  vi.advanceTimersByTime(1000);
  expect(spy).toHaveBeenCalledWith("ABC");
  expect(spy).toHaveBeenCalledTimes(1);

  // global.setTimeout = originalSetTimeout;
  // vi.useRealTimers();
});
