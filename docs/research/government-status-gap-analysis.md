# Gap Analysis: Government Status & Domestic Shortages

**Date**: 2026-03-25  
**Topic**: Feasibility of tracking national emergencies, lockdowns, transport shutdowns, and essential resource shortages.

## 🔍 Core Requirement
Track the onset and duration (days counter) of domestic disruptions that impact stability and civilian life.

## 📊 Current State: What Exists

| Category | Coverage | Implementation | Source |
| :--- | :--- | :--- | :--- |
| **Communication Breakdowns** | High | `InternetDisruptionsPanel` | Cloudflare Radar |
| **Air Travel Bans** | High | `AirlineIntelPanel` | ICAO NOTAMs / AviationStack |
| **Local Emergencies/Sirens** | High (Israel) | `OrefSirensPanel` | oref.org.il (Israel Home Front) |
| **National Security Risk** | High | `SecurityAdvisoriesPanel` | Govt Travel Advisories (RSS) |
| **Price Spikes (Shortage Proxy)** | Medium | `FuelPricesPanel` | globalpetrolprices.com |

## 🚫 Current Gaps: What is Missing

- **General Government Shutdowns**: No dedicated tracker for civil service cessations.
- **LPG/Energy Shortages**: Not specifically distinguished from Liquid Fuels (Gasoline/Diesel).
- **Transport Shutdowns (Ground)**: No global coverage for rail/bus/metro shutdowns.
- **Service/Retail Closures**: e.g., "Restaurant shutdowns" or bank holidays.
- **Unified "Days Since" Counter**: Inconsistent implementation across panels.

## 🛠️ Implementation Feasibility (Public Sources Only)

### 1. GDELT Keyword Harvesting (Low Complexity)
GDELT (already used in `seed-gdelt-intel.mjs`) is the "lowest hanging fruit" for many missing fields.
- **Keywords**: `(lockdown OR "stay at home" OR "national emergency" OR "curfew" OR "government shutdown" OR "martial law")`.
- **Strategy**: Add a new `governance` topic to the GDELT seed script.

### 2. ACLED CAMEO Code Filtering (Medium Complexity)
ACLED (already used in `seed-unrest-events.mjs`) tracks civil unrest.
- **Strategy**: Filter for `Strategic developments` (Code 6) or specific `Actor` categories like `Protestors` vs `Government Forces` in the context of transport blockades.

### 3. Government Advisory NLP (High Complexity)
The `SecurityAdvisoriesPanel` already receives text like "National Emergency declared in X."
- **Strategy**: Use the existing `analysis.worker.ts` or an LLM-assisted seed script to extract the "Status" and "First Mentioned Date" from these RSS feeds.

### 4. Unified Days Counter (Low Complexity)
- **Strategy**: Update `types/index.ts` to include a `status_onset_epoch` field for domain statuses.
- **UI**: Add a `DaysCounter` component to the `Panel` base class that calculates `(Date.now() - onset) / 86400000`.

## 🚀 Recommended Path Forward
1.  **Phase 1**: Expand `seed-gdelt-intel.mjs` to include Governance and Shortage topics.
2.  **Phase 2**: Add `DaysCounter` visual element to the `Panel` base class.
3.  **Phase 3**: Create a `DomesticResiliencePanel` (or similar) to consolidate these signals.
