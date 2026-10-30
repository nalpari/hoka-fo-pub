# Single-parent consolidation

Use this workflow for an explicitly requested component cleanup. Apply the authorized scope; do not turn a survey or a skill-only update into a source migration.

## Establish ownership

- Survey `src/components` and route-private `_components` TSX. Keep contexts, hooks, pure data, policy and type modules independent.
- Resolve imports with the installed TypeScript configuration and checker. Follow aliases, barrel re-exports, namespace access and dynamic imports to actual implementation symbols. Count distinct production parent modules, not import statements or JSX occurrences. Exclude stories, tests, type-test files and type-only references from the production count.
- Exactly one production parent means the child implementation belongs in that parent, including common UI, except for supporting UI whose parent is a route's `page.tsx`: keep that UI in the route's `_components/` folder. Keep related private parts together in their component module and preserve explicit route-preview contracts. Multiple renders within the same parent do not create reuse. Recompute relationships after merging because previously separate parents can converge on one module.
- Retain actual multi-parent contracts. Multiple consumers alone do not justify default-only forwarding wrappers; classify those with [the wrapper workflow](wrapper-consolidation.md) and use the base directly or its parent-owned options without copying implementation. Separately report pre-existing zero-consumer and story-only files; consolidation alone does not authorize their removal. An explicit unused/story-only cleanup authorizes removal within that scope after reference and dedicated-story checks.

## Move without changing behavior

- Move implementation, Panda styles and private types together. Keep local components at module scope so Hooks and component identity remain stable. Do not nest their declarations inside a rendering function or flatten stateful JSX into its parent.
- Resolve name collisions by responsibility. Rewrite identifier references through symbols, preserving property keys, string literals, CSS selectors and asset paths. Resolve relative imports from the original directory. Preserve initialization order, public props, DOM, styles, responsive values, accessibility, keyboard/focus and form behavior.
- Update all consumers, type imports and re-exports before deleting the old file. If external type consumers would import a route or create a dependency cycle, provide a type-only contract module. Keep type-only imports explicit.
- Preserve the minimum necessary server/client, metadata and dynamic-loading boundary. Do not make a server route client-only to absorb a child. Record the source, parent and exact reason for every exception; file length is not an exception.
- Page modules expose only Next-supported exports and route props. Keep arbitrary preview props and component exports out of `page.tsx`.

## Storybook and evidence

- Keep stories under `src/stories` with existing titles, significant states and interaction coverage. Ordinary parent modules may export local components used by stories.
- Page-owned parts use the real page and a typed context/router adapter. An optional preview context may select a page-local composition and supply its existing props while the default production render remains unchanged. Do not duplicate implementations, retain deleted feature files for stories, or import stories into production. Keep declaration-only preview contracts out of runtime imports.
- Record original/final ownership, moved/deleted files, shared survivors, zero-consumer files and technical exceptions in OKF; update related concepts, indices and log while preserving provenance.
- Compare moved function/JSX/style structure and inspect any difference beyond names/imports. Check deleted paths, runtime cycles and page exports. Run changed-file formatting/lint, TypeScript, Panda, Next and Storybook builds, existing tests and representative PC/mobile browser flows. Record only checks actually performed. Commit/push only when requested.
