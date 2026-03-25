# Agent Skills: WorldMonitor

This file indexes common workflows and capabilities that an AI agent should possess or follow in this repository.

## Specialized Skills

### 1. Data Service (Sebuf-first)
- **Primary Task**: Adding/modifying API endpoints.
- **Workflow**: `proto/ -> make generate -> server/ -> api/gateway -> src/services/`.
- **Reference**: [workflows/add-api-endpoint.md](./workflows/add-api-endpoint.md)

### 2. UI Engineer (Panel-based)
- **Primary Task**: Creating new data visualization panels.
- **Workflow**: `src/components/MyPanel.ts -> src/config/panels.ts -> src/config/variants/`.
- **Reference**: [workflows/add-ui-panel.md](./workflows/add-ui-panel.md)

### 3. Debugger & Researcher
- **Primary Task**: Triaging issues, investigating data source failures.
- **Workflow**: `npm run test:data -> check api/health.js -> view Redis seed-meta`.
- **Reference**: [workflows/debug-cache.md](./workflows/debug-cache.md)

### 4. Visual Quality Assurance
- **Primary Task**: Validating map rendering and variant layouts.
- **Workflow**: `npm run test:e2e -> screenshot comparison`.

### 5. Intelligence & Supply Chain (Deep Forecast)
- **Primary Task**: Maintaining simulation runners and signal analyzers.
- **Workflow**: `scripts/seed-forecasts.mjs -> R2 simulation-package.json -> CrossSourceSignalsPanel`.
- **Specialty**: Analyzing geopolitical risk scores, maritime traffic (Hormuz), and cross-domain correlation.

### 6. Technical Debt Management (Maintenance)
- **Primary Task**: Resolving high-priority bugs (P1-P3).
- **Workflow**: `consult todos/ -> select priority task -> follow Acceptance Criteria`.

## Tool Usage Proficiency

- **Terminal**: Use `make help` to see all available scripts.
- **FS**: Respect the strict directory structure (see AGENTS.md).
- **Search**: Grep for service definitions in `proto/` and wiring in `server/worldmonitor/`.
