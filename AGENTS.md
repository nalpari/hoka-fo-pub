<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Next.js integration policy

- Prefer the installed Next.js APIs for framework-owned behavior: `next/link` for internal route navigation, `next/navigation` for App Router URL state, `next/image` for optimizable content images, and `next/font/local` for application webfonts. Keep native anchors for external URLs, downloads and in-page fragments; preserve justified SVG, upload-preview and other runtime exceptions.
- Follow the installed `node_modules/next/dist/docs/` before applying version-sensitive options. Preserve semantic tags, image fit and dimensions, font faces and fallback order, router state, hydration and explicit preview platforms. Derive image `sizes` from actual layout and platform boundaries rather than a generic breakpoint.
- Define fonts once at their layout owner and reuse CSS variables. Preserve existing weights/styles; make preload choices explicit and avoid preloading every static font face.
- Use `useSearchParams` for reactive query state and keep a suitable `Suspense` boundary for prerendered routes. Preserve absent/empty query behavior, browser back/forward, preview router fixtures, and feature-owned state.
- Use module-level `next/dynamic` with a literal import for optional UI only when it creates a useful deferred chunk. Preserve loading/error, keyboard, focus restoration and close behavior. A required dynamic import boundary is a documented exception to single-parent consolidation; do not retain a separate file merely because dynamic loading is possible. Verify the emitted chunk and its request timing before claiming a performance gain.
- Add `next/script` when integrating actual third-party scripts and Metadata APIs when page-specific metadata is in scope. Do not introduce placeholders or migrate unrelated functionality solely to increase framework API use. See the [hoka-markup-handoff references/nextjs-integration.md](.agents/skills/hoka-markup-handoff/references/nextjs-integration.md).

## Publishing handoff skill

- Use the repository skill [hoka-markup-handoff](.agents/skills/hoka-markup-handoff/SKILL.md) for markup handoff and its integrated component ownership, wrapper, form, Panda, responsive and Next.js guidance. Resolve its `references/` paths from `.agents/skills/hoka-markup-handoff/`; no personal skill installation is required. The retired `component-reusability` skill is not used.
- Within an authorized publishing handoff, remove service/demo flows and keep prepared display fixtures, fixed state URLs and minimum local UI interactions. Do not reintroduce authentication, requests, persistence, calculations or completion navigation merely to preserve a previous demo. Preserve contracts used by out-of-scope screens and follow explicit user exclusions.

## Markdown design references

- Omit Figma node IDs, including instance paths, from Markdown documents. This applies to prose, tables, code examples, comments, front matter and URLs. Refer to the design by screen, state or component name. If a link is useful, use the file-level URL without node parameters or fragments. Keep implementation measurements and verification results.

## Project knowledge (OKF)

- Start with [okf/index.md](okf/index.md) and read the concepts relevant to the task.
- Treat OKF as repository knowledge; user instructions and applicable project rules take precedence.
- When code or workflow changes invalidate a concept, update its content, sources, related index, and `okf/log.md` using [okf/maintenance.md](okf/maintenance.md).
- Preserve provenance and trust metadata; record verification only when it actually occurred.
- For source changes, follow the related-document mapping in `scripts/okf-sync.mjs`; update the relevant concepts and `okf/log.md` before finishing.
- Keep source changes and their directly related OKF updates in the same commit. Run `npm run okf:check` against the staged changes before committing.

## UI data and service binding policy

