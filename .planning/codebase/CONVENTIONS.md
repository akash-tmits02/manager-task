# Code Conventions

## Component Patterns

### Client Components
All pages and components use the `"use client"` directive. There are no server components in the app (aside from `app/layout.js` which is technically a server component but renders client components).

### Component Structure
Pages follow a consistent pattern:
```jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import styles from "./page.module.css";

export default function PageName() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Auth guard
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Load data from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, []);

  if (loading || !user) return null;

  return <div className={styles.page}>...</div>;
}
```

### Shared Components
Located in `components/` directory:
- Use `.jsx` extension
- PascalCase naming
- Accept props directly (no TypeScript interfaces)
- `"use client"` directive at top

## Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| Components | PascalCase | `Navbar`, `AddTask`, `TaskList` |
| Page files | `page.js` (Next.js) | `app/dashboard/page.js` |
| CSS Modules | kebab-case or page name | `dashboard.module.css` |
| CSS classes | camelCase | `.kpiCard`, `.weatherBody`, `.addForm` |
| Hooks | `use` prefix | `useAuth()` |
| Constants | UPPER_SNAKE or PascalCase | `PRIORITIES`, `KPI_COLORS`, `PIE_COLORS` |
| Functions | camelCase | `handleLogin`, `toggleComplete`, `deleteTask` |
| State variables | camelCase | `weatherLoading`, `weatherErr` |

## CSS Patterns

### Design System Colors
The app uses a consistent dark theme palette:
- **Background:** `#0f0c29` (deep indigo) with gradient variations
- **Primary accent:** `#a78bfa` (violet/purple)
- **Secondary accent:** `#60a5fa` (blue)
- **Success:** `#34d399` (emerald green)
- **Warning:** `#f59e0b` (amber)
- **Danger:** `#f87171` (red)

### Gradient Text Pattern
Repeated across multiple files for headings:
```css
background: linear-gradient(90deg, #a78bfa, #60a5fa);
-webkit-background-clip: text;
background-clip: text;
-webkit-text-fill-color: transparent;
```

### Glassmorphism Pattern
Glass-like card surfaces used throughout:
```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 20px;
backdrop-filter: blur(20px);  /* on some elements */
```

### CSS Custom Properties for Dynamic Colors
Used for priority colors and accent colors:
```css
style={{ "--accent": k.color }}    /* KPI cards */
style={{ "--pcolor": PRIORITY_COLORS[p] }}  /* Priority badges */
```

### Hover Animations
Consistent micro-interaction pattern:
```css
transition: transform 0.2s, box-shadow 0.2s;
/* on hover: */
transform: translateY(-2px);
box-shadow: 0 8px 25px rgba(...);
```

## Error Handling

- **Login errors:** Displayed inline via state variable + conditional rendering
- **Weather errors:** Boolean `weatherErr` state → "Weather unavailable" message
- **API errors:** Try/catch in weather route with cascade fallback pattern
- **No global error boundary** implemented

## Import Order

General pattern observed (not enforced):
1. React imports (`useState`, `useEffect`)
2. Next.js imports (`useRouter`, `Link`)
3. Local imports (hooks, components)
4. CSS Module imports (always last)

## File Encoding

- Most files use CRLF line endings (`\r\n`) — Windows-native
- Some files use LF (`\n`) — `app/page.js`, `app/layout.js`
