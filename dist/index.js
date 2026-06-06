import { createRequire } from 'module';

createRequire(import.meta.url);

// src/defaults.ts
var DEFAULT_OUT_OF_DATE_OPTIONS = {
  checkPaths: ["/01-courses/", "/03-tools/"],
  staleThreshold: 60
};

// src/util/stale.ts
function getFilePath(fileData) {
  if (fileData.relativePath) {
    return fileData.relativePath;
  }
  return fileData.filePath?.replace(/^content\//, "") ?? "";
}
function isTargetPath(filePath, checkPaths) {
  return checkPaths.some((path) => filePath.includes(path.replace(/^\//, "")));
}
function getLastModified(fileData) {
  const frontmatter = fileData.frontmatter;
  const frontmatterDate = frontmatter?.lastmod ?? frontmatter?.date;
  const sysDate = fileData.dates?.modified ?? fileData.dates?.created;
  return frontmatterDate ?? sysDate;
}
function parseModifiedDate(lastModified) {
  if (!lastModified || typeof lastModified === "object" && !("toString" in lastModified)) {
    return null;
  }
  try {
    const dateValue = typeof lastModified === "object" ? lastModified.toString() : String(lastModified);
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
function computeStaleInfo(fileData, options) {
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
  const currentDate = /* @__PURE__ */ new Date();
  currentDate.setHours(0, 0, 0, 0);
  const diffTime = currentDate.getTime() - modifiedDate.getTime();
  const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
  if (diffDays > staleThreshold) {
    return { show: true, diffDays };
  }
  return { show: false };
}

// src/transformer.ts
var OutOfDateTransformer = (userOptions) => {
  const opts = { ...DEFAULT_OUT_OF_DATE_OPTIONS, ...userOptions };
  return {
    name: "OutOfDate",
    markdownPlugins() {
      return [
        () => (_tree, file) => {
          file.data.outOfDate = computeStaleInfo(file.data, opts);
        }
      ];
    }
  };
};

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    outOfDate: {
      title: "Warning",
      staleMessage: ({ diffDays }) => `This page was last updated over ${diffDays} days ago. Content may be outdated.`,
      forceShowMessage: "[Test] This page may be outdated. Please verify the information is still current."
    }
  }
};

// src/i18n/locales/zh-CN.ts
var zh_CN_default = {
  components: {
    outOfDate: {
      title: "\u8B66\u544A",
      staleMessage: ({ diffDays }) => `\u672C\u6587\u6700\u540E\u66F4\u65B0\u5DF2\u8D85\u8FC7 ${diffDays} \u5929\u3002\u5185\u5BB9\u53EF\u80FD\u5DF2\u7ECF\u8FC7\u65F6\uFF0C\u8BF7\u6CE8\u610F\u53C2\u8003\u65F6\u6548\u6027\u3002`,
      forceShowMessage: "\u3010\u6D4B\u8BD5\u3011\u672C\u6587\u6700\u540E\u66F4\u65B0\u53EF\u80FD\u5DF2\u8FC7\u65F6\uFF0C\u8BF7\u6CE8\u610F\u53C2\u8003\u65F6\u6548\u6027\u3002"
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "zh-CN": zh_CN_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/OutOfDate.tsx
function OutOfDateWarning({
  displayClass,
  title,
  message
}) {
  return /* @__PURE__ */ u2("div", { class: classNames(displayClass, "callout"), "data-callout": "warning", children: [
    /* @__PURE__ */ u2("div", { class: "callout-title", children: [
      /* @__PURE__ */ u2("div", { class: "callout-icon" }),
      /* @__PURE__ */ u2("div", { class: "callout-title-inner", children: title })
    ] }),
    /* @__PURE__ */ u2("div", { class: "callout-content", children: /* @__PURE__ */ u2("p", { children: message }) })
  ] });
}
var OutOfDate_default = ((userOpts) => {
  const config = userOpts ?? {};
  const OutOfDate = ({ fileData, displayClass, cfg }) => {
    const locale = cfg.locale ?? "en-US";
    const t2 = i18n(locale).components.outOfDate;
    if (config.forceShow) {
      return /* @__PURE__ */ u2(
        OutOfDateWarning,
        {
          displayClass,
          title: t2.title,
          message: t2.forceShowMessage
        }
      );
    }
    const staleInfo = fileData.outOfDate;
    if (!staleInfo?.show || staleInfo.diffDays == null) {
      return null;
    }
    return /* @__PURE__ */ u2(
      OutOfDateWarning,
      {
        displayClass,
        title: t2.title,
        message: t2.staleMessage({ diffDays: staleInfo.diffDays })
      }
    );
  };
  return OutOfDate;
});

export { OutOfDate_default as OutOfDate, OutOfDateTransformer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map