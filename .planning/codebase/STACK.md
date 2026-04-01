# Technology Stack

## Languages & Runtime

- **Language:** JavaScript (ES2022+)
- **Runtime:** Node.js (via Next.js server)
- **Module System:** ES Modules (`.mjs` configs, `import/export` throughout)

## Framework

- **Next.js 16.1.6** — App Router architecture
  - Server-side rendering via `app/` directory
  - API Routes via `app/api/` (Route Handlers)
  - Google Fonts integration via `next/font/google`
  - File-based routing
- **React 19.2.3** — UI library
- **React DOM 19.2.3** — DOM rendering

## Styling

- **Tailwind CSS v4** — utility-first CSS framework
  - PostCSS plugin: `@tailwindcss/postcss` (v4)
  - Imported via `@import "tailwindcss"` in `app/globals.css`
- **CSS Modules** — scoped component styles (`.module.css` files)
  - Co-located with page/component files
  - Naming: `<page>.module.css` or `<Component>.module.css`
- **CSS Custom Properties** — design tokens in `:root` of `app/globals.css`
  - `--background: #0f0c29` (dark purple-blue)
  - `--foreground: #ffffff`

## Data Visualization

- **Recharts v3.7.0** — charting library
  - Used in dashboard: `BarChart`, `PieChart`, `ResponsiveContainer`
  - Components: `Bar`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Pie`, `Cell`, `Legend`

## Linting

- **ESLint v9** — JavaScript linting
  - Config: `eslint.config.mjs` (flat config format)
  - Extends: `eslint-config-next` (v16.1.6) with Core Web Vitals rules

## Build & Config

- **PostCSS** — CSS processing via `postcss.config.mjs`
  - Plugin: `@tailwindcss/postcss`
- **Next.js Config** — `next.config.mjs` (currently empty/default)
- **jsconfig.json** — path alias `@/*` → `./*`

## Package Manager

- **npm** — uses `package-lock.json` (241KB)

## Key Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | Full-stack React framework |
| `react` | 19.2.3 | UI library |
| `react-dom` | 19.2.3 | DOM rendering |
| `recharts` | ^3.7.0 | Charts / data visualization |
| `tailwindcss` | ^4 | Utility CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind |
| `eslint` | ^9 | Linting |
| `eslint-config-next` | 16.1.6 | Next.js ESLint rules |

## Fonts

- **Geist Sans** — primary font (`--font-geist-sans`)
- **Geist Mono** — monospace font (`--font-geist-mono`)
- Loaded via `next/font/google` in `app/layout.js`
