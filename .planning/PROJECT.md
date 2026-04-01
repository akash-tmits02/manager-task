# Internal Business Dashboard

## What This Is

An internal business dashboard migrated to an enterprise-level Next.js 15 architecture. It uses Material UI and a feature-based folder structure to ensure clear separation of concerns, scalability, and maintainability.

## Core Value

A highly maintainable, scalable, and clean architecture that eliminates technical debt and duplicate code.

## Requirements

### Validated

- ✓ LocalStorage persistence
- ✓ Weather API integration 
- ✓ Task CRUD

### Active

- [ ] Next.js 15 migration
- [ ] Material UI implementation (replacing Tailwind)
- [ ] Feature-based folder structure (`features/`)
- [ ] Shared components, hooks, services, types, constants, utilities separation
- [ ] Code deduplication and cleanup

### Out of Scope

- Redux/Zustand global state (Keeping context/hooks for now unless needed)
- Backend Database (Keeping localStorage per existing mapping for now)

## Context

The previous architecture had a messy folder structure, weak separation of concerns, duplicate component logic (e.g., repeating localStorage calls), and no clear types/constants. 

## Constraints

- **Tech Stack**: Next.js 15, React, Material UI
- **Architecture**: Strict feature-sliced/layered hybrid

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Feature-based folders | Scalability and organization | — Pending |
| Material UI | Enterprise component standard | — Pending |

---
*Last updated: Today after initialization*
