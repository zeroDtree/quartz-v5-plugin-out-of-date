import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import { classNames } from "@quartz-community/utils/lang";
import { i18n } from "../i18n";
import type { OutOfDateComponentOptions } from "../types";

function OutOfDateWarning({
  displayClass,
  title,
  message,
}: {
  displayClass?: string;
  title: string;
  message: string;
}) {
  return (
    <div class={classNames(displayClass, "callout")} data-callout="warning">
      <div class="callout-title">
        <div class="callout-icon"></div>
        <div class="callout-title-inner">{title}</div>
      </div>
      <div class="callout-content">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ((userOpts?: OutOfDateComponentOptions) => {
  const config = userOpts ?? {};

  const OutOfDate: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
    const locale = cfg.locale ?? "en-US";
    const t = i18n(locale).components.outOfDate;

    if (config.forceShow) {
      return (
        <OutOfDateWarning
          displayClass={displayClass}
          title={t.title}
          message={t.forceShowMessage}
        />
      );
    }

    const staleInfo = fileData.outOfDate;
    if (!staleInfo?.show || staleInfo.diffDays == null) {
      return null;
    }

    return (
      <OutOfDateWarning
        displayClass={displayClass}
        title={t.title}
        message={t.staleMessage({ diffDays: staleInfo.diffDays })}
      />
    );
  };

  return OutOfDate;
}) satisfies QuartzComponentConstructor<OutOfDateComponentOptions>;
