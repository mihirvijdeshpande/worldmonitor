# Stability Escalation Model (The "Plague Model")

**Date**: 2026-03-25  
**Origin**: Synthesis of User Requirements and "Plague Inc." (Game) Governmental Response Tiers.

## 🏛️ Core Design Philosophy
The system tracks **Government Response Severity** as a metric for domestic stability. Instead of just tracking "bad news," we track how the **State** reacts to pressure, ranging from behavioral nudges (WFH) to institutional cessation (Collapse).

## 📊 The Stability Staircase

| Level | Name | Government Action | Representative Signals |
| :--- | :--- | :--- | :--- |
| **0** | **Baseline** | Normal Operations | Minimal news alerts, standard travel advisories. |
| **1** | **Awareness** | Behavioral Nudges | **Schools Online / Hybrid WFH** guidance; Public awareness campaigns. |
| **2** | **Restriction**| Building Access Control| **School Shutdowns**, **Mandated WFH**, partial border restrictions. |
| **3** | **Friction** | Resource Distribution | **Petrol Rationing**, Transit strikes/closures, Supply chain blockages. |
| **4** | **Enforcement**| Civil Rights Suspension| **National Emergency**, Martial Law, Curfews, Mandatory Quarantines. |
| **5** | **Failure** | Institutional Halt | **Government Shutdown**, Service suspension, Central Bank default. |
| **6** | **Collapse** | State Dissolution | **Government Collapse**, Total Anarchy. |

## 🌐 Global Stability Index (GSI)
The GSI tracks the **Structural Integrity of the Global Order** by aggregating individual national stability staircase levels for major powers (G20).

### Calculation Logic:
`GSI = Σ(National Staircase Level) / Total # of G20 Nations`

| GSI Score | World State | Threat Context |
| :--- | :--- | :--- |
| **0.0 - 0.15** | **Equilibrium** | Normal trade and diplomatic relations. |
| **0.16 - 0.35** | **Friction** | Resource competition, sanctions, and border closures. |
| **0.36 - 0.55** | **Stress** | Global supply chain fracturing; military mobilization surges. |
| **0.56 - 0.75** | **Critical** | Higher probability of systemic global conflict (WW3 proxy). |
| **> 0.75** | **Collapse** | Breakdown of international law and institutional cooperation. |

### Indicators & Counters:
- **Global Order Stress Alert**: Triggered if **3+ G7/G20 nations** hit **Level 3 (Friction)** or higher simultaneously.
- **Order Collapse Countdown**: Calculated using the `seed-forecasts.mjs` internal probability for the `political` and `conflict` domains.

### The Failure Cascade (Collapse Chain)
The system uses recursive logic to predict a "Total Collapse" by monitoring four critical sub-chains:
1.  **Economic Chain**: Sovereign Risk → Fiscal Default → **Economic Collapse** (Bank Runs/Hyperinflation).
2.  **Infrastructure Chain**: Supply Friction → Grid/Energy Failure → **Systemic Blackout**.
3.  **Military Chain**: Theater Alert → Posture Failure → **Security Vacuum** (Desertion/Defeat).
4.  **Institutional Chain**: Shutdown → Service Withdrawal → **Total Government Collapse**.

A country (or the global order) enters the "Death Spiral" once 3 of these 4 chains hit "Terminal Failure" simultaneously.

## 🏭 Refinery & Economic Metrics (Minimalist)


Adopts an **"Available Presence"** policy (show what we have, hide what we don't; no N/A placeholders).

- **Secondary Country Refineries**: (e.g., India's Jamnagar)
  - **Status**: [Open | Closed | Rationing]
  - **Logic**: Used to track global supply chain resilience even if the country isn't a primary crude producer.
- **Housing Affordability Index**:
  - **Metric**: Simple [Rising (↗) | Falling (↘)] relative trend.
  - **Frequency**: Measured against the previous detected state in news/RSS/financial feeds.

## 🕒 The "Days Counter" Decay
Escalation is not just event-driven, it is **time-driven**.
- **Duration Penalty**: If a country remains at **Level 3** or above for **>10 days**, its "Instability Index" gains a temporal multiplier (e.g., +2% daily).
- **Persistent Status**: The "Days Since" counter appears on the Country Brief panel to show exactly how long a specific level of restriction has been in force.

## 🗺️ Visualization Strategy
- **The "Heat Pulse"**: Borders pulse based on Level (Level 1-2: Yellow/Orange; Level 5-6: Flashing Deep Red).
- **Metric Detail**: Metrics like "School Status" or "Housing Trend" are only shown in the **Country Deep-Dive Panel** if data is actively being retrieved.

---

## 🛠️ Implementation Roadmap
For the technical execution, see: **[Stability Staircase Implementation Plan](../../plans/stability_staircase_implementation_plan.md)**

