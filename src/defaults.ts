import type { OutOfDateTransformerOptions } from "./types";

export const DEFAULT_OUT_OF_DATE_OPTIONS: Required<
  Pick<OutOfDateTransformerOptions, "checkPaths" | "staleThreshold">
> = {
  checkPaths: ["/计算机/", "/机器学习/"],
  staleThreshold: 45,
};