- Publishing screens must accept prepared display data and explicit interaction callbacks at their existing owners. Keep actual API calls, DTO mapping, authentication, persistence, pricing and inventory decisions with the integration owner; do not invent service endpoints or implement unrelated backend behavior for a UI task.
- Distinguish an initial preview seed from a live data contract. Read externally owned collections and request state from current props or a typed domain context so late responses and refetches update the screen. Keep editable drafts local; do not blindly synchronize incoming data into a draft with an effect.
- Pass a complete typed submission payload containing the relevant input, selection IDs/options and consent state. A prop named `onSubmit` or `onConfirm` alone does not establish bindability. Await the connected request before closing, navigating, clearing data or displaying success. Preserve inputs on failure, expose pending/error states, and prevent duplicate submissions.
- For server-backed lists, accept the returned items, total count, next-page availability and loading/error states separately. Expose query-change, additional-fetch and retry events where relevant; preserve URL state and mobile draft/apply behavior. Do not re-filter a partial server response as if it were the complete catalogue or display an in-flight/failed empty response as a completed empty result.
- Keep preview-only data and presentation overrides explicit in fixtures. Do not infer a demo image or selection from real colour labels, item counts or business IDs. Move bindable product names, images, dates and options out of JSX into display data. Preserve existing default demos and PC/mobile behavior.
- Reuse existing props, hooks and state owners first. Add a typed domain context only when the existing route/shared ownership needs it; do not introduce a provider per component, a universal binding registry or a separate single-parent screen file merely to enable integration. Keep Next.js page exports and server/client boundaries valid.
- Add or update developer handoff comments at the data/service boundaries touched by a binding or UI handoff change, using the exact marker `[ 개발팀 바인딩 ]` (including the spaces inside the brackets). State the actual connection owner and props/context/callback, display data and identifiers or submission payload, request timing, success/failure/pending/retry behavior, and who refreshes state or discards stale responses where relevant. Distinguish fixtures and unconnected features from implemented service contracts; never claim an API exists because a comment describes it. Keep the comment near its owner and update it with the contract; avoid repeating it on every JSX node. Preserve the Korean/English summary immediately above exported React components. Detailed placement and examples are in the [hoka-markup-handoff references/data-binding.md](.agents/skills/hoka-markup-handoff/references/data-binding.md).
- Verify binding changes with non-fixture IDs, late-arriving or replaced data, pending and failed requests, retry and successful completion, plus relevant unchanged demos on PC/mobile. Record actual checks and remaining service boundaries in OKF. Follow the [hoka-markup-handoff references/data-binding.md](.agents/skills/hoka-markup-handoff/references/data-binding.md).

## Component ownership and wrapper rules

- Under `src/app`, keep each `page.tsx` focused on its route component and framework-required exports. Place page-private supporting components and their component-local types/styles in that route's `_components/` folder. Keep related private parts together at their existing responsibility boundary rather than creating one file per JSX fragment. Keep existing pure helpers/data beside the route, preserve shared components, server/client boundaries, state lifetime and explicit route-preview contracts, and leave routes without supporting UI or with an appropriate existing structure unchanged. This page-entrypoint rule takes precedence over single-parent consolidation guidance, including skill references; do not introduce a whole-screen forwarding wrapper merely to shorten the page.
- Prefer typed presentation options on the existing label owner over named status/promotion wrappers. Preserve default callers, label order, separators, empty rendering, typography and className placement; make incompatible generated labels and custom children mutually exclusive. `Badge.status` and `Badge.promotion` are current examples.
- Avoid redundant `Name/Name.tsx` folders containing only that implementation. Retain common layers and domain ownership, and folders with assets, data, types, documentation or other implementations. Update aliases, relative imports, dynamic fixture paths, active file links together without compatibility forwarding files. Folder flattening and component deletion are separate operations.

- Prefer direct use of the existing base component when a wrapper only renames props or supplies label, placeholder, typography, or spacing defaults. Transfer those defaults and their override order to consumers before removing the wrapper; multiple consumers alone do not justify a forwarding component.
- When callers share optional presentation or interaction owned by an existing component, prefer a small typed option or variant on that owner over a new wrapper file. Preserve its default mode, keep domain data and policy with their current owners, and retain custom slots where needed. Model incompatible options and custom slots as mutually exclusive types.
- Keep single-production-parent components in their parent module unless the page-entrypoint rule above or a necessary runtime boundary prevents it. Follow the [hoka-markup-handoff references/wrapper-consolidation.md](.agents/skills/hoka-markup-handoff/references/wrapper-consolidation.md) and [hoka-markup-handoff references/single-parent-consolidation.md](.agents/skills/hoka-markup-handoff/references/single-parent-consolidation.md); do not duplicate shared implementations merely to reduce files.
- Treat zero-production-use and story-only components separately. Confirm all references and the authorized deletion scope before removing them; Preview use alone proves neither production reuse nor permission to delete. Preserve useful scenarios as fixed state URLs within that scope.
- Preserve HTML semantics, responsive values, accessibility, form ownership, focus and state lifetime. File-count reduction alone is not sufficient; verify both the new options and unchanged default callers, including relevant PC/mobile states.

