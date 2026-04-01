# Phase 1: Enterprise Architecture Foundation - Context

**Status:** Ready for planning

<domain>
## Phase Boundary
Establish Next.js 15, Material UI setup, strict feature-based directory structure (`src/features`, `hooks`, `utils`, etc.) and naming conventions.
</domain>

<decisions>
## Implementation Decisions

### Styling Strategy
- **D-01:** Pure Material UI. Remove Tailwind and CSS Modules and standardize on MUI (ThemeProvider, sx prop, MUI components) for full enterprise consistency.

### File Location Strategy
- **D-02:** Strict `src/` structure. Move all features, components, hooks, utils, etc. inside the `src/` directory and keep the project root clean (including moving `app/` to `src/app/`).

### TypeScript vs JavaScript
- **D-03:** Stay in JavaScript. Do NOT migrate to TypeScript. The project must remain in `.js/.jsx` and use JSDoc if type hints are needed.
</decisions>

<canonical_refs>
## Canonical References
None
</canonical_refs>
