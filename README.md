# lukasborges.me

Personal website of **Lucas Borges**, Senior Frontend Engineer.

**Live:** https://lukastborges.github.io/lukasborges.me/

A static, single-page portfolio built with Astro and TypeScript. It ships no framework runtime: the
interactive parts are a few kilobytes of vanilla TypeScript, and every page works without JavaScript.

| Lighthouse (mobile) | Performance | Accessibility | Best Practices | SEO |
| ------------------- | ----------- | ------------- | -------------- | --- |
| Score               | 100         | 100           | 100            | 100 |

## Stack

| Concern         | Choice                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| Framework       | [Astro](https://astro.build) 7, static output                             |
| Language        | TypeScript (strictest config)                                             |
| Styling         | Modern CSS: custom properties, cascade layers, container-friendly layouts |
| Fonts           | Geist and Geist Mono, self-hosted through Astro's Fonts API               |
| Lint and format | [Biome](https://biomejs.dev), with Astro template support                 |
| Tests           | Vitest (data and utilities), Playwright with axe (end to end, a11y)       |
| Git hooks       | Lefthook (Biome on staged files, commitlint on messages)                  |
| Releases        | semantic-release from Conventional Commits                                |
| Hosting         | GitHub Pages through GitHub Actions                                       |

## Getting started

Requires Node 24 (see `.nvmrc`) and pnpm 11.

```bash
pnpm install    # also installs the git hooks
pnpm dev        # http://localhost:4321/lukasborges.me/
```

| Script            | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `pnpm dev`        | Start the dev server                                      |
| `pnpm build`      | Build the static site into `dist/`                        |
| `pnpm preview`    | Serve the production build locally                        |
| `pnpm lint`       | Biome lint and format check                               |
| `pnpm format`     | Apply Biome fixes and formatting                          |
| `pnpm check`      | Astro and TypeScript type check                           |
| `pnpm test`       | Unit tests (dates, data integrity, privacy guards)        |
| `pnpm test:e2e`   | Playwright tests on desktop and mobile, including axe     |
| `pnpm images`     | Regenerate the avatar, `public/og.png` and `public/apple-touch-icon.png` |
| `pnpm validate`   | Lint, type check, unit tests and build in one go          |

The first time you run end-to-end tests, install Chromium with `pnpm exec playwright install chromium`.

## Project structure

```text
src/
  types/content.ts   Typed content models (Profile, Experience, Skill, Project, …)
  data/              All professional content. Edit here, not in components.
  lib/               Date math, URL helpers, JSON-LD
  assets/            Brand logo (source) and the derived avatar
  components/        Reusable UI (Nav, Button, Tag, Icon, ProjectVisual, …)
  sections/          Page sections (Hero, About, Experience, …)
  scripts/           Client-side behavior (nav, theme, reveal, hero graph)
  styles/            Design tokens, base styles, motion system
  layouts/           Document shell: SEO, Open Graph, structured data, theme bootstrap
  pages/             index, 404 and robots.txt
e2e/                 Playwright specs
scripts/             Build-time tooling (social image generation)
```

## Updating content

All content lives in typed data files under `src/data/`:

- `profile.ts`: name, headline, summary, location, links.
- `experience.ts`: companies and roles, most recent first.
- `skills.ts`: expertise groups. Every skill must cite where it was used.
- `projects.ts`: case studies. Only add `outcomes` that can be backed up.
- `education.ts`: degrees, certifications, courses and honors. Empty lists are hidden.
- `approach.ts`: working principles, each tied to evidence.

Durations ("2 yrs 7 mos") and years of experience are calculated from dates at build time, so there
is nothing to update by hand. A monthly scheduled build keeps them current.

`pnpm test` fails if content breaks an invariant. Examples: a skill without evidence, inverted dates,
or a phone number or unapproved email address in the data.

The profile picture comes from `src/assets/brand/logo.png`. `pnpm images` crops it into
`src/assets/avatar.png`, which `astro:assets` then optimizes to WebP. Run `pnpm images` after
changing the logo, name, title or headline to refresh the avatar and the social preview image.

## Deployment

Every push to `main` runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. **Validate:** install, lint, type check, unit tests, build, then Playwright and axe tests.
2. **Deploy:** publish `dist/` to GitHub Pages.
3. **Release:** semantic-release reads the commits since the last tag. It bumps the version, updates
   `CHANGELOG.md`, tags the release and publishes GitHub release notes.

Pull requests run the validate job only. The workflow also runs on the 1st of each month and can be
started manually from the Actions tab.

### One-time GitHub setup

In the repository, go to **Settings → Pages → Build and deployment** and set **Source** to
**GitHub Actions**.

### Moving to a custom domain

The base path is configured in `astro.config.ts` and can be overridden with environment variables.
To serve from `https://lukasborges.me`:

1. Add `public/CNAME` containing `lukasborges.me`.
2. In the workflow, set `SITE_URL=https://lukasborges.me` and `BASE_PATH=/` as `env` on the build
   and e2e steps. Or change the defaults in `astro.config.ts` and `playwright.config.ts`.
3. Configure the domain's DNS and set the custom domain under **Settings → Pages**.

## Commit conventions

Commits follow Conventional Commits with a gitmoji, enforced by commitlint:

```text
feat(experience): :sparkles: add expandable earlier roles
fix: :bug: keep em dash on the headline's first line
```

`feat` produces a minor release, `fix` and `perf` produce a patch, and a `BREAKING CHANGE` footer
produces a major release.

## Accessibility and performance

- Targets WCAG 2.2 AA. Axe runs in CI against both themes, and every color pair is contrast-checked.
- Full keyboard support: skip link, visible focus, and native `popover` and `<details>` elements.
- `prefers-reduced-motion` removes all animation. Content never depends on motion or JavaScript.
- CSS is inlined. The only render-critical requests are the HTML and one preloaded font file.
- The hero canvas only animates while something changes, and pauses off-screen.

## License

[MIT](LICENSE)
