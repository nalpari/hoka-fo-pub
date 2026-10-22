<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project knowledge (OKF)

- Start with [okf/index.md](okf/index.md) and read the concepts relevant to the task.
- Treat OKF as repository knowledge; user instructions and applicable project rules take precedence.
- When code or workflow changes invalidate a concept, update its content, sources, related index, and `okf/log.md` using [okf/maintenance.md](okf/maintenance.md).
- Preserve provenance and trust metadata; record verification only when it actually occurred.
- For source changes, follow the related-document mapping in `scripts/okf-sync.mjs`; update the relevant concepts and `okf/log.md` before finishing.
- Keep source changes and their directly related OKF updates in the same commit. Run `npm run okf:check` against the staged changes before committing.

## Storybook rules

- Keep all `*.stories.ts` and `*.stories.tsx` files under `src/stories/`. Do not colocate stories in `src/shared/` or `src/app/`.
- Mirror the source hierarchy under `src/stories/components/` and `src/stories/features/`, and import implementation code using the existing aliases.
- Keep `.storybook/main.ts` story discovery scoped to `src/stories/`.
- Do not expose Mockup files in Storybook. Exclude any story whose directory path or filename contains `mockup` (case-insensitive), and do not register Mockup titles under other paths.
- Once a feature's design and behavior are stable and its replacement is verified, remove its obsolete Mockup implementation and stories after checking references. Signup Mockup files have been removed; maintain the production signup features and their stories instead.

## Styling rules

- Do not create, modify, or retain `*.module.scss` files. CSS Modules are not used in this project.
- Implement component styles in the corresponding TSX file using Panda CSS `css` or `cva`.
- When migrating existing CSS Module styles, preserve all behavior and responsive breakpoints/values exactly unless the task explicitly requests a visual change.
- Remove the migrated `*.module.scss` file after its styles are fully represented in Panda CSS.
- Prefer parent-owned spacing for vertical siblings: when repeated child `mt`/`marginTop` values express a common interval, use an existing parent `Stack gap` and remove the replaced margins. Group only the uniform portion when intervals differ; preserve the group's starting space, PC/mobile values, conditional visibility, and HTML semantics. Follow the [component-reusability spacing guidance](.codex/skills/component-reusability/SKILL.md#repeated-sibling-spacing) for exceptions and verification.

## Code formatting rules

- Separate consecutive top-level declarations and `export` statements with a blank line for readability. Do not place `const`, `const`, and `export` on immediately adjacent lines without blank-line separation.
