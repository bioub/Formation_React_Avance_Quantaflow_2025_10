import { expect, test } from "vitest";
import { fakeFetch } from "./fakeFetch";

test("fakeFetch function", async () => {
  const response = await fakeFetch("https://example.com");
  expect(response).toEqual({ data: "Response from https://example.com" });
});