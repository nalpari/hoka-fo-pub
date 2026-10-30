# 컴포넌트 품질: 마크업·Panda·Typography·Base UI

이 문서는 hoka-markup-handoff의 구조·스타일 지침이다. [적용 원칙](../SKILL.md#적용-원칙)에 따라 서비스·시연 흐름 제거가 기본이며, 아래 보존 규칙은 HTML·표시·접근성·반응형·최소 로컬 UI와 비대상 사용처에 한한다. 원본 component-reusability의 스타일·구조 기준을 통합했으며 원본 스킬을 추가로 로드하지 않는다. 저장소 규칙과 설치된 API를 재확인하고 관련된 절만 적용한다.

탐색: HTML/JSX 선택 → Panda 변환 → 형제 간격 → layout primitive → Typography → 구조 조사 → JSX 소유권 → 스타일 병합 → 작은 구조 조합 → 로컬/import 규칙.

## HTML and JSX selection

For heading groups and their related content, also apply [the content-header workflow](content-sections.md). Ordinary single-title headings use `ContentHeader` too. Prefer `ContentSection`'s `title`/`headerProps` default header when assembling a titled region; reserve its `header` node for structures the default header cannot express.

For actions that finish a titled region, use the optional `ContentSection.footer` slot when form ownership and spacing remain intact. The same workflow covers footer candidates, layout adapters, and existing modal/card/fixed-action exclusions; inspect the button's actual role rather than treating every visually low button as a footer.

Apply this decision order in both audits and migrations:

1. Text-bearing `span`, `p`, and `h1`–`h6` follow the Typography section below, even without explicit CSS. Preserve the original tag through `as`.
2. For layout and structural elements, inspect inline styles, named classes, recipes, conditional composition, and ancestor selectors before deciding whether there are styles to migrate. Browser defaults or inherited styles alone do not require a Panda component.
3. Keep unstyled structural HTML such as `<div>` and `<section>` as native HTML. IDs, ARIA, refs, events, or semantics alone are not reasons to replace it with `Box` or another primitive. Do not convert tags merely for consistency.
4. When there are actual styles to migrate, choose a named Panda primitive by its layout or presentation responsibility using the table below. Shared or relational styles may remain on the ancestor; apply the single-descendant ownership rule under JSX style props before retaining a simple child selector. Do not duplicate or relocate styles solely to justify conversion. Preserve native HTML when attribute/ref or server-boundary constraints prevent an equivalent conversion.

An icon, decoration, or layout-only `span` follows the structural rules rather than the text mapping. Keep native `li`, `dt`, and `dd` outside HTML-tag conversion. Do not automatically convert existing Panda components back to native HTML; that requires an explicit cleanup scope.

## HTML → Panda JSX migration

Use this mode when the user asks to convert HTML tags or existing Panda classes to JSX components. Keep the work focused on migration; do not expand it into Base UI adoption, new typography variants, or feature decomposition unless requested or necessary to preserve retained markup and local UI behavior.

- Survey native JSX tags and their `css`, `cva`, inline styles, shared class references, and existing Panda primitives before editing. Include layout containers, inline text, landmarks, lists, and table/form structures in the survey, rather than searching only for `div`. Use syntax-aware edits for nested JSX; regex searches alone are not a reliable codemod.
- Apply the HTML and JSX selection criteria above before converting any tag. For eligible styled containers, use named components from `styled-system/jsx`. **Do not use `styled`, `styled.*`, or `styled(...)`**, including aliases or replacement factories.
- Preserve the actual HTML element with `as`. Keep DOM order and nesting, native attributes, IDs, ARIA, refs, retained local UI event types and handlers, form ownership and submit prevention, focus, keyboard behavior, and list/table semantics. Check the installed primitive's types: `as` may change the rendered tag without changing its accepted native props. Keep native HTML with Panda `css` when conversion cannot preserve its attribute/ref contract; do not cast away type errors, add wrappers, or create another factory solely to force migration.
- Move complete, straightforward single-use style declarations to JSX props and remove unused declarations/imports. Preserve exact values, selectors, responsive conditions, pseudo-states, specificity, and unrelated classes. Keep shared classes and `cva`/`sva` variants when they express a shared or conditional contract. Use a `css` prop for selector-heavy local objects when clearer than individual props. Preserve dynamic runtime styles where extraction cannot express the existing behavior.
- Inspect styles inside class arrays and conditional class composition too. A single-use base declaration such as `css({ p: '0', fontWeight: 'bold' })` should become `p="0" fontWeight="bold"` on `Box`, even when its class was combined with a conditional visually-hidden class. Preserve the independent condition and unrelated caller classes; class composition alone is not a reason to retain simple base styles.
- Inspect `cva.base` as well: move fixed local layout properties such as `alignItems`, `justifyContent`, and `gap` onto the Panda primitive when variants do not override those properties. Keep variant-dependent styles in the recipe and preserve any shared-consumer contract; the presence of `cva` alone does not justify retaining fixed layout styles in its base.
- On Panda primitives, put ordinary style properties directly on JSX instead of hiding them inside a `css` object. For example, use `<Flex flexShrink="0" transition="transform 0.15s ease" css={{ '[data-open] &': { transform: 'rotate(180deg)' } }}>`. Keep selector keys and custom CSS properties in `css`; move compatible named style/condition properties to props without duplicating or overriding existing declarations.
- Prefer Panda's concise JSX aliases when equivalent: use `pos="relative"` rather than `position={'relative'}`. Use quoted JSX attributes for static string values, and expression braces for dynamic values or objects. Preserve values and conditions when normalizing syntax; this rule does not rename native DOM attributes or arbitrary custom-component props.
- Inspect the installed pattern defaults before selecting a primitive. In particular, `Grid` or `Stack` can introduce a gap or alignment absent from the original element. Use `Box` with explicit layout props when that avoids extra defaults. Do not rely on JSX prop order to override a class.
- When width and height are the same expression, consider `Square size="…"` instead of separate `w`/`h` props, especially for icon wrappers. Verify its default flex sizing and centered alignment against the original styles; preserve different alignment explicitly and keep another primitive when Square would change display or sizing behavior. Remove redundant width/height/display declarations after conversion.
- Remove declarations already supplied by the selected primitive: `Flex` needs neither `display="flex"`, `display={'flex'}`, nor `css={{ display: 'flex' }}`. Apply the same rule to `Grid` and stack primitives. After selecting a primitive or moving styles from a class/recipe, rescan JSX props, css props, and its migrated base styles for these duplicates; changing the tag alone is incomplete. Keep conditional or responsive display overrides that actually change behavior.
- Select layout primitives from resolved styles, including named `css` declarations and `cva` base styles, rather than only inline objects. A flex layout maps to `Flex`; an `inline-flex` layout maps to `Flex display="inline-flex"`. Remove the migrated display from its previous declaration when all consumers permit it, while preserving shared contracts and conditional variants.
- Use `Stack gap="…"` for a vertical flex layout such as `display: 'flex', flexDirection: 'column', gap: '7px'`. Remove redundant display/direction declarations and keep the original gap explicit. Check responsive direction changes and stack defaults; do not replace a zero/absent gap with the pattern's default spacing, or use `VStack` when its centering would change alignment.
- Preserve server/client boundaries. Inspect generated JSX runtime requirements before importing it into a Server Component; keep native markup where conversion would require an unnecessary client boundary.
- Rescan the complete authorized scope after migration. Account for intentionally retained native elements under the selection criteria, including unstyled structural HTML, document roots, SVG, native controls, third-party integration markup, and Storybook fixtures; do not treat their presence as an incomplete migration. Compare meaningful DOM/attribute and style invariants, run Panda generation, type checking, linting, and the appropriate builds. Use existing PC/mobile stories or routes for visual checks, and distinguish completed checks from untested behavior. Follow the repository's OKF mapping for changed sources.

Report the migrated scope, actual conversion counts when available, retained native elements with reasons, and verification results. For a narrow migration, omit unrelated reuse recommendations.

### Repeated sibling spacing

Treat repeated sibling margins as a layout ownership finding in reuse audits and Panda migrations. Within the authorized scope, prefer the parent owning a common vertical interval over each later child declaring the same `mt` or `marginTop`.

- Inspect rendered sibling order, not just repeated text in a file. Include JSX props, responsive objects, inline/named `css` styles, shared classes, and component-owned margins. Separate branches that cannot render together; equal values in different parents are not evidence of one common gap.
- Prefer reusing the existing parent as `Stack` with an explicit `gap`, preserving its HTML element through `as`. Remove the replaced child margins and redundant flex display/direction declarations together. Preserve a meaningful grid layout with its own row gap rather than switching it to flex merely to use `Stack`.
- For mixed intervals, group only the uniform portion. Keep the group's leading space and other boundaries unchanged; do not add negative margins to compensate for an overly broad gap. For example, repeated 16px field margins can become a field group with `gap="4"` and an initial `mt="4"`, while its error notice and submit action retain their distinct intervals.
- A new group wrapper is justified when it owns this spacing contract and an existing parent cannot express it. Check direct-child selectors, flex/grid participation, width/stretch, min-height, form ownership, accessibility connections, and component boundaries before adding it. Preserve the existing structure when wrapping would change those contracts; do not add wrappers solely to rename components.
- Keep conditional content conditional. Check description/action omissions, local/social field branches, fragments, and responsive hidden nodes so a group does not leave an empty wrapper or an unintended gap. Do not remove margins that serve negative positioning, sticky/overlap behavior, independent component placement, or a genuinely different responsive interval.
- Compare effective spacing before and after the change, including adjacent `mb`/`my`, margin collapse, parent padding and existing gaps. Preserve exact PC/mobile values; `gap="8"` is appropriate for an existing 32px interval, not a universal default. Reusing one parent gap must not add spacing between siblings that previously had none.
- For implementation changes, verify affected PC/mobile geometry and relevant conditional states using existing stories/routes or temporary fixtures. Include form interaction checks when regrouping fields. Remove temporary fixtures after verification and report the checks actually run; do not prescribe a fixed number of scenarios. A policy/skill-only update does not authorize source migration or require application builds.

```tsx
// Before: each later sibling owns the same 32px interval.
<Flex as="main" direction="column" alignItems="center">
  <Icon />
  <Box mt="8">{message}</Box>
  <Box mt="8">{action}</Box>
</Flex>

// After: preserve the main element, alignment, and 32px intervals.
<Stack as="main" gap="8" alignItems="center">
  <Icon />
  <Box>{message}</Box>
  <Box>{action}</Box>
</Stack>
```

### Layout primitive selection

Use this table only after the HTML and JSX selection criteria identify styles to migrate. It governs structural wrappers, not text-bearing span/p/headings. Preserve `as` and DOM structure, and resolve conditional and responsive styles before selecting a component.

| Existing responsibility/styles                                                       | Target            | Required preservation                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Grid layout (`display: grid`)                                                        | `Grid`            | Move columns/rows, alignment and gaps to props; remove the redundant display. Preserve a missing gap with `gap="normal"` when the installed default would introduce spacing.                                                                              |
| Flexible layout, wrapping, responsive direction, or `inline-flex`                    | `Flex`            | Remove `display: flex`; retain `display="inline-flex"` when required. Keep direction, wrapping and alignment explicit when they differ from the default.                                                                                                  |
| Vertical flow (`display: flex; flex-direction: column`)                              | `Stack`           | Move the original gap to `gap`; remove redundant display/direction. Preserve absent spacing explicitly if the default adds a gap, and retain responsive direction changes.                                                                                |
| Vertical flow with cross-axis centering                                              | `VStack`          | Choose only when the existing layout centers its children horizontally. Its default `alignItems: center` must not replace stretch/start/end alignment. Preserve the gap and main-axis alignment.                                                          |
| Horizontal flow with cross-axis centering                                            | `HStack`          | Choose when row direction and vertical centering match the existing layout. Preserve gap, wrapping, and main-axis alignment. Use `Flex` for another cross-axis alignment.                                                                                 |
| Equal width/height, square geometry                                                  | `Square size="…"` | Use the same expression for size; remove duplicate w/h. Preserve its display, centered alignment and `flex: 0 0 auto` contract or override differing original values explicitly. Equal dimensions alone do not authorize changed layout behavior.         |
| Equal width/height and an already circular shape                                     | `Circle size="…"` | Require both square dimensions and the existing circular rounding. Remove redundant size/rounding declarations only when equivalent; preserve alignment and flex sizing as for Square. Do not turn an ordinary square or rounded rectangle into a circle. |
| Generic container with styles to migrate and no matching layout/shape responsibility | `Box`             | Move existing presentation styles and preserve semantic `as`; do not introduce styles solely to justify a primitive.                                                                                                                                      |

Use the more specific matching responsibility: a circular shape uses Circle, a square shape uses Square, a centered vertical/horizontal flow uses VStack/HStack, a general vertical flow uses Stack, and other flexible flows use Flex. Preserve behavior when conditions change the match; use explicit responsive props rather than dropping a branch. Installed pattern defaults are the source of truth (currently Stack/HStack/VStack/Grid may add an 8px gap, HStack/VStack center the cross axis, and Square/Circle add centered flex sizing). Check property conflicts with retained recipes and caller classes before adding defaults or moving declarations. Apply the native HTML retention criteria above throughout selection.

After conversion, check both the chosen component and its props: no duplicate default display/direction, no remaining w/h equal to an adopted size, no lost gap or changed centering, and no ordinary `Box display="grid"`/`Box display="flex"` left without a concrete compatibility reason.

### Text elements and unstyled Typography

- During HTML/Panda JSX migration, convert text-bearing `span` to `<Typography as="span">` and `p` to `<Typography as="p">` when no explicit typography styling needs a named scale. Apply the same rule to every heading level, `h1` through `h6`, preserving the original tag through `as` (for example, `<Typography as="h1">` and `<Typography as="h6">`). This is the text exception to retaining unstyled structural HTML; do not substitute `Box` for text. Do not change a paragraph into a span or change a heading's level.
- Keep an already selected Typography variant. Use another named semantic variant when migrating an explicit type scale or implementing a requested typography change; do not infer a new scale from a native heading or paragraph merely because a similar variant exists. Unstyled preserves the current native/global/ancestor presentation.
- Typography defaults to `unstyled`, so a text caller can omit `variant` when it needs no type scale; explicit `variant="unstyled"` is equivalent. When `web` and `mo` select the same variant, consolidate them into a single `variant` prop: `<Typography web="body4" mo="body4">` becomes `<Typography variant="body4">`. Use `web`/`mo` only for platform differences, and remove an override identical to the fallback `variant`. Preserve platform-specific differences, dynamic expressions, and props supplied through spreads; do not assume they are identical without evidence. When changing the default from `body`, identify existing callers relying on that fallback and add `variant="body"` (including the fallback of partial `web`/`mo` overrides) to preserve their appearance.
- `unstyled` adds no font family, size, weight, line height, or letter spacing. An explicit `tone` applies only its color; omitting `tone` adds no color declaration. Preserve browser defaults, global rules, ancestor selectors, and caller-provided `className`/`style`; do not add resets or `font: inherit`. A heading must retain its existing appearance as well as its heading semantics.
- Determine unstyled eligibility from typography properties, not from the absence of all CSS. Non-typographic styles such as `m: '0'`, padding, width, display, or responsive spacing must survive the migration. With the current Typography API, preserve these through Panda `css` in `className`, for example `<Typography as="h2" className={css({ m: '0' })}>…</Typography>` with the implemented variant. Do not pass `m="0"` directly unless Typography actually processes Panda style props, and do not drop spacing because the variant is called unstyled. Preserve unrelated classes, conditional styles, and native attributes too.
- `inherit` means explicitly inheriting typography from the parent, which can change a heading's native size or weight. Do not use `variant="inherit"` as a substitute for preserving untouched HTML presentation. The API name is `variant="unstyled"`.
- Check implementation support before migrating callers. After resolving `web`/`mo`, `unstyled` bypasses the type-scale recipe and ignores `weight`; an explicit `tone` uses the separate color-only recipe. `srOnly` applies independently for every variant; prefer this prop over duplicated visually-hidden CSS. The ordinary recipe still has a base font family and default `body`/`inherit` variants, so an empty variant alone would not preserve unstyled rendering. Keep semantic/inherited-style Storybook coverage aligned with this contract; no new type-scale tokens are needed.
- A skill-only request updates this guidance without changing the component API or callers.

### 명시적 타이포 스케일과 공용 계층

직접 fontSize/fontWeight/lineHeight/letterSpacing을 조사하고 현재 Typography variant가 PC/MO의 전체 스케일을 보존하는지 확인한다. 일치하면 기존 variant·semantic as·tone을 사용한다. 실제 필요한 스케일이 없고 해당 이관이 요청 범위라면 semantic 이름과 PC/MO token 계약을 정의해 Typography recipe·public variant type·backing token을 함께 추가하고 호출부와 public story를 이관한다. 첫 소비자가 하나라는 이유로 필요한 공통 스케일을 지역에 중복하지 않는다. 반대로 unstyled 텍스트나 단순 인계만을 이유로 새 스케일·variant를 만들지 않는다.

- Atom은 semantic primitive 또는 한 조작, molecule은 안정된 atom 조합과 typed data/slot, organism은 실제 재사용되는 도메인 조합을 맡는다. route-specific 구성은 src/app, 실제 재사용 도메인 UI는 src/components에 둔다. layout은 폭·landmark·sticky·spacing 등 실제 구조 계약을 가져야 한다.
- CSS Module 이관이 요청 범위이면 기존 breakpoint/값/selector/동작을 모두 Panda로 표현하고 참조를 갱신한 뒤 해당 module.scss를 제거한다. 관계없는 module을 일괄 삭제하지 않는다. TSX 외 styles.ts로 지역 선언만 옮기는 우회를 만들지 않는다.
- 모든 추출은 실제 호출부·남기는 native/local UI 계약과 함께 검증한다. UI mock 데이터나 업무 route를 generic atom에 넣지 않으며 파일 수 감소 자체를 성공 기준으로 삼지 않는다.

## 구조·재사용 조사

1. 실제 중복 마크업·스타일·로컬 조작·직접 타이포 선언·수동 접근성 처리를 조사한다. 태그 수나 파일 길이만으로 추출하지 않는다.
2. 설치된 `@base-ui/react` 버전과 package exports를 확인하고 공식 전체 catalogue의 미사용 primitive까지 관찰한 UI 조작에 대조한다. 수동 키보드·focus trap/복원·outside click·roving focus·toast queue·복합 입력이 후보 근거다. native HTML과 기존 공용 wrapper가 충분하면 교체하지 않는다. 미지원 primitive는 필요한 업그레이드/호환성 점검을 보고하고 승인 없이 의존성을 바꾸지 않는다.
3. 아래 HTML/Panda/타이포·간격·스타일 병합 규칙과 별도 소유권·래퍼·폼 지침을 적용한다. 바뀌는 책임에 필요한 지침만 읽는다.
4. API와 소비자를 비교해 가장 가까운 기존 소유자를 선택한다. 공통 optional 표현은 typed 옵션으로, 독립된 재사용 계약만 공용 컴포넌트로 만든다. feature mock·업무 라우트를 generic atom에 넣지 않는다.
5. 실제 여러 production 호출부가 공유하는 계약만 승격한다. common library 승격은 최소 두 feature의 같은 의미/조작 계약과 안정된 typed API·Storybook 근거를 확인한다. 단일 부모 부품은 모듈 안에, page 보조 UI는 `_components`에 둔다. 의미 있는 지역 구조는 module-level 함수로 표현할 수 있지만 별도 파일을 강제하지 않는다.
6. 삭제할 서비스/시연 의존성은 인계 경계에서 제거한다. 재사용 추출을 위해 검증·타이머·저장·요청·성공 이동을 새 소유자에 옮겨 보존하지 않는다. 비대상 사용처의 계약과 남기는 로컬 UI의 state 수명은 유지한다.
7. 추출 구현 시 실제 기존 호출부를 함께 이관한다. library-only 요청은 예외다. 새 public atom/molecule/organism과 Typography variant는 실제 의미 있는 기본·표현·UI 조작 story를 제공하고 private 부품은 기존 route/feature story에서 검증한다.
8. 관찰 패턴·실제 소비자·제안 owner/API·유지할 DOM/접근성/반응형·실제 제거 파일 수를 보고한다. 단순 조사나 스킬 수정은 애플리케이션 변경 권한이 아니다.

## JSX style props

- **Single-descendant ownership:** A descendant selector is not CSS inheritance. When a component's simple selector targets elements produced by one known local JSX owner, move their independent styles onto that owner. This includes a single JSX node repeated by `map`: judge ownership by the authored node and style contract, not by the number of rendered DOM elements. Do not limit this check to one selector segment or one DOM level: trace the complete local JSX path for selectors such as `& header div`, `& section div`, or `& > header > div`. When each path resolves to one authored owner, apply the same direct-style rule to that terminal owner, including mapped nodes and independently owned state/pseudo-element styles. A descendant combinator is not a direct-child combinator; inspect every matching branch and custom-component output rather than assuming that only the visually obvious child matches. Inspect conditional/responsive branches, component boundaries, externally supplied children, and competing styles first. For example, move parent `& ol` counterReset onto `<Box as="ol" counterReset="item">`; move `& li` styles and an independently owned `& li::before` onto the mapped native `<li className={css({ ...styles, _before: { ...beforeStyles } })}>`. Keep the native `li`/`dt`/`dd` exclusions. Remove moved selectors and use supported JSX style props or native HTML with Panda `css` as appropriate. Preserve values, breakpoints, counter scope/order, and the effective cascade; retain the selector with a concrete reason if moving it changes behavior. Keep genuinely shared rules spanning different owners or externally supplied descendants, and rules depending on parent/sibling state or positional relationships, on the appropriate relational owner. A pseudo-element or repetition alone is not a reason to retain parent-owned CSS. Actual inherited parent properties are not automatically moved, and this rule does not authorize rewriting unstyled structural HTML elsewhere.
- Prefer direct Panda style props on existing `styled-system/jsx` primitives when a single-use declaration expresses straightforward layout or presentation. Keep properties such as `justifyContent`, `minH`, `flexShrink`, `px`, and `borderBottom` next to the markup they affect. These props generate Panda classes; they are not native React `style` objects.
- Move the complete applicable declaration and remove its unused `styles` entry. Do not leave the same property in both `className` and style props, or assume the JSX prop's textual position determines CSS precedence. Preserve unrelated classes and remove imports only when unused.
- Preserve values and responsive conditions while preferring equivalent existing Panda tokens over pixel literals. This project uses `1rem = 16px`, so prefer `px="4"` (`1rem`) over `px="16px"`. Check the actual token mapping for other values; retain a literal when no equivalent token exists rather than rounding to a nearby token.
- Keep a named `css` declaration or recipe when it shares a style contract, makes substantial selectors/conditions easier to understand, or expresses variants or multiple slots more clearly. Panda style props can also express conditions; a pseudo-state or responsive value alone is not a reason to extract a class. Do not move arbitrary style props onto native HTML, Next.js components, or custom components without checking that their API supports and processes them.

For example, a single-use header class on `HStack` containing only these five properties can become:

```tsx
<HStack
  gap="0"
  justifyContent="space-between"
  minH="58px"
  flexShrink={0}
  px="4"
  borderBottom="1px solid var(--color-black-10)"
>
  {children}
</HStack>
```

For each finding, state which declaration can move to JSX props, which named styles should remain and why, and whether any proposed token conversion changes the original value contract.

## Panda style composition

- Do not concatenate independently generated Panda classes to override the same property under the same condition. Arrays with `.join(' ')`, template strings, and class-name concatenation helpers do not resolve conflicting atomic classes. CSS cascade order decides the winner; Panda's generated stylesheet order can change with the consuming project's style inventory. Matching source paths or placing a class last does not establish precedence.
- For internal base/variant/slot overrides, merge style objects before generating classes. Keep reusable declarations as `css.raw({ ... })`, resolve a `cva` recipe with `recipe.raw(variants)`, and pass them with conditional override objects to one `css(...)` call per DOM element. Later objects resolve overlapping properties before class generation. The result still contains multiple atomic classes; the goal is one resolved value per property and condition, not one total class.

```tsx
const content = css.raw({
  display: 'inline-flex',
  justifyContent: 'center',
});

// Merge before generating classes, so headerSearch has no competing jc_center.
<span
  className={css(content, variant === 'headerSearch' && { justifyContent: 'space-between' })}
/>;

// Merge recipe and icon-only overrides at the same stage.
const rootClassName = css(button.raw({ density, fullWidth }), iconOnly && iconOnlyButtonStyle);
```

- Check all affected slots and properties, including custom CSS variables, line height, dimensions, padding, and nested selectors. Preserve responsive conditions, pseudo-states, selector specificity, defaults, and override order. Different values under different conditions are intentional and must not be removed merely as duplicates. Account for shorthand/longhand interactions instead of assuming that object merging resolves every possible CSS cascade conflict.
- Preserve the public `className` contract and unrelated classes. Appending a caller class remains valid for composition, but does not guarantee that its conflicting declarations win; a generated class string is not a style object and must not be passed to `css()` as one. Prefer existing typed variants or a supported style-object API for caller overrides. When those cannot express a required override, use a deliberate, narrowly scoped Panda `!` value or existing specificity mechanism after checking states and responsive behavior. Do not add blanket `!important`, new public APIs, or migrate unrelated callers as part of a local fix.
- For implementation changes, regenerate Panda CSS and inspect rendered classes for affected combinations, then check computed styles in existing web/mobile stories or routes where available. Verify intended overrides and unchanged ordinary variants, states, and dimensions; distinguish markup checks from browser and consuming-project integration checks. A skill-only request changes this guidance without triggering a repository-wide audit or component migration.

## Low-level composition

Here, **low-level composition** is a descriptive working term for assembling a UI region from small components with explicit structural, styling, or interaction responsibilities. It is not an additional Atomic Design tier and does not require a compound-component API or shared context.

- Inspect each region for useful boundaries: an outer frame, width-constrained content, navigation, an action group, or a search control. A possible header composition is `HeaderWrapper` containing `HeaderContent`, which composes `HeaderNav`, `HeaderAction`, and `HeaderSearch`. Follow the observed DOM hierarchy; these names are examples, not a required component list.
- A small structural component is useful when it owns a meaningful contract, such as a landmark, sticky positioning, content width, responsive arrangement, or action spacing. A single DOM element or single consumer does not disqualify it. Keep the DOM and its Panda styles together; avoid empty wrappers that only rename a tag and own no such contract.
- Keep structural parts presentational. Pass prepared content through `children`, named slots, or typed props, and pass retained local UI interactions through explicit callbacks. Remove scoped service requests, business calculations and completion redirects at the handoff owner; do not reintroduce them through structural composition. Keep ordinary navigation and local UI ownership explicit. Do not add context, polymorphism, or configurable variants solely to support decomposition.
- Keep single-parent parts in their owning module. Put separately reusable parts inside the owning feature or organism folder unless their reuse contract is demonstrated across features. Nesting within an organism does not make every part a public atom or molecule. Export only the parts needed by actual callers; introduce a compound-component API only when callers need to assemble the parts themselves.
- Preserve DOM order and nesting, landmarks, accessible names, focus and keyboard behavior, refs, event propagation, sticky/overflow behavior, and all responsive values during extraction. Do not add DOM wrappers merely to establish component boundaries.
- Judge the result by whether each part has a clear responsibility and the parent makes the region's composition easier to read and change. Keep markup inline when extraction adds indirection or prop forwarding without establishing an independent contract. Do not use file size or component count as success criteria.

For each composition finding, name the current responsibility, proposed part and owner folder, its props or slots, and the behavior to preserve. Keep meaningful local component functions when their structural contract is clear; classify their separate files using the single-parent workflow. Validate changed composition through the existing region or route story, including responsive branches; private structural parts do not each need a public story.

## Local conventions

- Read the repository's `AGENTS.md` and applicable framework guidance before changing code.
- Use the project's styling system and semantic token variables rather than introducing another styling layer.
- Do not create, modify, or retain `*.module.scss` files. Do not create replacement `styles.ts` files that merely centralize page-local class names.
- Author component styles in the component's own `.tsx` file with Panda CSS: prefer JSX style props for straightforward single-use styles on Panda primitives, `css` for styles that benefit from a named declaration or targets without style props, `cva` for typed visual variants, and `sva` for multi-slot component styles. Keep declarations near the markup they style; extract a shared component only when its semantic markup or interaction contract is genuinely reusable.
- Follow the HTML and JSX selection criteria, layout table, and Typography contract above; tag consistency alone is not a reason to migrate structural HTML.
- Use `src/app` for route-specific screens and `src/components` for reusable domain UI and policy. Promote to `src/components/common` only after the reuse contract is proven across feature boundaries.
- Avoid generic global class names for shared components; scoped generated styles or namespaced classes prevent collisions.
- Respect a dirty worktree: preserve changes that are not part of the requested extraction.

## Import organization

After adding or moving imports, follow the ESLint order: Next.js → external packages (React and Node builtins included), followed immediately by shared application hooks/context → Panda → common atoms → molecules → organisms → layouts → other internal modules → relative imports. Group 2 is external packages, shared hooks and context: put external dependencies first, then `@/context/*`, `@/hooks/*`, and `@/lib/use[A-Z]*` with no blank line between external dependencies and these internal modules; keep a blank line before Panda/UI. These are project modules, not external dependencies; ordinary data, types and utilities stay in the later internal group. Use one blank line between numbered groups, alphabetic module paths and named bindings, and classify compatibility aliases with their canonical layer. Keep type-only imports in the same path group without converting their syntax. Use `npm run lint:fix` for ESLint ordering and Prettier formatting; do not introduce a competing Prettier import sorter or Organize Imports action. Preserve directives, comments, export order, and each side-effect/non-import boundary; imports must not cross CSS/SCSS initialization. Apply changes only to authored sources, including stories and declaration files, and verify a second fix makes no further changes.

## Completion report

State which service/demo dependencies were removed, which components/callers were consolidated, what typed display options remain, and which verification commands passed. Do not infer permission for service implementation. Mention only actionable remaining candidates for future extraction.

For an audit-only request, group findings as `immediate improvement`, `extraction candidate`, or `keep`. For every Base UI finding, report the official primitive name, whether the installed version supports it, whether a dependency upgrade is required, and the observed interaction evidence. For Panda and Typography findings, report the recommended primitive/variant, semantic `as` value when relevant, and the responsive behavior that must be retained.
