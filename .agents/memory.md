## Chronic Gotchas

- **Fetch IPv6 Problem**: Node.js tries IPv6 first; frequently fails for government/military API targets. Always use the sidecar's fetch-patch or IPv4 forcing in server environments.
- **Sebuf Cache Keys**: Forgetting to include parameters in the Redis cache key causes cross-user/cross-country data leaks.
- **Edge Function Imports**: Importing from `../src/` or `../server/` *directly* from `api/*.js` will break the Vercel deployment (enforced by tests).
- **Staggered Yahoo Finance**: Calls to Yahoo Finance API must have 150ms delays to avoid rate-limiting.
- **InferEntityClass misclassification**: Standalone regex `|force|` in `scripts/seed-forecasts.mjs` currently overmatches commercial entities (e.g., Salesforce) as military. (See [todos/010-pending-p1-inferentityclassfromname-force-overmatch.md](../todos/010-pending-p1-inferentityclassfromname-force-overmatch.md)).

## Task Tracking System (todos/)

The project uses a structured `.md` file system in the `todos/` directory to track technical debt, high-priority bugs (P1-P3), and feature refinements.
- **Status**: `pending`, `in-progress`, `complete`.
- **Priority**: `p1` (Critical/Correctness), `p2` (Performance/Refinement), `p3` (Optimization/Simplification).
- **Workflow**: Agents should check `todos/` for existing issues before starting new features or refactors.

## Architecture & Data Refinements

- **March 2026**: Transitioned to mandatory Sebuf for all new JSON endpoints. No new standalone `.js` files in `api/` unless necessary for non-JSON content.
- **March 2026**: Added `seed-meta` in Redis for granular health monitoring.
- **March 2026**: Introduced **Deep Forecast & Intelligence** domain. Uses `simulation-package.json` R2 artifacts for LLM consumption. Added `CrossSourceSignalsPanel` and `HormuzPanel` for Supply Chain tracking.
- **March 2026**: Formalized the **Stability Escalation Model (Plague Model)**. Uses a 6-tier staircase (Awareness to Collapse) for tracking government responses (Schools, WFH, Rationing, Emergencies). Follows an "Available Presence" UI policy (no N/A).

## 📋 Implementation Workflow & Audit Trail

To ensure consistency and long-term project health, all agents MUST follow this documentation structure:

1.  **ADRs (Architectural Decision Records)**:
    -   Location: `docs/decisions.md`
    -   Process: Record ALL architectural pivots and core logic decisions here. 
    -   Order: **Newest on top**. Never delete old ADRs; keep them for historical context.
2.  **Task Tracking**:
    -   Location: `tasks/{PROJECT_NAME}/` or `tasks/{TASK_NAME}.md`.
    -   Process: Partition work into phases. Mark items as `[x]Done` as you proceed.
3.  **Active Roadmaps**: 
    -   Location: `plans/`. 
    -   Process: Before starting a major feature, check for a persistent implementation plan in `plans/`.

### Stability Staircase Standards:
- **No Placeholders**: If data is not available, the UI component MUST NOT render (no "N/A" text).
- **GSI logic**: Aggregate G20 statuses for the "Global Stress" alert.
- **Fail Cascade**: Follow the 4-chain Fail Chain (Economic, Infra, Military, Institutional).


