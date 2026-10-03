---
name: commit-message
description: Project-specific commit message style for this repo — Conventional Commits + gitmoji icon + optional feature scope, every line ≤100 chars. Use whenever drafting a commit message in this project (git commit, /commit, or any time the user asks you to compose, fix, amend, or review a commit message).
user-invocable: false
---

# Commit messages

This project uses **Conventional Commits + gitmoji**. Every commit subject line follows:

```
<type>(<scope>)?: :<gitmoji>: <subject>
```

## Hard rules

1. **Every line ≤ 100 characters.** Subject and body. Commitlint enforces this. Never break a line
   arbitrarily mid-phrase to fit — reword it tighter or split it into more bullets (see below).
2. **Subject = one line.** Imperative, present tense, **lowercase** first word after the icon, no trailing period.
3. **Gitmoji is mandatory.** Use the `:shortcode:` form (e.g. `:sparkles:`) — not the emoji glyph. Sits between the colon and the subject.
4. **Scope is optional but specific.** When the change is feature-local, use the feature folder name as scope: `feat(guidebook):`, `fix(marketplace):`. Cross-cutting / infra changes have no scope: `chore:`, `refactor:`.
5. **Body only when needed.** Add a blank line then a wrapped body for _why_ (not _what_ — the diff shows that). Skip the body for self-evident changes.
6. **Never** add `Co-Authored-By` / "Generated with Claude Code" trailers in this repo unless the user explicitly asks. The project history doesn't use them.

### Body formatting (when a body is present)

- One blank line between subject and body.
- Use bullet lines starting with `- ` (hyphen + space).
- **Capitalize the first word** of every bullet (proper sentence case).
- **End every bullet with a period.** Full sentences with proper grammar.
- Each bullet must be ≤ 100 chars. **Never wrap by chopping a phrase at the 100th character** — a
  line must never end mid-clause, mid-noun-phrase, or after a dangling preposition/conjunction.
- When a bullet runs long, fix it in this order of preference:
  1. **Reword** it tighter — long bullets usually carry filler; cut it and the line fits.
  2. **Split** it into multiple bullets, each one a cohesive, self-contained thought. One idea per
     bullet is better than one idea wrapped across lines.
  3. Only if a single idea is genuinely longer than 100 chars, wrap it — but break **at a clause
     boundary** so each line reads as a complete unit, and indent continuation lines two spaces.
- Group bullets by _semantic phase_ of the change (capture → transport → render → polish), not by file.

## Type → typical gitmoji pairing

Pick the gitmoji that best matches the _change_, not the type. The pairings below are the conventions observed in this repo's history.

| Type       | Default icon             | Use when                                                      |
| ---------- | ------------------------ | ------------------------------------------------------------- |
| `feat`     | `:sparkles:`             | Adding a new feature, page, component, route                  |
| `feat`     | `:globe_with_meridians:` | i18n / locale / translation work                              |
| `feat`     | `:children_crossing:`    | UX polish on an existing feature (interactivity, affordances) |
| `fix`      | `:bug:`                  | Fixing a bug                                                  |
| `fix`      | `:rotating_light:`       | Fixing lint / type errors / CI warnings                       |
| `refactor` | `:recycle:`              | Restructuring without behavior change                         |
| `refactor` | `:truck:`                | Moving / renaming files or folders                            |
| `refactor` | `:package:`              | Dependency restructuring / module swaps                       |
| `style`    | `:art:`                  | Code style / formatting (lint fixes)                          |
| `style`    | `:lipstick:`             | Visual / UI polish (CSS, spacing, copy)                       |
| `chore`    | `:wrench:`               | Config files, tooling, scripts                                |
| `chore`    | `:recycle:`              | Maintenance cleanup, removing dead code                       |
| `docs`     | `:memo:`                 | Documentation only                                            |
| `test`     | `:white_check_mark:`     | Adding / fixing tests                                         |
| `perf`     | `:zap:`                  | Performance improvements                                      |

When a change spans multiple concerns, pick the _dominant_ one — don't stack icons.

## Scope guide

Scope is the **feature folder** under `src/features/` when the change is contained to one: `guidebook`, `marketplace`, `messages`, `sections`, etc. For changes that touch the shell, routing, presenters across features, design tokens, build config, or anything cross-cutting — **omit the scope**.

```
feat(guidebook): :sparkles: adds dedicated check-in and check-out detail routes
fix(guidebook): :bug: keeps external booking links from being resolved against the app origin
feat: :sparkles: adds in-app locale switcher driven by guidebook.locales (GB-1365)
chore: :wrench: updates project config files
refactor: :truck: moves marketplace and messages into their own feature folders
```

## Subject voice

- Imperative present tense: "adds", "fixes", "moves", "wires" — not "added", "fixing", "will move".
- Lowercase first word after the icon.
- No trailing period.
- Describe the **outcome**, not the steps. "polishes stay screens with checklist, policies and themed headers" beats "updates files A, B, C".
- If the subject would exceed 100 chars, tighten the wording before splitting — long subjects are a smell.

## Body (when present)

- Blank line between subject and body.
- Keep every line ≤ 100 chars by rewording or splitting, never by breaking a phrase mid-line.
- Explain _why_ / _trade-offs_ / _risk_. The diff shows _what_.
- Bullet lists are fine; keep each bullet on its own ≤100-char line, one cohesive thought per bullet.

## Pre-flight checklist

Before finalizing any commit message in this repo, verify:

- [ ] Type is one of `feat | fix | refactor | style | chore | docs | test | perf`.
- [ ] Gitmoji `:shortcode:` is present and matches the change.
- [ ] Scope (if used) is a real feature folder name, not a guess.
- [ ] Subject ≤ 100 chars including the icon and any `(GB-XXXX)` suffix.
- [ ] Body lines (if any) ≤ 100 chars each — achieved by rewording/splitting, not mid-phrase breaks.
- [ ] Each bullet is one cohesive thought; no line ends mid-clause or on a dangling word.
- [ ] No `Co-Authored-By` / Claude trailer added unprompted.

## Reference: real examples from this repo

```
feat(guidebook): :sparkles: adds dedicated check-in and check-out detail routes
feat(guidebook): :sparkles: surfaces marketplace on guidebook overview
feat: :sparkles: adds in-app locale switcher driven by guidebook.locales (GB-1365)
feat: :globe_with_meridians: wires *Txn content fallback via pickLocaleText (GB-1364)
feat: :sparkles: polishes loading skeletons, a11y labels, and route titles (GB-1366)
fix(guidebook): :bug: keeps external booking links from being resolved against the app origin
fix: :rotating_light: sort Tailwind classes in PendingActionsCard glow div
refactor: :truck: moves documents and payment into their own feature folders
refactor: :recycle: adjusts meta head name
refactor: :package: replaces lodash by ESM compatible version
style: :art: applies lint fixes to PageHeader
style: :lipstick: enhance UI consistency and accessibility
chore: :recycle: redesigns not-found page and drops sample.json fixtures
chore: :wrench: updates project config files
```
