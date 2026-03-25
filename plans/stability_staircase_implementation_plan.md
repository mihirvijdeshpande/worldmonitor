# Implementation Plan: Stability Escalation Model (The "Plague Model")

**Objective**: Implement a 6-tier domestic stability tracking system (Staircase) using news-based indicators (GDELT/RSS) to monitor government response levels and systemic resource friction.

---

## 🏗️ Phase 1: Data Contract & Domain Metadata
*Target: Define the "Staircase" constants and static infrastructure.*

- [ ] **Proto Definition**: Add `StabilityStatus` and `StabilityScore` messages to [proto/worldmonitor/intelligence/v1/service.proto](file:///d:/Data/Code/worldmonitor/proto/worldmonitor/intelligence/v1/service.proto).
  - Include `onset_timestamp`, `duration_days`, and `staircase_level`.
- [ ] **Infrastructure Seed**: Create `shared/refinery-infrastructure.json`.
  - Content: Lat/Lon for top 100 global refineries (Focus on second-tier producers like India).
- [ ] **Configuration**: Map Staircase keywords in `src/config/stability-keywords.ts`.

## 📡 Phase 2: Intelligence Harvesting (Ingestion)
*Target: Expand GDELT and RSS to "listen" for escalation triggers.*

- [ ] **GDELT Expansion**: Update [scripts/seed-gdelt-intel.mjs](file:///d:/Data/Code/worldmonitor/scripts/seed-gdelt-intel.mjs).
  - Add query topics: `stability_level_3` (Rationing/Transit), `stability_level_1_2` (School/WFH).
  - Use specific CAMEO Codes: `0311` (Mobilize police), `0312` (Mobilize military - domestic).
- [ ] **RSS Category**: Add "Stability & Resilience" bucket to [server/worldmonitor/news/v1/_feeds.ts](file:///d:/Data/Code/worldmonitor/server/worldmonitor/news/v1/_feeds.ts).
  - Target: Reuters, AP, and Government Gazette RSS feeds.
- [ ] **Country Status Store**: Implement `redis.set("stability:state:{iso2}")` to track the state across seed runs.

## ⚖️ Phase 3: The Stability Model (Scoring Logic)
*Target: Implement the weighted escalation and temporal decay.*

- [ ] **Scoring Engine**: Create `src/services/stability-model.ts`.
  - Logic: Assign weights (0.05 to 1.0) based on detected keywords.
  - **Temporal Decay**: If [(Date.now() - first_detected) > 10 days](file:///d:/Data/Code/worldmonitor/server/worldmonitor/news/v1/_feeds.ts#7-9), apply the instability multiplier (+2%/day).
- [ ] **Global Order Index (GSI)**: Implement the G20 stability aggregator.
  - Logic: Aggregate national staircase levels of G7/G20 countries to drive the "Global Stress" dashboard alert.
- [ ] **Conflict Integration**: Update the [CII](file:///d:/Data/Code/worldmonitor/src/components/CIIPanel.ts#9-171) (Crisis Intensity) score to receive stability signals.

  - A `Level 4 (National Emergency)` should boost a country's risk score by +40 points globally.

## 🗺️ Phase 4: UI & Visualization (The "Plague" Look)
*Target: Map-level heat pulsing and Deep-Dive metrics.*

- [ ] **Map Layer**: Implement `StabilityMapLayer` (DeckGL).
  - Use `H3HexagonLayer` or `ScatterplotLayer` to show country-level "stability pulse."
  - Color gradient: Yellow (Level 1) → Deep Crimson (Level 6).
- [ ] **Country Panel Update**: Modify [src/components/CountryBriefPage.ts](file:///d:/Data/Code/worldmonitor/src/components/CountryBriefPage.ts).
  - Add **Resilience Metrics** section.
  - Render specific icons for **Schools Online**, **Petrol Rationing**, **Refinery Status**, and **Housing Trend**.
- [ ] **Anti-Placeholder Logic**: Wrap metrics in conditional checks: `if (!!data.status) { renderRow() }`.

## 🧠 Phase 5: Deep Forecast & Cascading Failure
*Target: Systemic prediction of Total Collapse.*

- [ ] **Chain Tracking**: Update [seed-forecasts.mjs](file:///d:/Data/Code/worldmonitor/scripts/seed-forecasts.mjs) to track the 4 critical sub-chains (Economic, Infra, Military, Institutional).
- [ ] **Death Spiral Logic**: Implement the threshold check (3/4 chains failed) to trigger the "World Order Collapse" countdown.
- [ ] **Internal Radar**: Use forecasted probabilities to drive the UI "Ghost Pulse" on the map (Internal logic only).


---

## ⚠️ Risks & Blockers

| Risk | Impact | Mitigation |
| :--- | :--- | :--- |
| **GDELT False Positives** | Medium | Use a "Coalescing Window": A status is only confirmed if mentioned 3+ times in a 2-hour window. |
| **Stale Indicators** | High | (Blocker) If news stops reporting a status, but it's still active. | Mitigation: Implement "Status Persistence" with a manual override or 7-day auto-decay. |
| **Map Performance** | Low | Managed via DeckGL superclustering and H3 grid aggregation. |
| **Data Privacy** | Low | Only utilizing publicly available global news/telemetry. |

## 📅 Timeline (Estimated)
- **Phase 1-2**: 4 days (Data Infrastructure & Ingestion).
- **Phase 3**: 3 days (Scoring & Temporal Logic).
- **Phase 4**: 5 days (UI/UX Engineering & Map Visuals).
