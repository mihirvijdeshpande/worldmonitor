# Architectural Decision Records (ADRs)

This file tracks the architectural decisions for the WorldMonitor project. Decisions are recorded in reverse chronological order (newest on top). Newer decisions may invalidate older ones; however, old decisions are retained for historical context.

**Current Major Roadmap**: [Stability Staircase Implementation Plan](../plans/stability_staircase_implementation_plan.md)

---


## ADR 002: Global Order Stability & Failure Cascade 
**Date**: 2026-03-25  
**Status**: Accepted  

### Context
Individual country stability metrics need to be aggregated to assess global geopolitical health (World Order).

### Decision
1.  **Metric (GSI)**: Implement a Global Stability Index (GSI) calculated as the mean stability level of G20 nations.
2.  **Global Alert**: Trigger a "Global Order Stress" dashboard alert if 3+ G7/G20 nations hit Level 3 (Friction) or higher.
3.  **The Failure Cascade**: Predict total collapse using a 4-chain recursive logic: Economic, Infrastructure, Military, and Institutional chains. Terminal failure in 3/4 chains triggers a "Death Spiral" assessment.

### Consequences
- Requires high-precision tracking of G20 national status.
- Increases computational load on the `seed-forecasts.mjs` script due to recursive chain evaluation.
- Provides a "Doomsday Clock" style indicator for the global order.

---

## ADR 001: Domestic Stability Escalation (The "Plague Model")
**Date**: 2026-03-25  
**Status**: Accepted  

### Context
WorldMonitor required a more granular way to track domestic societal disruptions beyond simple conflict markers.

### Decision
1.  **Tiered Response**: Adopt a 6-tier "Staircase" (Awareness, Restriction, Friction, Enforcement, Failure, Collapse) inspired by the game "Plague Inc."
2.  **Trigger Sources**: Rely on GDELT/RSS news mining for schools, WFH mandates, rationing, and transport closures.
3.  **Minimalist UI**: Use a single status icon + legend badge instead of detailed probability % to maintain premium aesthetics.
4.  **Temporal Scoring**: Implement a "Days Since" counter that applies a linear instability multiplier (+2%/day) the longer a restrictive status persists.

### Consequences
- Reduces UI "noise" by hiding N/A or empty metrics.
- Introduces temporal state into the stateless API layer (via Redis caching).
- Requires a strategic catalog of refineries and secondary infrastructure.