## Figma font weight policy

- **사용자 확정 (2026-11-19):** Figma의 숫자 굵기와 해당 텍스트에 명시된 굵기 모드 이름이 충돌하면 **모드 이름을 우선**한다. 레이아웃 패널·복사 CSS·추출 데이터의 숫자보다 모드에 대응하는 기존 Typography 옵션·숫자 굵기·실제 폰트 face를 사용한다. `Body Weights: Medium`과 `700`이 함께 표시되면 현재 HOKA의 `medium` / `500` / Medium 폰트 파일을 선택한다. 다른 모드도 기존 프로젝트 매핑을 따르며 굵기와 무관한 모드는 근거로 사용하지 않는다. 모드를 읽지 못했거나 매핑이 불명확할 때만 추가 확인하고 관측값과 추정값을 구분한다. EmptyState·Button.loadMore 등 별도로 사용자 확정된 화면·컴포넌트 굵기 규칙은 유지한다.

## SupportTabs fixed font weight policy

- **사용자 확정 (2026-11-20):** `SupportTabs`의 탭 라벨은 페이지·variant·PC/MO와 관계없이 선택 시700, 미선택 시400으로 고정한다. 선택 상태는 Base UI의 `data-active`를 따른다. 화면별 labelWeights override와 Figma 숫자·모드로 이 규칙을 바꾸지 않는다. 변경하려면 사용자의 명시적 정책 변경 요청이 필요하다.

## Shared component defaults

- **공통 모달 모서리 규칙 (2026-11-27):** `ModalDialog`의 모바일 가운데 팝업은 `alert`·`confirm`에서 반경 8px로 고정한다. 반경은 공통 레시피에서 관리한다.

### NumberStepper fixed icon design rule

- **사용자 확정 (2026-11-19):** `src/components/common/atoms/NumberStepper.tsx`의 현재 아이콘 표시 크기를 고정한다. PC는 18px, 모바일은 16px 프레임이며 plus/minus SVG의 내부 여백 보정인 `maskSize: '150%'`와 `WebkitMaskSize: '150%'`를 유지한다. trash도 동일한 PC18px/MO16px 프레임을 사용한다.
- Figma 재검수·스타일 정리·리팩터링·공용 Icon 변경을 이유로 아이콘 프레임, 도형의 실제 표시 크기, SVG 여백 보정값을 임의로 축소·확대하거나 제거하지 않는다. 새로운 디자인 링크만으로 변경 승인으로 간주하지 않으며 사용자의 명시적인 크기 변경 요청이 필요하다. SVG 자산이 바뀌어도 기존 실제 표시 크기를 보존하고 PC·모바일 스크린샷으로 확인한다.
- 기본 `trash={false}`는 수량 1에서 비활성 trash를 표시하며, `trash={true}`는 수량 1에서 활성 trash를 표시한다. 수량 2 이상은 minus를 표시하고 기존 min 제한을 유지한다. 이 표시 옵션을 이유로 아이콘 크기를 바꾸지 않는다.

- **테이블형 빈 안내 공통 규칙 (2026-11-18):** `EmptyState variant="plain"`을 테이블형 목록 안에 배치할 때 PC 영역 최소 높이는 220px, 모바일 영역 높이는 120px이며 문구 최대 너비는 320px, 가로·세로 중앙 정렬이다. 모바일 좌우 여백은 12px을 유지하고 좁은 화면에서는 문구가 줄어들 수 있게 한다. `EmptyState.recipe.tsx`의 `layout="table"` 또는 기존 테이블형 layout(notices/claimHistory/orderSummary)에 공통 규칙을 적용한다. 일반 검색·페이지형 plain과 기존 명시적 standard에는 일괄 적용하지 않는다. 과거 시안의 높이보다 이 사용자 확정 규칙이 우선한다.

- **공통 더보기 UI 규칙 (2026-11-18):** `Button.loadMore`는 콜백 미연결만을 이유로 `disabled` 처리하지 않는다. 고정 퍼블리싱 fixture의 더보기는 정상 표시를 유지하고 임의 조회 동작을 만들지 않는다. 실제 pending 또는 명시적 사용 불가 사유가 있는 disabled는 유지한다. 더보기 문구와 숫자의 `fontWeight`는 PC·모바일 모두 항상 `400`으로 고정한다. 부모나 호출부의 굵기 설정으로 변경하지 않는다.

