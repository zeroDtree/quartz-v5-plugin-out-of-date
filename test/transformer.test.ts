import { describe, expect, it } from "vitest";
import type { QuartzPluginData } from "@quartz-community/types";
import { VFile } from "vfile";
import { OutOfDateTransformer } from "../src/transformer";
import { createCtx } from "./helpers";

describe("OutOfDateTransformer", () => {
  it("writes outOfDate metadata to vfile during markdown processing", () => {
    const ctx = createCtx();
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 90);
    oldDate.setHours(0, 0, 0, 0);

    const transformer = OutOfDateTransformer({ staleThreshold: 60 });
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];
    const plugin = plugins[0] as () => (tree: unknown, file: VFile) => void;
    const transform = plugin();

    const file = new VFile("# Test");
    file.data = {
      relativePath: "01-courses/test.md",
      dates: { modified: oldDate },
    } as Partial<QuartzPluginData>;

    transform({ type: "root", children: [] }, file);

    expect(file.data.outOfDate?.show).toBe(true);
    expect(file.data.outOfDate?.diffDays).toBeGreaterThan(60);
  });

  it("writes show:false for non-target paths", () => {
    const ctx = createCtx();
    const oldDate = new Date("2020-01-01");

    const transformer = OutOfDateTransformer({ staleThreshold: 60 });
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];
    const plugin = plugins[0] as () => (tree: unknown, file: VFile) => void;
    const transform = plugin();

    const file = new VFile("# Test");
    file.data = {
      relativePath: "notes/test.md",
      dates: { modified: oldDate },
    } as Partial<QuartzPluginData>;

    transform({ type: "root", children: [] }, file);

    expect(file.data.outOfDate).toEqual({ show: false });
  });
});
