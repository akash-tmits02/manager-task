# Phase 2: Code Refactoring & Deduplication - Context

**Status:** Ready for planning

<domain>
## Phase Boundary
Refactoring redundant `localStorage` accesses and API calls into centralized React contexts and hooks. Integrating Material UI components strictly on primary/interactive elements while retaining native HTML layout wrappers. Removing legacy unneeded code and establishing global constants.
</domain>

<decisions>
## Implementation Decisions

### 1. Task State Management (`useTasks`)
- **D-01: Context API.** Build a `TaskContext` combined with `useTasks` hooks dynamically updating the state tree so all children components re-render correctly without "prop drilling". 

### 2. Component MUI Migration
- **D-02: Hybrid DOM.** Retain standard HTML elements (`div`, `span`) for generic layout wrappers, using MUI only for primary elements (`<Button>`, `<Card>`, `<TextField>`).

### 3. Weather Fetching System
- **D-03: Native Fetch Hook.** Keep native `fetch()` without a heavy service layer, merely wrapping the logic inside `src/hooks/useWeather.js`.
</decisions>

<canonical_refs>
## Canonical References
None
</canonical_refs>