### EmptyState fixed design rule

- **사용자 확정 디자인 규칙 (2026-11-27):** 공통 레시피의 EmptyState heading형 제목은 PC **20px / Regular(400) / line-height 120%**, 모바일 **18px / Regular(400) / line-height 120%**를 사용한다. 본문형 빈 안내와 description에는 이 heading 크기를 일괄 적용하지 않는다.
- 이 규칙은 Figma·스크린샷·과거 OKF 기록의 이전 수치보다 우선한다. 디자인 동기화·리팩터링·시안 검수 중에도 이전 수치로 되돌리지 않는다. 크기를 다시 바꾸려면 이 규칙을 변경한다는 사용자의 명시적 지시가 필요하며, 새로운 디자인 링크만으로 변경 승인으로 간주하지 않는다.
- 스타일 소유자는 `src/components/common/atoms/EmptyState.recipe.tsx`다. 공통 기본값과 cart/search/launch 등 heading형 layout의 크기를 일치시키고 호출부의 typography props/className으로 과거 크기를 재도입하지 않는다. 독립 compound title과 외부 override 호환 API는 유지한다.


- When adding or refactoring an optional presentation prop such as `variant`, explicitly define its existing default in the component parameter and the corresponding Panda recipe `defaultVariants`. Preserve existing explicit default variant selections unless removal is explicitly requested. Keep the prop optional so omission and explicit `undefined` preserve the same existing behavior; do not make existing callers supply a new required prop merely to support a recipe extraction.
- Verify omitted, explicit `undefined`, default and every retained explicit variant, including existing content/action slots and overrides. Run lint and TypeScript checks against existing callers; distinguish type errors from lint errors and do not claim a reported integration failure is fixed without its actual diagnostics. Document the default in the public prop JSDoc and handoff guide.
- Preserve intentionally required discriminants and incompatible prop combinations. Do not invent defaults for service decisions, identifiers, submission data or a presentation contract that requires caller selection.

## Shared worktree rules

- Record the index and relevant working-tree contents before changing files shared with other chats. Treat another chat's changes as concurrent work; do not reset, overwrite, or include them merely because they share a file.
- When staging is requested, preserve the current index and add only the authorized change and directly related OKF updates. Use partial patches or equivalent index operations for mixed files, inspect the staged result, and avoid whole-file staging that captures unrelated unstaged work. Do not commit or push without that authorization.

## Phone number display policy

- 전화번호는 공백 없이 하이픈으로 구분한다. 예: `010-1234-5678`, `02-123-4567`, `1661-1919`. 원래 번호와 지역번호·대표번호의 자리수는 유지한다.
- 디자인/Figma에 점이나 공백 구분 전화번호가 있어도 이 규칙을 우선한다. 화면 문구, placeholder, 표시 fixture와 새 구현 모두 동일하게 적용한다.

## Styling rules

- 상품 옵션을 한 줄로 요약할 때 공통 `formatProductOptions`로 색상, 사이즈, 발볼 순서로 표시한다. 없는 옵션은 구분자와 함께 생략하고, 화면에서 수량을 함께 표시하는 경우 옵션 뒤에 둔다.

- 상품 종류가 섞일 수 있는 상품 카드 목록은 PC·모바일 모두 의류 기준 이미지 프레임 비율 `371 / 464`를 적용한다. 현재 표시 중인 상품 종류에 따라 비율을 바꾸지 않고 목록 단위로 `ProductThumbnail`의 `listing`을 사용한다. `ProductCard`의 본문 variant가 별도로 필요한 경우 `thumbnailVariant="listing"`으로 이미지 비율을 지정한다.

- Runtime platform selection belongs to `src/context/platform.tsx`: automatic mode is mobile through 1024px, while explicit preview platforms remain fixed. Keep `usePlatform()`, app/body/portal classes and responsive styles consistent; preserve server/first-hydration compatibility and state owners without duplicating interactive trees.
- Automatic PC mode uses a 1200px canvas below a 1200px viewport. At 1200px and above, vertical scrollbars must not introduce horizontal overflow. Verify 1024/1025px and 1199/1200px boundaries, resizing with open overlays and explicit preview modes separately. See the [hoka-markup-handoff references/folder-and-responsive.md](.agents/skills/hoka-markup-handoff/references/folder-and-responsive.md).

