# Concerns

## Security

### ⚠️ No Real Authentication
- `lib/auth.js` accepts **any non-empty username and password** as valid credentials
- Password is not hashed, validated, or stored securely
- Auth state is stored in plaintext in `localStorage` (`auth_user` key)
- No session expiry or token rotation
- No CSRF protection
- **Impact:** Anyone can log in with any credentials. Not suitable for production.

### ⚠️ Unprotected API Route
- `app/api/weather/route.js` has no authentication check
- Any client can call `/api/weather?lat=X&lon=Y` without being logged in
- **Impact:** Low risk since it only proxies weather data, but could be abused for API scraping.

### ⚠️ Inconsistent Auth Guards
- `/dashboard` and `/tasks` check auth and redirect to `/login`
- `/todos` has **no auth guard** — accessible without login
- **Impact:** Inconsistent security posture across pages.

## Technical Debt

### 🔴 Duplicated Task Logic
The localStorage task loading/saving pattern is **copy-pasted across 3 files**:
- `app/tasks/page.js` — full CRUD
- `app/dashboard/page.js` — read-only + polling
- `app/todos/page.js` — basic CRUD

This should be extracted into a shared custom hook (e.g., `useTasks()`).

### 🔴 Legacy Components Not Integrated
- `components/AddTask.jsx` — standalone add task form with inline styles, **not used** by `app/tasks/page.js` (which has its own inline form)
- `components/TaskList.jsx` — basic task list with inline styles, **only used by `/todos`** page
- These components use inline `style={{}}` objects while the rest of the app uses CSS Modules — inconsistent styling approach

### 🟡 Todos Page is Underdeveloped  
- `app/todos/page.js` (41 lines) is a bare-bones page with no CSS Module, no auth guard, and uses the legacy `TaskList` component
- Appears to be an early prototype that was superseded by `app/tasks/page.js`
- Consider removing or replacing with a redirect to `/tasks`

### 🟡 No Data Validation
- Task text is only trimmed, no length limits or sanitization
- Priority values are hardcoded strings with no validation
- Task IDs use `Date.now()` — collision risk if tasks are created in rapid succession

### 🟡 Dashboard Polling
- Dashboard polls `localStorage` every 2 seconds via `setInterval` for cross-tab sync
- This is a workaround — `StorageEvent` or `BroadcastChannel` API would be more efficient
- Current approach works but wastes cycles when no changes occur

## Performance

### 🟡 No Code Splitting Beyond Pages
- All page-level code splitting is handled by Next.js automatically
- Recharts library (~200KB) is loaded on the dashboard page regardless of whether there are tasks
- No dynamic imports (`next/dynamic`) used anywhere

### 🟢 CSS Modules
- Styles are properly scoped via CSS Modules — no global CSS conflicts
- Tailwind CSS imported but actual usage appears minimal (primarily CSS Modules)

## Fragile Areas

### Weather API Cascade
- `app/api/weather/route.js` depends on two free external APIs (wttr.in, Open-Meteo)
- Both are public APIs with no SLA — could go down or rate-limit at any time
- The mock fallback handles graceful degradation, which is good
- `mapWttrCode()` function uses hardcoded numeric ranges that may not cover all wttr.in weather codes

### localStorage as Database
- All application data lives in `localStorage`
- Data is lost if user clears browser data
- No backup/export mechanism
- No data migration strategy
- Not suitable for production use cases

### Mixed Line Endings
- Some files use CRLF (`\r\n`), others use LF (`\n`)
- Can cause issues with git diffs and cross-platform development
- Should be normalized via `.editorconfig` or `.gitattributes`

## Missing Functionality

| Feature | Status | Notes |
|---------|--------|-------|
| User registration | ❌ | Only fake auth |
| Task editing | ❌ | Can only add/delete/toggle |
| Task categories/tags | ❌ | Only priority levels |
| Search | ❌ | No task search capability |
| Due dates | ❌ | Tasks have no deadlines |
| Notifications | ❌ | No reminders or alerts |
| Data persistence | ❌ | localStorage only, no backend |
| Mobile responsiveness | ⚠️ | Some media queries but incomplete |
| Accessibility | ⚠️ | Some aria-labels but no comprehensive a11y |
| Dark/Light theme toggle | ❌ | Dark theme only, hardcoded |
