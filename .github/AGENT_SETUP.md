# GitHub Agent Configuration for WorldMonitor

This repository is optimized for AI-assisted development. Please utilize the following resources:

## Entry Points
- [AGENTS.md](../AGENTS.md): Repository structure and architectural rules (MANDATORY).
- [.agents/README.md](../.agents/README.md): Overview of the agent-specific framework.

## Agent Structure
- [.agents/skills.md](../.agents/skills.md): Index of common workflows.
- [.agents/memory.md](../.agents/memory.md): Long-term project memory and recurring "gotchas."
- [.agents/workflows/](../.agents/workflows/): Detailed, step-by-step guides for technical tasks.

## GitHub Integrations
- Use `npm run lint` and `npm run typecheck` to validate code before PR submission.
- All Pull Requests must follow the template in `.github/pull_request_template.md`.
- Proto changes MUST be generated locally with `make generate` before push.

## Personality Fragments
- Architect persona: [.agents/prompts/architect.md](../.agents/prompts/architect.md)
