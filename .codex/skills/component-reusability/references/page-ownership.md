# Page ownership and migration

Apply this workflow within the authorized scope. A policy-only request updates the skill; it does not authorize moving source files. Read `okf/index.md`, relevant concepts, applicable AGENTS.md files, and the installed Next.js documentation before source edits.

## Classify by actual consumers

- Inventory route imports and default re-exports, and trace exact production, Storybook, and test consumers. Do not classify by filename or file length.
- A single-route screen belongs in its `src/app/{route}/page.tsx`. Integrate wrapper hooks and callbacks into that default page; move the implementation rather than copying it. Keep pure policy, state, hook and type modules independent. Apply the [single-parent workflow](single-parent-consolidation.md) recursively to child TSX modules; retain useful local components as module-level functions in their sole production parent.
- Keep multi-route or multi-screen contracts in `src/components`: examples include RunClubPage, SystemStatusPage, and the listing shared by catalog and search. Reusable modals remain components. Never duplicate a shared screen into several routes or import another route's page from production UI.
- Keep a domain frame's repeated breadcrumbs, navigation and supported page layouts in that frame. Prefer an optional layout mode, such as MyPageFrame's sidebar/centered modes, over copying its main/breadcrumb structure into a route or adding a second whole-page wrapper. Preserve the default layout and let the route keep its body, state and trailing breadcrumb items; apply [the wrapper workflow](wrapper-consolidation.md) before extending the API.
- Keep a Server Component entrypoint when it owns metadata or a server-only contract. Put necessary page-private client UI in the route's `_components` folder; do not move metadata into a client module or add a client boundary solely for stylistic consistency.
- Page files expose only the default route component and framework-supported exports. Do not preserve arbitrary page props or named component/type exports to accommodate stories. Keep explicit types and providers in ordinary modules.
- Route ownership does not mean all data must be page-local. Keep server-backed collections and request outcomes with their integration owner and consume their current values through existing props or a necessary typed domain context. Preserve local editing drafts and transient UI state; do not copy live collections into one-time `initial*` state. Follow [the data binding workflow](data-binding.md) without extracting a single-parent screen merely for injection.

Depth does not change ownership: apply the same rule to `app/mypage/{section}/page.tsx` and deeper routes. A shared switch on a fixed route `kind` is routing indirection, not by itself a reusable screen contract. Resolve each branch into its route; move single-route child screens there too. Keep genuinely shared behavior such as order/return handling, product history variants, in feature components, and phone validation/timer state in a shared hook. Do not copy an entire dispatcher into every page.

For 3Depth and deeper routes, keep mode-specific titles, descriptions, completion navigation, and modal composition in the actual page. Shared phone validation/timer state can live in `usePhoneVerification`; use the reusable form content directly rather than importing a whole PhoneVerificationPage. A standalone dialog route may compose ModalDialog's action options and shared message content. Keep genuinely shared popup behavior with its owner rather than recreating a wrapper solely for default buttons.

## Preserve behavior and stories

- Keep URLs, route parameters, search parameters, navigation, Suspense behavior, state initialization, form ownership, web/mobile presentation, and exact responsive values. Resolve relative imports from the original source directory before moving them.
- Pages may own local JSX and Panda styles. Extract only an independently useful UI or policy boundary; retain markup inline when extraction creates prop forwarding or empty wrappers. Follow the existing component JSDoc and declaration-spacing rules.
- Stories live under `src/stories`, mirroring `components/common` and feature groupings; Mockup paths and titles remain excluded. Import the actual moved page or its necessary private client implementation. Use story-only adapters and existing context/router facilities for fixtures and callbacks; do not retain duplicate screen implementations or create fake production route props.
- Add a value-injection provider only when stateful stories require it; keep the production state owner and update semantics intact. Production modules must not depend on Storybook. Preserve empty, error, callback, and interaction scenarios, not only the default render.
- After updating every consumer, delete the old implementation and unused imports/types. Keep multi-route exceptions explicit in the completion report.

## Integrate changes from old paths

When explicitly requested, translate an incoming patch from `src/shared/components` to `src/components/common`, from `src/shared/features` to `src/components`, and from other `src/shared` directories to their current `src` equivalents. Rewrite matching aliases and compare base/current/incoming content so existing edits survive. Never overwrite current files with whole remote files or recreate the retired tree. Apply incoming behavior before moving a page so the final implementation includes both changes.

## Verify

Rescan exact removed paths, retired aliases, and route exports. Run affected lint/format checks, type checking, Panda generation, Next and Storybook builds, and relevant existing behavior tests. Check meaningful web/mobile route or story interactions. Update related OKF concepts, working-tree source paths, index, and log according to `scripts/okf-sync.mjs`; record only checks actually performed. Preserve unrelated dirty-worktree changes. Do not commit or push unless requested.
