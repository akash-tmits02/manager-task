# Testing

## Current State

**No tests exist.** The project has zero test files, no test framework configured, and no test scripts in `package.json`.

## Test Infrastructure

- **Framework:** None installed
- **Test runner:** None
- **Assertion library:** None
- **Coverage tool:** None
- **CI/CD:** None configured

## What Needs Testing

### Unit Tests (Priority)
| Area | File | What to Test |
|------|------|-------------|
| Auth | `lib/auth.js` | `login()` validation, `logout()` cleanup, localStorage read/write |
| Weather API | `app/api/weather/route.js` | API cascade logic, timeout handling, mock fallback |
| Task CRUD | `app/tasks/page.js` | Add/toggle/delete/filter operations |

### Integration Tests
| Flow | Description |
|------|-------------|
| Login → Dashboard | Auth flow with redirect |
| Task lifecycle | Create → view on dashboard → complete → delete |
| Weather widget | Geolocation → API call → rendering |

### E2E Tests
| Scenario | Description |
|----------|-------------|
| Full user journey | Login → add tasks → check dashboard → logout |
| Cross-tab sync | Dashboard polling picks up tasks created in another tab |

## Recommended Setup

For a Next.js 16 project with React 19:
- **Unit/Integration:** Vitest + React Testing Library
- **E2E:** Playwright or Cypress
- **Coverage:** Built into Vitest (`--coverage`)

## Linting (Partial Quality Gate)

The only quality assurance currently in place:
- **ESLint v9** with `eslint-config-next` Core Web Vitals rules
- Run via: `npm run lint`
