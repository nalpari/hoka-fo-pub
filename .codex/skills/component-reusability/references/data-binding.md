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

## Developer binding comments

Use the exact source-comment marker **`[ 개발팀 바인딩 ]`**, including one space immediately inside each bracket, for developer handoff instructions. Add or update it when creating or changing a data/service contract or carrying out an authorized handoff-comment task. The marker identifies integration guidance, not ordinary styling or accessibility comments.

- Put the comment beside the actual connection owner: a display/submission type, props/context declaration, query/mutation handler, or fixture-to-service boundary. A short route note may point to that owner. Do not annotate every JSX node or create a new wrapper/provider merely to hold a comment.
- Describe the concrete props/context/callback to connect and the incoming display model, stable record/option IDs or complete submission payload. Explain DTO conversion where the server model differs from the UI model.
- Document the relevant request trigger and outcome: when to resolve/reject or return a result union, what pending/error/retry state the UI consumes, and when navigation, closing, clearing or removal happens. State who refreshes lists/counts, preserves editing drafts and rejects stale results when those responsibilities exist.
- Identify demo seeds, fixed examples and genuinely unconnected features. Explain the existing extension point or the contract that still needs implementation; do not invent an endpoint, token or success behavior. A comment does not make an unimplemented service available.
- Keep the explanation specific to the owner. Do not paste every checklist item into read-only content or repeat a shared contract across all consumers. Update comments when fields, IDs, request behavior or ownership change.
- Preserve an exported React component's concise Korean description followed by its English equivalent. Put `[ 개발팀 바인딩 ]` in a subsequent paragraph of that same JSDoc, or beside the relevant type/handler; do not displace the required summary with a marker-only comment.
- For existing comments using `[개발팀 바인딩]`, use the canonical spaced marker when editing that comment within the authorized scope. A policy-only change does not trigger a repository-wide normalization, application refactor or changes to user-excluded files.

Example at an existing data owner:

```ts
/**
 * [ 개발팀 바인딩 ]
 * 연결: Client 어댑터에서 MyPageDataContext.addresses에 현재 목록과 save/remove를 전달합니다.
 * 데이터: 수정은 기존 배송지 id, 신규 등록은 id 없이 전달하며 DTO를 Address 표시 모델로 변환합니다.
 * 결과: 서버 저장/삭제와 최신 목록 반영 후 resolve하고, 실패는 Error로 reject해 초안과 열린 화면을 유지합니다.
 * 상태: 조회 pending/error는 Provider에 전달하고, 저장 후 목록 재조회는 연결 함수 소유자가 처리합니다.
 */
```

Search both the canonical marker and older unspaced comments with:

```sh
rg -n '\[\s*개발팀 바인딩\s*\]' src
```

For policy-only updates, check agreement between AGENTS.md, this convention and the skill entrypoint, and validate local links/skill metadata. Do not run application builds merely for a comment-policy change.

## Verify the handoff contract

For source changes, exercise relevant production UI with non-fixture IDs, a late response, replaced data after mount, an empty completed response, pending/failure/retry and successful completion. Check payload values, whether completion happens only after success, retained drafts, and unchanged default demos on PC/mobile. Test actual outcomes rather than mirroring implementation details.

Use existing stories/providers and add focused scenarios at the current owners. Keep stories under `src/stories/`. Run appropriate type/lint/style/build checks and inspect runtime errors; a build or a Storybook render finishing does not prove its play assertions passed. Record actual verification and remaining integration boundaries in the mapped OKF concepts and log. For policy-only edits, validate document links and consistency; application builds are unnecessary.
