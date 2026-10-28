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
- Mirror the source hierarchy under `src/stories/components/common/` and `src/stories/features/`, and import implementation code using the existing aliases.
- Keep `.storybook/main.ts` story discovery scoped to `src/stories/`.
- Do not expose Mockup files in Storybook. Exclude any story whose directory path or filename contains `mockup` (case-insensitive), and do not register Mockup titles under other paths.
- Once a feature's design and behavior are stable and its replacement is verified, remove its obsolete Mockup implementation and stories after checking references. Signup Mockup files have been removed; maintain the production signup features and their stories instead.

## Component ownership and wrapper rules

- Prefer direct use of the existing base component when a wrapper only renames props or supplies label, placeholder, typography, or spacing defaults. Transfer those defaults and their override order to consumers before removing the wrapper; multiple consumers alone do not justify a forwarding component.
- When callers share optional presentation or interaction owned by an existing component, prefer a small typed option or variant on that owner over a new wrapper file. Preserve its default mode, keep domain data and policy with their current owners, and retain custom slots where needed. Model incompatible options and custom slots as mutually exclusive types.
- Keep single-production-parent components in their parent module unless a necessary runtime boundary prevents it. Follow the [wrapper decision workflow](.codex/skills/component-reusability/references/wrapper-consolidation.md) and [single-parent workflow](.codex/skills/component-reusability/references/single-parent-consolidation.md); do not duplicate shared implementations merely to reduce files.
- Treat zero-production-use and story-only components separately. Confirm all references and the authorized deletion scope before removing them; Storybook use alone proves neither production reuse nor permission to delete. Migrate useful scenarios to the surviving owner or remove obsolete dedicated stories within that scope.
- Preserve HTML semantics, responsive values, accessibility, form ownership, focus and state lifetime. File-count reduction alone is not sufficient; verify both the new options and unchanged default callers, including relevant PC/mobile states.

## Shared worktree rules

- Record the index and relevant working-tree contents before changing files shared with other chats. Treat another chat's changes as concurrent work; do not reset, overwrite, or include them merely because they share a file.
- When staging is requested, preserve the current index and add only the authorized change and directly related OKF updates. Use partial patches or equivalent index operations for mixed files, inspect the staged result, and avoid whole-file staging that captures unrelated unstaged work. Do not commit or push without that authorization.

## Styling rules

- Do not create, modify, or retain `*.module.scss` files. CSS Modules are not used in this project.
- Implement component styles in the corresponding TSX file using Panda CSS `css` or `cva`.
- When migrating existing CSS Module styles, preserve all behavior and responsive breakpoints/values exactly unless the task explicitly requests a visual change.
- Remove the migrated `*.module.scss` file after its styles are fully represented in Panda CSS.
- Prefer parent-owned spacing for vertical siblings: when repeated child `mt`/`marginTop` values express a common interval, use an existing parent `Stack gap` and remove the replaced margins. Group only the uniform portion when intervals differ; preserve the group's starting space, PC/mobile values, conditional visibility, and HTML semantics. Follow the [component-reusability spacing guidance](.codex/skills/component-reusability/SKILL.md#repeated-sibling-spacing) for exceptions and verification.

## Code formatting rules

- Separate consecutive top-level declarations and `export` statements with a blank line for readability. Do not place `const`, `const`, and `export` on immediately adjacent lines without blank-line separation.

## Import order

- Use ESLint's configured import rules as the source of truth. Run `npm run lint:fix` to sort imports and apply Prettier; `npm run lint` checks violations. VS Code uses ESLint fixes on explicit save followed by the existing Prettier formatter; keep Organize Imports disabled to avoid competing sort orders.
- Sort groups in this order, with one blank line between groups: Next.js → external packages (including React and Node builtins), followed by shared hooks/context → Panda (`styled-system/*`) → common atoms → molecules → organisms → layouts → other internal modules → relative imports. Compatibility aliases belong to the same group as their canonical paths.
- Group 2 is **external packages, shared hooks and context**: external dependencies come first, followed immediately by `@/context/*`, `@/hooks/*`, and `@/lib/use[A-Z]*`, with no blank line inside this group. Internal hooks/context remain project modules; ordinary data, types and utilities belong to the later internal group.
- Sort module paths and named import bindings alphabetically. Type-only imports stay in their module's group; preserve `import type` and inline `type` forms. Do not reorder exports as part of import cleanup.
- Preserve `'use client'`/`'use server'` and comments. Side-effect imports (including CSS/SCSS) and non-import statements are fixed boundaries: sort only within each contiguous run of bound imports, never across those boundaries. The local wrapper around the pinned Perfectionist rule enforces this because `sortSideEffects: false` alone does not prevent bound imports from crossing a fixed side-effect import.
- Apply the rule to authored `src` TS/TSX, including Storybook and declaration files. Exclude generated `styled-system`, build output and dependencies.

## Component comment policy

- Add a concise JSDoc comment immediately above each exported React component declaration. Start with a Korean description followed by its English equivalent in parentheses: `한국어 설명 (English description).`
- Describe the component's purpose and, when useful, its responsibility boundary or notable behavior. Do not repeat JSX, list obvious props, or promise behavior the implementation does not provide.
- Keep comments to one sentence when possible. Add detail only when it explains a non-obvious contract that a caller or maintainer needs.
- Add comments to helpers, data, and types only when their purpose or constraints are not clear from their names and usage.

```tsx
/** 문의 한 건의 질문과 답변을 표시합니다. (Displays one inquiry's question and answer.) */
export function InquiryListItem() {
  return null;
}
```
