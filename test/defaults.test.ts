import { describe, expect, it } from "vitest";
import { DEFAULT_OUT_OF_DATE_OPTIONS } from "../src/defaults";
import pkg from "../package.json";

describe("defaults", () => {
  it("keeps package.json defaultOptions in sync with DEFAULT_OUT_OF_DATE_OPTIONS", () => {
    expect(pkg.quartz.defaultOptions).toEqual(DEFAULT_OUT_OF_DATE_OPTIONS);
  });
});
