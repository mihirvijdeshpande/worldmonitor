# Agent Framework: WorldMonitor

Welcome, AI Agent. This directory contains structured context, workflows, and rules to help you contribute to WorldMonitor effectively.

## Structure

- [SKILLS.md](./skills.md): Manifest of technical capabilities and common task workflows.
- [MEMORY.md](./memory.md): Long-term project memory, known issues, and recurring "gotchas."
- `workflows/`: Step-by-step guides for complex tasks (API additions, Panel creation, etc.).
- `prompts/`: Specific personality profiles and domain-specific context fragments.

## Core Mandates

1. **Read AGENTS.md**: This is your primary entry point for repository rules and architecture.
2. **Follow Dependency Direction**: `types -> config -> services -> components -> app -> App.ts`.
3. **Edge function constraints**: No node:built-ins in `api/*.js`. Self-contained only.
4. **Caching**: Always include parameters in cache keys in `server/worldmonitor/`.
5. **Proto-first**: All JSON API changes MUST start with a Protocol Buffer definition in `proto/`.

## How to use this framework

- When starting a task, check `SKILLS.md` for a relevant workflow.
- If you find a new pattern or a frequent bug, update `MEMORY.md`.
- Use the templates in `workflows/` to ensure consistency in complex feature implementation.
