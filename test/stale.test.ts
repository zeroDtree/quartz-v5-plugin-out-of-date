import { describe, expect, it } from "vitest";
import type { QuartzPluginData } from "@quartz-community/types";
import { computeStaleInfo, getFilePath, isTargetPath } from "../src/util/stale";

const asFileData = (data: Record<string, unknown>) => data as Partial<QuartzPluginData>;

describe("stale utilities", () => {
  it("prefers relativePath over filePath", () => {
    expect(
      getFilePath(asFileData({ relativePath: "01-courses/foo.md", filePath: "content/other.md" })),
    ).toBe("01-courses/foo.md");
  });

  it("strips content/ prefix from filePath fallback", () => {
    expect(getFilePath(asFileData({ filePath: "content/01-courses/foo.md" }))).toBe(
      "01-courses/foo.md",
    );
  });

  it("matches target paths with or without leading slash", () => {
    expect(isTargetPath("01-courses/foo.md", ["/01-courses/"])).toBe(true);
    expect(isTargetPath("03-tools/bar.md", ["03-tools/"])).toBe(true);
    expect(isTargetPath("notes/foo.md", ["/01-courses/"])).toBe(false);
  });

  it("returns show:false for non-target paths", () => {
    const result = computeStaleInfo(
      asFileData({ relativePath: "notes/foo.md", dates: { modified: new Date("2020-01-01") } }),
      { staleThreshold: 60 },
    );
    expect(result).toEqual({ show: false });
  });

  it("returns show:false for invalid dates", () => {
    const result = computeStaleInfo(
      asFileData({ relativePath: "01-courses/foo.md", frontmatter: { date: "not-a-date" } }),
      { staleThreshold: 60 },
    );
    expect(result).toEqual({ show: false });
  });

  it("returns show:false when within threshold", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const result = computeStaleInfo(
      asFileData({ relativePath: "01-courses/foo.md", dates: { modified: yesterday } }),
      { staleThreshold: 60 },
    );
    expect(result).toEqual({ show: false });
  });

  it("returns show:true when beyond threshold", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 90);
    oldDate.setHours(0, 0, 0, 0);

    const result = computeStaleInfo(
      asFileData({ relativePath: "01-courses/foo.md", dates: { modified: oldDate } }),
      { staleThreshold: 60 },
    );

    expect(result.show).toBe(true);
    expect(result.diffDays).toBeGreaterThan(60);
  });

  it("does not show warning exactly at threshold", () => {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - 60);
    thresholdDate.setHours(0, 0, 0, 0);

    const result = computeStaleInfo(
      asFileData({ relativePath: "03-tools/foo.md", dates: { modified: thresholdDate } }),
      { staleThreshold: 60 },
    );
    expect(result).toEqual({ show: false });
  });
});
