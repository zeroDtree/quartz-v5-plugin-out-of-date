import type { QuartzPluginData } from "@quartz-community/types";
import { DEFAULT_OUT_OF_DATE_OPTIONS } from "../defaults";
import type { OutOfDateData, OutOfDateTransformerOptions } from "../types";

export function getFilePath(fileData: Partial<QuartzPluginData>): string {
  if (fileData.relativePath) {
    return fileData.relativePath;
  }
  return fileData.filePath?.replace(/^content\//, "") ?? "";
}

export function isTargetPath(filePath: string, checkPaths: string[]): boolean {
  return checkPaths.some((path) => filePath.includes(path.replace(/^\//, "")));
}

export function getLastModified(fileData: Partial<QuartzPluginData>): unknown {
  const frontmatter = fileData.frontmatter as { lastmod?: unknown; date?: unknown } | undefined;
  const frontmatterDate = frontmatter?.lastmod ?? frontmatter?.date;
  const sysDate = fileData.dates?.modified ?? fileData.dates?.created;
  return frontmatterDate ?? sysDate;
}

function parseModifiedDate(lastModified: unknown): Date | null {
  if (!lastModified || (typeof lastModified === "object" && !("toString" in lastModified))) {
    return null;
  }

  try {
    const dateValue =
      typeof lastModified === "object" ? lastModified.toString() : String(lastModified);
    const modifiedDate = new Date(dateValue);
    modifiedDate.setHours(0, 0, 0, 0);
    if (isNaN(modifiedDate.getTime())) {
      return null;
    }
    return modifiedDate;
  } catch {
    return null;
  }
}

export function computeStaleInfo(
  fileData: Partial<QuartzPluginData>,
  options?: Partial<OutOfDateTransformerOptions>,
): OutOfDateData {
  const checkPaths = options?.checkPaths ?? DEFAULT_OUT_OF_DATE_OPTIONS.checkPaths;
  const staleThreshold = options?.staleThreshold ?? DEFAULT_OUT_OF_DATE_OPTIONS.staleThreshold;

  const filePath = getFilePath(fileData);
  if (!isTargetPath(filePath, checkPaths)) {
    return { show: false };
  }

  const lastModified = getLastModified(fileData);
  const modifiedDate = parseModifiedDate(lastModified);
  if (!modifiedDate) {
    return { show: false };
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const diffTime = currentDate.getTime() - modifiedDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > staleThreshold) {
    return { show: true, diffDays };
  }

  return { show: false };
}
