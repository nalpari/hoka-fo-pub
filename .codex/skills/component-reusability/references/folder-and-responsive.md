# Folder depth and responsive ownership

Use the relevant section for an authorized folder-depth change or shared responsive-policy change. Do not combine these migrations merely because both touch common components.

## Reduce navigation steps

- Clarify whether depth means folder/file navigation, JSX nesting, or both. Inspect current ownership first; do not repeat completed single-parent merges to reduce folder depth.
- Prefer `Name.tsx` over `Name/Name.tsx` when the directory contains only the matching implementation. Retain common layers and domain hierarchy. Keep folders with assets, data, types, docs or other implementations; inspect all entries, including hidden files. Never overwrite an existing destination.
- Preserve exports, state, DOM and styles. Folder flattening does not authorize component deletion, page merges or server/client boundary changes. Reassess a directory if an authorized wrapper consolidation leaves one implementation.
- Resolve imports before moving. Update canonical/compatibility aliases, relative imports and re-exports, dynamic imports and fixture fragments, stories, type contracts and active IA/file links. Typechecks cannot find all paths built from strings. Do not add forwarding files or barrel layers for old paths.
- Verify old runtime paths are gone and compare moved bodies independently of imports. Count flattened folders separately from deleted implementations. Preserve historical OKF provenance and link current ownership.

## Change responsive policy at its owner

- Inspect the provider, root layout, Panda conditions, global tokens, portals and Storybook overrides together. Prefer changing automatic selection at the provider over replacing all `usePlatform()` calls or duplicating interactive trees.
- Current HOKA contract: `Platform` and `usePlatform()` come from `src/context/platform.tsx`; automatic mode subscribes to `(max-width: 1024px)`. Explicit `platform` values stay fixed and do not mutate body classes. UA-based `src/lib/device.ts` was removed.
- Keep server and first hydration snapshots consistent. The current default is web followed by client correction; mobile first-paint switching was explicitly accepted for this migration. Do not promise CSS-only first-paint behavior while markup still depends on JavaScript.
- Keep app/body classes, CSS conditions and portals consistent. Restore automatic body mutations on cleanup without removing unrelated classes. Preserve state owners and stable component identities; do not key the application by platform.
- Current automatic layout: mobile through 1024px; above 1024px and below 1200px, a 1200px PC canvas with document horizontal scrolling. From 1200px, release the minimum-width constraint so classic vertical scrollbars do not create extra horizontal overflow. Keep fixed header and content canvas aligned.
- Verify 1024/1025 and 1199/1200 boundaries plus representative mobile/desktop widths. Compare `innerWidth`, document `clientWidth`/`scrollWidth`, canvas width and resolved platform; viewport size alone does not prove the selected mode.
- Resize with inputs, cart selections and overlays open. Check actual mobile/desktop interactions, including filter draft/apply behavior. Verify an explicit web story at mobile width and an explicit mobile story at desktop width separately from automatic mode.
- Inspect a preview built from current sources and run relevant checks. Record actual checks and exceptions in OKF; representative flows do not establish full visual regression or all story interactions.

See the [current implementation and verification record](../../../../okf/architecture/responsive-platform-2026-10-28.md) for folder moves, Badge options and the accepted rendering tradeoff.
