# quartz-v5-plugin-out-of-date

Warning callout when pages in selected folders have not been updated within a day threshold.

## Install

Place this plugin after a date plugin (for example `created-modified-date`) so `dates.modified` is set. Quartz builds the plugin from source on install.

```yaml
plugins:
  - source: github:quartz-community/created-modified-date
    enabled: true
    options:
      defaultDateType: modified
    order: 10
  - source: github:zeroDtree/quartz-v5-plugin-out-of-date
    enabled: true
    options:
      checkPaths:
        - /example-path-1/
        - /example-path-2/
      staleThreshold: 60
    order: 15
    layout:
      position: beforeBody
      priority: 21
```

## Options

| Option | Default | Meaning |
| --- | --- | --- |
| `checkPaths` | `/计算机/`, `/机器学习/` | Path fragments. A page matches if its path contains any entry. |
| `staleThreshold` | `45` | Days since the last update before the warning appears |
| `forceShow` | unset | When `true`, always show the callout (layout testing) |

## Development

```bash
git clone git@github.com:zeroDtree/quartz-v5-plugin-out-of-date.git my-plugins/quartz-v5-plugin-out-of-date
cd my-plugins/quartz-v5-plugin-out-of-date
npm ci
npm run dev
```

Point the site at `source: ./my-plugins/quartz-v5-plugin-out-of-date` while editing. After pushing, switch back to the GitHub source.

## Scripts

```bash
npm run check
npm run build
```

## License

MIT
