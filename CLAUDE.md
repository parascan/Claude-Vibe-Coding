# CLAUDE.md — Claude Vibe Coding

This file provides guidance for AI assistants (Claude Code and similar) working in this repository. It covers project structure, development workflows, conventions, and best practices.

---

## Repository Overview

**Claude-Vibe-Coding** is a repository dedicated to AI-assisted development workflows using Anthropic's Claude models and Claude Code CLI. It serves as a reference implementation and playground for "vibe coding" — a development style where a developer works collaboratively with an AI assistant to rapidly prototype, build, and iterate on software.

---

## Project Structure

```
Claude-Vibe-Coding/
├── CLAUDE.md              # This file — AI assistant guidance
├── README.md              # Human-readable project overview (if present)
├── .github/
│   └── workflows/         # CI/CD pipelines
├── src/                   # Primary source code
├── tests/                 # Test suites
├── docs/                  # Documentation
└── scripts/               # Utility/automation scripts
```

> As files are added, update this section to reflect the actual structure.

---

## Development Workflows

### Getting Started

1. Clone the repository and navigate into it:
   ```bash
   git clone <repo-url>
   cd Claude-Vibe-Coding
   ```

2. Install dependencies (update this section based on the stack in use):
   ```bash
   # Node.js projects
   npm install

   # Python projects
   pip install -r requirements.txt
   # or
   uv sync
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   # Fill in values in .env
   ```

### Running the Project

Document run commands here as the project grows:

```bash
# Example — update when stack is defined
npm run dev       # Start dev server
npm test          # Run tests
npm run build     # Build for production
```

### Branch Strategy

- `main` — stable, production-ready code
- `claude/<feature>-<session-id>` — AI-generated feature branches (created by Claude Code sessions)
- `feat/<description>` — human-authored feature branches
- `fix/<description>` — bug fix branches

**AI sessions must always work on a designated `claude/` branch and push to it — never directly to `main`.**

### Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(optional scope): <short description>

Types: feat, fix, docs, style, refactor, test, chore, ci
```

Examples:
```
feat(auth): add JWT token refresh logic
fix(api): handle empty response from Claude API
docs: update CLAUDE.md with new workflow steps
```

---

## Claude Code Usage

### Session Workflow

1. Start Claude Code in the project root: `claude`
2. Describe your task clearly — include context, constraints, and expected outcomes.
3. Review all changes Claude proposes before approving file writes or shell commands.
4. Commit frequently with descriptive messages.
5. Push to your `claude/` branch when the task is complete.

### Key Commands

| Command | Purpose |
|---------|---------|
| `/help` | Show available commands |
| `/commit` | Create a git commit with an AI-generated message |
| `/review-pr` | Review an open pull request |
| `/fast` | Toggle fast mode |
| `Escape` | Interrupt the current operation |

### Permissions Model

Claude Code prompts for approval on:
- **File writes/edits** — review diffs carefully before approving
- **Shell commands** — especially destructive ones (`rm`, `git reset --hard`, etc.)
- **Network requests** — any external API calls

Trust the prompts. When in doubt, deny and ask Claude to explain the action.

---

## Code Conventions

### General

- Prefer **clarity over cleverness** — code should be readable at a glance.
- **Minimal abstraction** — only abstract when a pattern repeats three or more times.
- No premature optimization. Profile before you optimize.
- Avoid unnecessary comments; let self-documenting code speak for itself.
- All new code should have associated tests.

### Naming

| Context | Convention |
|---------|-----------|
| Variables/functions | `camelCase` (JS/TS) or `snake_case` (Python) |
| Classes | `PascalCase` |
| Constants | `UPPER_SNAKE_CASE` |
| Files | `kebab-case` or `snake_case` (be consistent within stack) |
| Git branches | `kebab-case-descriptions` |

### Error Handling

- Validate at system boundaries (user input, external APIs, env vars).
- Do not add error handling for scenarios that cannot occur in practice.
- Surface errors with enough context to diagnose — avoid swallowing exceptions silently.

### Security

- Never commit secrets, API keys, or credentials. Use `.env` files (git-ignored).
- Sanitize all user input before using in queries, shell commands, or HTML output.
- Avoid `eval`, dynamic `require`, and similar patterns.
- When using the Claude API, never expose API keys client-side.

---

## Testing

### Philosophy

- Write tests for business logic, not for trivial getters/setters.
- Tests should be fast, deterministic, and isolated.
- Prefer integration tests over mocking internal implementation details.

### Running Tests

```bash
# Update these commands based on the actual test setup
npm test              # Run all tests
npm test -- --watch  # Watch mode
npm run test:coverage # Coverage report
```

### Test File Location

- Co-locate unit tests with source files: `src/foo.test.ts` next to `src/foo.ts`.
- Place integration/e2e tests in `tests/`.

---

## Claude API Integration

If this project integrates with the Claude API, follow these guidelines.

### Setup

```bash
export ANTHROPIC_API_KEY=sk-ant-...
```

Or add to `.env`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

### Model Selection

| Use Case | Recommended Model |
|----------|------------------|
| Complex reasoning, long context | `claude-opus-4-6` |
| Balanced performance | `claude-sonnet-4-6` |
| Fast, lightweight tasks | `claude-haiku-4-5-20251001` |

Default to `claude-sonnet-4-6` unless you have a specific reason to use another model.

### API Best Practices

- Always set a reasonable `max_tokens` limit.
- Use system prompts to establish context and constraints.
- Handle rate limit errors (429) with exponential backoff.
- Cache responses where appropriate to reduce cost.
- Log API calls in development for debugging, not in production.

### Example (TypeScript)

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const message = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude!" }],
});

console.log(message.content[0].text);
```

### Example (Python)

```python
import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude!"}],
)

print(message.content[0].text)
```

---

## AI Assistant Guidelines

When working as an AI assistant in this repository:

### Do

- Read existing code before modifying it.
- Make the minimal change needed to accomplish the task.
- Follow the conventions already established in the codebase.
- Run tests (or remind the user to run them) after making changes.
- Commit changes with descriptive messages following Conventional Commits.
- Push to the designated `claude/` branch.

### Do Not

- Push to `main` directly.
- Delete files or branches without explicit user confirmation.
- Add unrequested features, comments, or abstractions.
- Commit secrets or credentials.
- Use `--no-verify` to skip git hooks.
- Amend published commits (create new ones instead).
- Force push to shared branches.

### When Uncertain

- Ask before taking irreversible actions.
- Prefer the safer, more reversible option.
- Explain what you are about to do and why before doing it.

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Claude API authentication key | Yes (if using Claude API) |

Add additional variables here as the project evolves.

---

## Contributing

1. Create a branch from `main` following the branch naming conventions.
2. Make your changes with clear, focused commits.
3. Open a pull request with a descriptive title and summary.
4. Address review feedback before merging.
5. Squash or rebase as appropriate before the final merge.

---

## Useful Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Anthropic API Reference](https://docs.anthropic.com/en/api)
- [Anthropic Python SDK](https://github.com/anthropics/anthropic-sdk-python)
- [Anthropic TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues)
