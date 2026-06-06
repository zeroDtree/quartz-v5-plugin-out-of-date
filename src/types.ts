export interface OutOfDateTransformerOptions {
  /** Folder paths to check for staleness, e.g. ["/01-courses/", "/03-tools/"] */
  checkPaths?: string[];
  /** Days after last modification before showing a warning. Default: 60 */
  staleThreshold?: number;
}

export interface OutOfDateComponentOptions {
  /** When true, always show the warning callout (for testing). Component-only. */
  forceShow?: boolean;
}

/** YAML / public API union type (forceShow is component-only). */
export type OutOfDatePluginOptions = OutOfDateTransformerOptions & OutOfDateComponentOptions;

export interface OutOfDateData {
  show: boolean;
  diffDays?: number;
}

declare module "vfile" {
  interface DataMap {
    outOfDate?: OutOfDateData;
  }
}
