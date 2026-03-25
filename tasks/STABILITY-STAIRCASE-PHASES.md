# Task: Stability Staircase & Global Order Indicator

**Formal Plan**: [stability_staircase_implementation_plan.md](../plans/stability_staircase_implementation_plan.md)

**Phase Status**:

- [ ] Phase 1: Data Contract & Domain Metadata
- [ ] Phase 2: Intelligence Harvesting (Ingestion)
- [ ] Phase 3: The Stability Model (Scoring Logic)
- [ ] Phase 4: UI & Visualization (The "Plague" Look)
- [ ] Phase 5: Deep Forecast & Cascading Failure

---

## [Phase 1: Data Contract & Domain Metadata]
- [ ] Define `StabilityStatus` and `StabilityScore` in `proto/intelligence/v1/service.proto`
- [ ] Define `GlobalOrderIndex` in `proto/intelligence/v1/intelligence.proto`
- [ ] Create `shared/refinery-infrastructure.json` with top 100 global refinery coordinates
- [ ] Map Staircase keywords in `src/config/stability-keywords.ts`
- [ ] Register new `Stability` domain in `src/types/intelligence.ts`

## [Phase 2: Intelligence Harvesting]
- [ ] Update `scripts/seed-gdelt-intel.mjs` for Level 1-5 topic monitoring
- [ ] Add "Stability & Resilience" RSS categories to `server/worldmonitor/news/v1/_feeds.ts`
- [ ] Implement Redis persistence for `stability:state:{iso2}` to track Onset Date

## [Phase 3: Logic & Scoring]
- [ ] Create `src/services/stability-model.ts` for weighted scoring
- [ ] Implement Temporal Decay logic (+2% instability daily after 10 days)
- [ ] Implement GSI (Global Stability Index) aggregator for G20 nations

## [Phase 4: UI / Map]
- [ ] Implement `StabilityMapLayer` (DeckGL/H3)
- [ ] Add Minimalist Stability Badge to `CountryBriefPage.ts`
- [ ] Create Legend Overlay for the 6-tier Staircase
- [ ] Add Global Order Stress alert banner/indicator to the Dashboard

## [Phase 5: Forecast & Cascade]
- [ ] Update `seed-forecasts.mjs` to track the 4 critical sub-chains
- [ ] Implement "Death Spiral" threshold (3/4 chain failure)
- [ ] Driver internal "Ghost Pulse" map radar using forecasted probabilities
