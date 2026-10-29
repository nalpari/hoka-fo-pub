<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Next.js integration policy

- Prefer the installed Next.js APIs for framework-owned behavior: `next/link` for internal route navigation, `next/navigation` for App Router URL state, `next/image` for optimizable content images, and `next/font/local` for application webfonts. Keep native anchors for external URLs, downloads and in-page fragments; preserve justified SVG, upload-preview and other runtime exceptions.
- Follow the installed `node_modules/next/dist/docs/` before applying version-sensitive options. Preserve semantic tags, image fit and dimensions, font faces and fallback order, router state, hydration and explicit Storybook platforms. Derive image `sizes` from actual layout and platform boundaries rather than a generic breakpoint.
- Define fonts once at their layout owner and reuse CSS variables. Preserve existing weights/styles; make preload choices explicit and avoid preloading every static font face. Keep Vite/Storybook font registration separate from production `next/font` output without duplicating production downloads.
- Use `useSearchParams` for reactive query state and keep a suitable `Suspense` boundary for prerendered routes. Preserve absent/empty query behavior, browser back/forward, preview router fixtures, and feature-owned state.
- Use module-level `next/dynamic` with a literal import for optional UI only when it creates a useful deferred chunk. Preserve loading/error, keyboard, focus restoration and close behavior. A required dynamic import boundary is a documented exception to single-parent consolidation; do not retain a separate file merely because dynamic loading is possible. Verify the emitted chunk and its request timing before claiming a performance gain.
- Add `next/script` when integrating actual third-party scripts and Metadata APIs when page-specific metadata is in scope. Do not introduce placeholders or migrate unrelated functionality solely to increase framework API use. See the [Next.js integration workflow](.codex/skills/component-reusability/references/nextjs-integration.md).

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

## UI data and service binding policy

- Publishing screens must accept prepared display data and explicit interaction callbacks at their existing owners. Keep actual API calls, DTO mapping, authentication, persistence, pricing and inventory decisions with the integration owner; do not invent service endpoints or implement unrelated backend behavior for a UI task.
- Distinguish an initial preview seed from a live data contract. Read externally owned collections and request state from current props or a typed domain context so late responses and refetches update the screen. Keep editable drafts local; do not blindly synchronize incoming data into a draft with an effect.
- Pass a complete typed submission payload containing the relevant input, selection IDs/options and consent state. A prop named `onSubmit` or `onConfirm` alone does not establish bindability. Await the connected request before closing, navigating, clearing data or displaying success. Preserve inputs on failure, expose pending/error states, and prevent duplicate submissions.
- For server-backed lists, accept the returned items, total count, next-page availability and loading/error states separately. Expose query-change, additional-fetch and retry events where relevant; preserve URL state and mobile draft/apply behavior. Do not re-filter a partial server response as if it were the complete catalogue or display an in-flight/failed empty response as a completed empty result.
- Keep preview-only data and presentation overrides explicit in fixtures. Do not infer a demo image or selection from real colour labels, item counts or business IDs. Move bindable product names, images, dates and options out of JSX into display data. Preserve existing default demos and PC/mobile behavior.
- Reuse existing props, hooks and state owners first. Add a typed domain context only when the existing route/shared ownership needs it; do not introduce a provider per component, a universal binding registry or a separate single-parent screen file merely to enable integration. Keep Next.js page exports and server/client boundaries valid.
- Verify binding changes with non-fixture IDs, late-arriving or replaced data, pending and failed requests, retry and successful completion, plus relevant unchanged demos on PC/mobile. Record actual checks and remaining service boundaries in OKF. Follow the [UI data and service binding workflow](.codex/skills/component-reusability/references/data-binding.md).

## Component ownership and wrapper rules

- Prefer typed presentation options on the existing label owner over named status/promotion wrappers. Preserve default callers, label order, separators, empty rendering, typography and className placement; make incompatible generated labels and custom children mutually exclusive. `Badge.status` and `Badge.promotion` are current examples.
- Avoid redundant `Name/Name.tsx` folders containing only that implementation. Retain common layers and domain ownership, and folders with assets, data, types, documentation or other implementations. Update aliases, relative imports, dynamic fixture paths, stories and active file links together without compatibility forwarding files. Folder flattening and component deletion are separate operations.

- Prefer direct use of the existing base component when a wrapper only renames props or supplies label, placeholder, typography, or spacing defaults. Transfer those defaults and their override order to consumers before removing the wrapper; multiple consumers alone do not justify a forwarding component.
- When callers share optional presentation or interaction owned by an existing component, prefer a small typed option or variant on that owner over a new wrapper file. Preserve its default mode, keep domain data and policy with their current owners, and retain custom slots where needed. Model incompatible options and custom slots as mutually exclusive types.
- Keep single-production-parent components in their parent module unless a necessary runtime boundary prevents it. Follow the [wrapper decision workflow](.codex/skills/component-reusability/references/wrapper-consolidation.md) and [single-parent workflow](.codex/skills/component-reusability/references/single-parent-consolidation.md); do not duplicate shared implementations merely to reduce files.
- Treat zero-production-use and story-only components separately. Confirm all references and the authorized deletion scope before removing them; Storybook use alone proves neither production reuse nor permission to delete. Migrate useful scenarios to the surviving owner or remove obsolete dedicated stories within that scope.
- Preserve HTML semantics, responsive values, accessibility, form ownership, focus and state lifetime. File-count reduction alone is not sufficient; verify both the new options and unchanged default callers, including relevant PC/mobile states.

## Shared worktree rules

- Record the index and relevant working-tree contents before changing files shared with other chats. Treat another chat's changes as concurrent work; do not reset, overwrite, or include them merely because they share a file.
- When staging is requested, preserve the current index and add only the authorized change and directly related OKF updates. Use partial patches or equivalent index operations for mixed files, inspect the staged result, and avoid whole-file staging that captures unrelated unstaged work. Do not commit or push without that authorization.

## Styling rules

- Runtime platform selection belongs to `src/context/platform.tsx`: automatic mode is mobile through 1024px, while explicit preview platforms remain fixed. Keep `usePlatform()`, app/body/portal classes and responsive styles consistent; preserve server/first-hydration compatibility and state owners without duplicating interactive trees.
- Automatic PC mode uses a 1200px canvas below a 1200px viewport. At 1200px and above, vertical scrollbars must not introduce horizontal overflow. Verify 1024/1025px and 1199/1200px boundaries, resizing with open overlays and explicit Storybook modes separately. See the [folder and responsive workflow](.codex/skills/component-reusability/references/folder-and-responsive.md).

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
