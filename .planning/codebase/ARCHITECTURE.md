# Architecture

## Pattern

**Next.js App Router** — file-based routing with client-side rendered pages.

Despite using Next.js (which supports SSR/SSG), the application is effectively a **client-side SPA** because:
- Every page uses `"use client"` directive
- All data is stored in `localStorage` (no server-side data)
- Auth state is managed via React Context (client-only)
- The only server-side code is the weather API proxy

## Layers

```
┌─────────────────────────────────────────────┐
│                  Pages                       │
│  (app/login, app/dashboard, app/tasks,       │
│   app/todos)                                 │
├─────────────────────────────────────────────┤
│              Shared Components               │
│  (components/Navbar, components/AddTask,     │
│   components/TaskList)                       │
├─────────────────────────────────────────────┤
│              Context / State                 │
│  (lib/auth.js — AuthContext + useAuth hook)   │
├─────────────────────────────────────────────┤
│              API Layer                       │
│  (app/api/weather/route.js — server proxy)    │
├─────────────────────────────────────────────┤
│              Storage                         │
│  (localStorage — tasks, auth_user)            │
└─────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow
1. User visits `/` → `app/page.js` checks `useAuth()` state
2. If no user → redirect to `/login`
3. If user → redirect to `/dashboard`
4. Login: `lib/auth.js` `login()` writes to `localStorage` and updates React state
5. Logout: clears `localStorage` key and resets state → redirect to `/login`

### Task CRUD Flow
1. Tasks loaded from `localStorage` on mount (`useEffect`)
2. Add: prepends new task object to array, saves to `localStorage`
3. Toggle: maps over array, flips `completed` flag, saves
4. Delete: filters array, saves
5. Dashboard polls `localStorage` every 2 seconds for cross-tab sync

### Weather Flow
1. Dashboard requests browser geolocation
2. Sends lat/lon to `/api/weather?lat=X&lon=Y` (Next.js API route)
3. Server tries wttr.in → Open-Meteo → mock data (cascade)
4. Response rendered in weather widget

## Entry Points

- **`app/layout.js`** — Root layout wrapping all pages with `AuthProvider` and `Navbar`
- **`app/page.js`** — Root route, redirects to `/dashboard` or `/login`
- **`app/api/weather/route.js`** — Weather API route handler (GET)

## State Management

- **React Context** (`AuthContext`) for auth state — provided at root layout level
- **Component-local `useState`** for all other state (tasks, form inputs, filters)
- **No global state library** (no Redux, Zustand, Jotai, etc.)

## Routing

Next.js App Router file-based routing:

| Route | File | Auth Required |
|-------|------|---------------|
| `/` | `app/page.js` | No (redirects) |
| `/login` | `app/login/page.js` | No |
| `/dashboard` | `app/dashboard/page.js` | Yes |
| `/tasks` | `app/tasks/page.js` | Yes |
| `/todos` | `app/todos/page.js` | No (no guard) |
| `/api/weather` | `app/api/weather/route.js` | No |

## Key Abstractions

### `AuthProvider` / `useAuth()` — `lib/auth.js`
Central auth context providing `{ user, login, logout, loading }` to the entire app tree.

### Task Persistence Pattern
A repeated pattern across `tasks/page.js`, `dashboard/page.js`, and `todos/page.js`:
```js
// Load
const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
setTasks(saved);

// Save
const save = (updated) => {
  setTasks(updated);
  localStorage.setItem("tasks", JSON.stringify(updated));
};
```
This pattern is duplicated — not abstracted into a shared hook or utility.
