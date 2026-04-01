# Project Roadmap

**Summary:** 2 phases | 7 requirements mapped

## Phase 1: Enterprise Architecture Foundation
**Goal:** Initialize Next.js 15, Material UI, and establish the new folder structures.

**Requirements mapped:** ARCH-01, ARCH-02, ARCH-03

**Success Criteria:**
1. Next.js 15 and MUI are successfully installed and running.
2. The `src/` directory contains `features`, `components`, `hooks`, `services`, `types`, `constants`, and `utils`.
3. Clear naming conventions are applied (e.g. PascalCase for components, camelCase for utils).

**Canonical refs:** None

## Phase 2: Code Refactoring & Deduplication
**Goal:** Move existing task and weather logic into the new architecture and remove technical debt.

**Requirements mapped:** REFC-01, REFC-02, REFC-03, REFC-04

**Success Criteria:**
1. LocalStorage logic exists in a single reusable hook (`useTasks`).
2. Legacy/unused components from `components/` are deleted/refactored.
3. Constants and types are extracted and used globally instead of hardcoded strings.
