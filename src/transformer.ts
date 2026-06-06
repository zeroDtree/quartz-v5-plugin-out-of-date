import type { PluggableList } from "unified";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import { DEFAULT_OUT_OF_DATE_OPTIONS } from "./defaults";
import type { OutOfDateTransformerOptions } from "./types";
import { computeStaleInfo } from "./util/stale";

export const OutOfDateTransformer: QuartzTransformerPlugin<Partial<OutOfDateTransformerOptions>> = (
  userOptions?: Partial<OutOfDateTransformerOptions>,
) => {
  const opts = { ...DEFAULT_OUT_OF_DATE_OPTIONS, ...userOptions };

  return {
    name: "OutOfDate",
    markdownPlugins(): PluggableList {
      return [
        () => (_tree, file) => {
          file.data.outOfDate = computeStaleInfo(file.data, opts);
        },
      ];
    },
  };
};
