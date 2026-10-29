# UI data and service binding workflow

Use this workflow for publishing-screen handoff, bindability audits and requested changes to data/event boundaries. It complements [page ownership](page-ownership.md) and [form fields](form-fields.md); it does not require a new architecture or authorize unrelated service implementation. The current repository contracts are documented in [OKF](../../../../okf/architecture/data-binding.md).

## Trace the actual connection path

Inspect production callers and state owners, not just prop names. Follow incoming data through lookup, formatting, rendering, selection, submission and outcome. Distinguish:

- Prepared UI data from API DTOs and preview fixtures.
- Live externally owned collections from initial-only story seeds.
- Local drafts and temporary controls from persisted service state.
- UI validation from authentication, inventory, pricing, persistence and business decisions.

For each finding, name the concrete data/event boundary, a realistic failure such as a non-fixture ID or delayed response, and the smallest typed contract that resolves it. An audit does not authorize implementation unless requested.

## Choose the existing owner first

- Reuse existing props and callbacks. Put route composition and local UI state in the existing page module; use typed domain context only where route/shared state ownership needs it. Keep independent shared types in ordinary modules and preserve Next.js page exports and serialization boundaries.
- Do not create a provider per component, a universal service registry, a proxy wrapper or a separate single-parent screen merely for binding. API functions and DTO mapping belong to the integration owner. Do not invent endpoints, credentials or business rules.
- Do not require every component to be fully controlled. Keep presentation-only toggles and input drafts local when that preserves their behavior. Provide the values and outcomes the actual integration needs.

## Preserve current data and editing state

- Consume live lists and request states from current props/context. A one-time `useState(initialItems)` is a preview seed, not a reactive connection for late responses or refetches.
- Keep drafts independent. Define deliberate edit/reset behavior if incoming data changes; do not blindly copy every new response into active inputs with an effect.
- Keep item IDs and selected option IDs explicit. Avoid requiring actual records to exist in a demo catalogue or silently dropping them through fixture-only lookups. Either accept prepared rows or obtain the complete required catalogue from the integration owner.
- Keep preview images, selected rows and generated sample records explicit in fixtures. Do not identify demo data using real colour labels, item counts or business IDs. Bindable names, dates, images and options belong in display data rather than JSX literals. Fixed UI labels and explanatory copy may stay in JSX.

## Connect complete requests and outcomes

- Trace the complete typed payload: values, item/option/record IDs, active selections and relevant consent state. Include the chosen saved-record ID when it differs from manual input. Inspect custom controls and `FormData`; the existence of a form or callback does not guarantee that all state reaches the submit owner.
- Let the service owner perform the actual request and interpret its result. Document success and failure semantics. For a Promise contract, resolve on success and reject on failure, or use an explicit result union that the caller handles. Do not treat a resolved failure object as success.
- Await successful completion before showing success, navigating, closing a modal, clearing inputs or removing records. Keep drafts and the current flow on failure; expose an accessible error and an appropriate retry action.
- Expose pending state and prevent duplicate mutations, including repeated clicks before a render and controls in portal footers. Preserve form ownership, keyboard behavior and focus restoration.
- Authentication/verification success must follow the connected verifier's result. Start service-dependent timers after the relevant request succeeds and invalidate stale results when identifying input changes.

## Connect server-backed lists

- Accept returned items, total count and next-page availability independently. Do not infer total count from a partial page, truncate a server page with demo display limits, or apply full-catalogue filtering/sorting again to an already filtered response.
- Expose applied query changes, additional fetch and retry where needed. Preserve URL/back/forward behavior, absent/empty parameters and mobile draft/apply boundaries. If mobile draft counts are fetched separately, give them an explicit input/event contract.
- Show pending and failed states distinctly from a completed empty result. Keep usable previously loaded items where appropriate. Guard duplicate additional-fetch calls and document which owner handles stale request cancellation and response ordering.
- Keep query notification callbacks stable when used by effects, or use a suitable event mechanism that avoids triggering a fetch on every provider render. Preserve the existing data-fetching strategy when it already owns those responsibilities.

## Verify the handoff contract

For source changes, exercise relevant production UI with non-fixture IDs, a late response, replaced data after mount, an empty completed response, pending/failure/retry and successful completion. Check payload values, whether completion happens only after success, retained drafts, and unchanged default demos on PC/mobile. Test actual outcomes rather than mirroring implementation details.

Use existing stories/providers and add focused scenarios at the current owners. Keep stories under `src/stories/`. Run appropriate type/lint/style/build checks and inspect runtime errors; a build or a Storybook render finishing does not prove its play assertions passed. Record actual verification and remaining integration boundaries in the mapped OKF concepts and log. For policy-only edits, validate document links and consistency; application builds are unnecessary.
