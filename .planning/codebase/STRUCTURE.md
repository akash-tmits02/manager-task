# Directory Structure

## Project Root

```
task-manager/
├── .agent/                         # GSD agent configuration
├── .git/                           # Git repository
├── .gitignore                      # Standard Next.js ignores
├── .next/                          # Next.js build output (gitignored)
├── README.md                       # Project readme
├── app/                            # Next.js App Router pages
│   ├── api/                        # API route handlers
│   │   └── weather/
│   │       └── route.js            # Weather proxy API (GET)
│   ├── dashboard/
│   │   ├── dashboard.module.css    # Dashboard styles (218 lines)
│   │   └── page.js                 # Dashboard page (233 lines)
│   ├── favicon.ico                 # Site favicon
│   ├── globals.css                 # Global styles + Tailwind import (40 lines)
│   ├── layout.js                   # Root layout (AuthProvider + Navbar)
│   ├── login/
│   │   ├── login.module.css        # Login styles (174 lines)
│   │   └── page.js                 # Login page (81 lines)
│   ├── page.js                     # Root redirect page (23 lines)
│   ├── tasks/
│   │   ├── page.js                 # Tasks management page (165 lines)
│   │   └── tasks.module.css        # Tasks styles (277 lines)
│   └── todos/
│       └── page.js                 # Todos page (41 lines) — uses legacy components
├── components/                     # Shared React components
│   ├── AddTask.jsx                 # Add task form (30 lines) — legacy, unused
│   ├── Navbar.jsx                  # Navigation bar (53 lines)
│   ├── Navbar.module.css           # Navbar styles (85 lines)
│   └── TaskList.jsx                # Task list display (27 lines) — only used by /todos
├── eslint.config.mjs               # ESLint flat config
├── jsconfig.json                   # Path aliases (@/*)
├── lib/                            # Shared utilities
│   └── auth.js                     # Auth context + hook (44 lines)
├── next.config.mjs                 # Next.js configuration (empty)
├── node_modules/                   # Dependencies (gitignored)
├── package-lock.json               # npm lockfile
├── package.json                    # Project metadata + dependencies
├── postcss.config.mjs              # PostCSS config (Tailwind plugin)
└── public/                         # Static assets
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

## Key Locations

| Area | Path | Description |
|------|------|-------------|
| Pages | `app/*/page.js` | Route pages (Next.js App Router) |
| API Routes | `app/api/*/route.js` | Server-side API handlers |
| Shared Components | `components/*.jsx` | Reusable React components |
| Utilities | `lib/*.js` | Shared hooks and context |
| Styles | `app/*/*.module.css` | CSS Modules co-located with pages |
| Global Styles | `app/globals.css` | Root CSS + Tailwind import |
| Config | Root `*.mjs`, `*.json` | Build/lint/path configuration |
| Static Assets | `public/` | SVG icons (default Next.js assets) |

## Naming Conventions

- **Pages:** `page.js` (Next.js convention)
- **Components:** PascalCase `.jsx` files (e.g., `Navbar.jsx`, `AddTask.jsx`)
- **CSS Modules:** `<name>.module.css` co-located with their page/component
- **Utilities:** camelCase `.js` files (e.g., `auth.js`)
- **API Routes:** `route.js` (Next.js convention)
- **Config Files:** Lowercase with dots (e.g., `eslint.config.mjs`, `postcss.config.mjs`)

## File Size Summary

| File | Lines | Size |
|------|-------|------|
| `app/dashboard/page.js` | 233 | 8.9 KB |
| `app/tasks/page.js` | 165 | 5.3 KB |
| `app/tasks/tasks.module.css` | 277 | 5.6 KB |
| `app/dashboard/dashboard.module.css` | 218 | 4.1 KB |
| `app/login/login.module.css` | 174 | 3.2 KB |
| `app/api/weather/route.js` | 64 | 2.1 KB |
| `app/login/page.js` | 81 | 2.5 KB |
| `components/Navbar.module.css` | 85 | 1.6 KB |
| `components/Navbar.jsx` | 53 | 1.4 KB |
| `lib/auth.js` | 44 | 1.2 KB |
| `app/todos/page.js` | 41 | 972 B |
| `app/layout.js` | 35 | 774 B |
| `components/TaskList.jsx` | 27 | 734 B |
| `components/AddTask.jsx` | 30 | 661 B |
| `app/globals.css` | 40 | 662 B |
| `app/page.js` | 23 | 446 B |