- Do not create, modify, or retain `*.module.scss` files. CSS Modules are not used in this project.
- Implement component styles in the corresponding TSX file using Panda CSS `css` or `cva`.
- Preserve existing Panda layout components (`Box`, `Flex`, `Stack`, `VStack`, `HStack`, `Grid`, etc.) when extracting or reorganizing styles. Do not replace them with native `div`/`span` elements solely to move styles into a named object, `className`, or recipe. Apply extracted styles through the component's supported `css`/`className` API; when pattern defaults would conflict, merge the recipe's raw style object through `css` while preserving semantics, default layout, spacing, responsive behavior and override order. Change the element or component only when a separate semantic or functional requirement justifies it.
- When a `className={css({ ... })}` style object contains two or more entries, extract it into a named property of a module-level `styles` object near the top of the same TSX file and use `className={styles.heading}` (or another purpose-specific name). Reuse an existing named style object when appropriate. A single-entry style may remain inline. Count responsive conditions and nested selectors as entries; preserve their values, specificity and override order. For styles that depend on props or state, keep the dynamic values at their existing owner and use a typed style function or variant rather than hoisting runtime-dependent values to module scope.
- When migrating existing CSS Module styles, preserve all behavior and responsive breakpoints/values exactly unless the task explicitly requests a visual change.
- Remove the migrated `*.module.scss` file after its styles are fully represented in Panda CSS.
- Prefer parent-owned spacing for vertical siblings: when repeated child `mt`/`marginTop` values express a common interval, use an existing parent `Stack gap` and remove the replaced margins. Group only the uniform portion when intervals differ; preserve the group's starting space, PC/mobile values, conditional visibility, and HTML semantics. Follow the [hoka-markup-handoff references/component-quality.md#repeated-sibling-spacing](.agents/skills/hoka-markup-handoff/references/component-quality.md#repeated-sibling-spacing) for exceptions and verification.

## Code formatting rules

- Separate consecutive top-level declarations and `export` statements with a blank line for readability. Do not place `const`, `const`, and `export` on immediately adjacent lines without blank-line separation.

## Import order

- Use ESLint's configured import rules as the source of truth. Run `npm run lint:fix` to sort imports and apply Prettier; `npm run lint` checks violations. VS Code uses ESLint fixes on explicit save followed by the existing Prettier formatter; keep Organize Imports disabled to avoid competing sort orders.
- Sort groups in this order, with one blank line between groups: Next.js → external packages (including React and Node builtins), followed by shared hooks/context → Panda (`styled-system/*`) → common atoms → molecules → organisms → layouts → other internal modules → relative imports. Compatibility aliases belong to the same group as their canonical paths.
- Group 2 is **external packages, shared hooks and context**: external dependencies come first, followed immediately by `@/context/*`, `@/hooks/*`, and `@/lib/use[A-Z]*`, with no blank line inside this group. Internal hooks/context remain project modules; ordinary data, types and utilities belong to the later internal group.
- Sort module paths and named import bindings alphabetically. Type-only imports stay in their module's group; preserve `import type` and inline `type` forms. Do not reorder exports as part of import cleanup.
- Preserve `'use client'`/`'use server'` and comments. Side-effect imports (including CSS/SCSS) and non-import statements are fixed boundaries: sort only within each contiguous run of bound imports, never across those boundaries. The local wrapper around the pinned Perfectionist rule enforces this because `sortSideEffects: false` alone does not prevent bound imports from crossing a fixed side-effect import.
- Apply the rule to authored `src` TS/TSX, including declaration files. Exclude generated `styled-system`, build output and dependencies.

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

### 공지사항 빈 안내 모바일 높이 예외

- 사용자 확정 (2026-11-18): `EmptyState variant="plain" layout="notices"`의 모바일 높이는 **200px**이며 상·하단 `1px solid #E9EAEB`를 유지한다. 공통 테이블형 모바일120px보다 이 화면별 최신 규칙을 우선한다. PC 최소220px과 문구 최대320px은 유지한다.
