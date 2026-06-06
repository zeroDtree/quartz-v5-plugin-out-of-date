import type { OutOfDateTransformerOptions } from "./types";

export const DEFAULT_OUT_OF_DATE_OPTIONS: Required<
  Pick<OutOfDateTransformerOptions, "checkPaths" | "staleThreshold">
> = {
  checkPaths: ["/01-courses/", "/03-tools/"],
  staleThreshold: 60,
};
