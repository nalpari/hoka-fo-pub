---
name: component-reusability
description: Audit and improve React component reuse, low-level composition, Base UI adoption, Panda CSS/JSX composition, and Typography variants. Also use to survey HTML tags and Panda CSS usage, then migrate to Panda JSX components while preserving HTML semantics and existing styles.
---

# Component Reusability

Improve reuse without turning every visual difference into a new abstraction. Preserve feature-specific data, routing, and business behavior; move only reusable semantic markup, presentation states, or interaction contracts into shared components.

This is an evidence-based audit and implementation workflow. For a reuse audit, recommend layout primitives where they clarify structure. For an explicit Panda JSX migration, survey the existing HTML and styles first, then implement the requested conversion without changing rendered semantics or presentation. Do not introduce Base UI for static markup. When a needed type scale lacks a Typography variant, define its semantic role, desktop/mobile values, and token contract before adding it. Every recommendation must name the observed pattern, the suggested API, why it improves the implementation, and the semantic, responsive, and migration constraints that must be preserved.

## Scope selection

Use the user's named files, folders, or explicit repository-wide scope. An explicit “전수조사” in the current repository authorizes a full source survey; distinguish production UI from stories, generated files, and external packages. If no scope is supplied or established in the conversation, ask “어느 폴더를 점검할까요?” and wait before inspecting files. Do not ask again when the scope is already clear.

## HTML → Panda JSX migration

Use this mode when the user asks to convert HTML tags or existing Panda classes to JSX components. Keep the work focused on migration; do not expand it into Base UI adoption, new typography variants, or feature decomposition unless requested or necessary to preserve behavior.

- Survey native JSX tags and their `css`, `cva`, inline styles, shared class references, and existing Panda primitives before editing. Include layout containers, inline text, landmarks, lists, and table/form structures in the survey, rather than searching only for `div`. **Exclude native `li`, `dt`, and `dd` from HTML-tag conversion**; keep their tags and Panda `css` styling. Do not rewrite existing Panda components merely because they already render these tags. Use syntax-aware edits for nested JSX; regex searches alone are not a reliable codemod.
- Choose the component by its responsibility: text elements follow the Typography rules below; layout containers use named components from `styled-system/jsx`, such as `Box`, `Flex`, `Grid`, and `Stack`. **Do not use `styled`, `styled.*`, or `styled(...)`**, including aliases or replacement factories. Use `Box` for generic containers and `as` to preserve their semantics. The text-element rules take precedence over the layout-component selection rules; do not default text to `Box as="span"` or `Box as="p"`.
- Preserve the actual HTML element with `as`. Keep DOM order and nesting, native attributes, IDs, ARIA, refs, event types and handlers, form submission, focus, keyboard behavior, and list/table semantics. Check the installed primitive's types: `as` may change the rendered tag without changing its accepted native props. Keep native HTML with Panda `css` when conversion cannot preserve its attribute/ref contract; do not cast away type errors, add wrappers, or create another factory solely to force migration.
- Move complete, straightforward single-use style declarations to JSX props and remove unused declarations/imports. Preserve exact values, selectors, responsive conditions, pseudo-states, specificity, and unrelated classes. Keep shared classes and `cva`/`sva` variants when they express a shared or conditional contract. Use a `css` prop for selector-heavy local objects when clearer than individual props. Preserve dynamic runtime styles where extraction cannot express the existing behavior.
- Inspect styles inside class arrays and conditional class composition too. A single-use base declaration such as `css({ p: '0', fontWeight: 'bold' })` should become `p="0" fontWeight="bold"` on `Box`, even when its class was combined with a conditional visually-hidden class. Preserve the independent condition and unrelated caller classes; class composition alone is not a reason to retain simple base styles.
- Inspect `cva.base` as well: move fixed local layout properties such as `alignItems`, `justifyContent`, and `gap` onto the Panda primitive when variants do not override those properties. Keep variant-dependent styles in the recipe and preserve any shared-consumer contract; the presence of `cva` alone does not justify retaining fixed layout styles in its base.
- On Panda primitives, put ordinary style properties directly on JSX instead of hiding them inside a `css` object. For example, use `<Flex flexShrink="0" transition="transform 0.15s ease" css={{ '[data-open] &': { transform: 'rotate(180deg)' } }}>`. Keep selector keys and custom CSS properties in `css`; move compatible named style/condition properties to props without duplicating or overriding existing declarations.
- Inspect the installed pattern defaults before selecting a primitive. In particular, `Grid` or `Stack` can introduce a gap or alignment absent from the original element. Use `Box` with explicit layout props when that avoids extra defaults. Do not rely on JSX prop order to override a class.
- Remove declarations already supplied by the selected primitive: `Flex` needs neither `display="flex"` nor `css={{ display: 'flex' }}`. Apply the same rule to `Grid` and stack primitives. Keep conditional or responsive display overrides that actually change behavior.
- Select layout primitives from resolved styles, including named `css` declarations and `cva` base styles, rather than only inline objects. A flex layout maps to `Flex`; an `inline-flex` layout maps to `Flex display="inline-flex"`. Remove the migrated display from its previous declaration when all consumers permit it, while preserving shared contracts and conditional variants.
- Use `Stack gap="…"` for a vertical flex layout such as `display: 'flex', flexDirection: 'column', gap: '7px'`. Remove redundant display/direction declarations and keep the original gap explicit. Check responsive direction changes and stack defaults; do not replace a zero/absent gap with the pattern's default spacing, or use `VStack` when its centering would change alignment.
- Preserve server/client boundaries. Inspect generated JSX runtime requirements before importing it into a Server Component; keep native markup where conversion would require an unnecessary client boundary.
- Rescan the complete authorized scope after migration. Account for remaining native elements, including document roots, SVG, native controls, third-party integration markup, and Storybook fixtures; do not claim these were converted. Compare meaningful DOM/attribute and style invariants, run Panda generation, type checking, linting, and the appropriate builds. Use existing PC/mobile stories or routes for visual checks, and distinguish completed checks from untested behavior. Follow the repository's OKF mapping for changed sources.

Report the migrated scope, actual conversion counts when available, retained native elements with reasons, and verification results. For a narrow migration, omit unrelated reuse recommendations.

### Text elements and unstyled Typography

- During HTML/Panda JSX migration, convert text-bearing `span` to `<Typography as="span" variant="unstyled">` and `p` to `<Typography as="p" variant="unstyled">` when no explicit typography styling needs a named scale. Apply the same rule to every heading level, `h1` through `h6`, preserving the original tag through `as` (for example, `<Typography as="h1" variant="unstyled">` and `<Typography as="h6" variant="unstyled">`). This is the required text mapping, not an optional alternative to `Box`. Do not change a paragraph into a span or change a heading's level.
- Keep an already selected Typography variant. Use another named semantic variant when migrating an explicit type scale or implementing a requested typography change; do not infer a new scale from a native heading or paragraph merely because a similar variant exists. Unstyled preserves the current native/global/ancestor presentation.
- A span used solely as an icon, decoration, or layout wrapper can remain a layout primitive with `as="span"`; text content, margin, or `display` styling alone does not make a text element a layout wrapper. Keep genuine layout containers on Panda primitives and retain the native `li`/`dt`/`dd` exclusions above.
- `unstyled` means that Typography adds no font family, size, weight, line height, letter spacing, or color styles. Preserve browser defaults, global rules, ancestor selectors, and caller-provided `className`/`style`; do not add resets or `font: inherit`. A heading must retain its existing appearance as well as its heading semantics.
- Determine unstyled eligibility from typography properties, not from the absence of all CSS. Non-typographic styles such as `m: '0'`, padding, width, display, or responsive spacing must survive the migration. With the current Typography API, preserve these through Panda `css` in `className`, for example `<Typography as="h2" variant="unstyled" className={css({ m: '0' })}>…</Typography>` with the implemented variant. Do not pass `m="0"` directly unless Typography actually processes Panda style props, and do not drop spacing because the variant is called unstyled. Preserve unrelated classes, conditional styles, and native attributes too.
- `inherit` means explicitly inheriting typography from the parent, which can change a heading's native size or weight. Do not use `variant="inherit"` as a substitute for preserving untouched HTML presentation. The API name is `variant="unstyled"`.
- Check implementation support before migrating callers. Typography supports `variant="unstyled"` by bypassing its recipe entirely after resolving the active `web`/`mo` variant; this also skips recipe `tone` and `weight`. Its ordinary recipe still has a base font family and default `body`/`inherit` variants, so an empty recipe variant alone would not preserve unstyled rendering. Keep the public variant type and semantic/inherited-style Storybook coverage in sync with this contract. This mode adds no type scale and needs no new typography tokens.
- A skill-only request updates this guidance without changing the component API or callers.

## Workflow

1. Inspect the user-specified target folders. Look for repeated HTML structure, duplicated responsive styles, repeated state logic, ad-hoc accessibility attributes, custom interactive behavior, direct typography declarations, and raw layout markup.
2. Audit Base UI against the **full available catalogue**, not only existing imports.
   - Read the installed `@base-ui/react` version and its package exports. Consult the official Base UI catalogue for primitives absent from the installed version when the repository permits external documentation lookup.
   - Match observed behavior to both installed and currently unused primitives, including Accordion, Alert Dialog, Autocomplete, Combobox, Context Menu, Dialog, Drawer, Menu, Menubar, Navigation Menu, Popover, Preview Card, Scroll Area, Select, Separator, Switch, Tabs, Toast, Toolbar, Tooltip, Meter, OTP Field, Number Field, Slider, Checkbox, Radio, Toggle, and form primitives.
   - Treat manually maintained ARIA roles, keyboard navigation, open/close state, focus trap or restoration, outside-click dismissal, roving focus, toast queues, custom scrollbars, and composite input behavior as evidence for a Base UI candidate.
   - Do not recommend Base UI when semantic native HTML already meets the interaction and accessibility contract. Prefer an existing shared wrapper over importing the same primitive directly in a feature.
   - If the official candidate is unavailable in the installed version, report it as `dependency upgrade required`; name the required compatibility, API-change, and migration checks. Do not imply that an upgrade is approved or implement it as part of the audit.
3. Audit Panda styles and layout composition.
   - For components that render DOM, verify that styling uses the repository's Panda APIs: JSX style props for straightforward local styles on Panda primitives, `css` for styles that benefit from a named declaration or targets without style props, `cva` for typed visual variants, and `sva` for multi-slot components. Flag CSS Modules, ad-hoc SCSS, inline style objects, or repeated class composition only when Panda would clearly preserve the behavior.
   - Apply the JSX style prop criteria below before keeping a single-use `styles.*` class on a Panda layout primitive.
   - Before creating layout wrappers, identify where these `styled-system/jsx` primitives communicate the structure more clearly than raw `div` elements: `AspectRatio`, `Bleed`, `Box`, `Center`, `Circle`, `Container`, `Divider`, `Flex`, `Float`, `Grid`, `HStack`, `Spacer`, `Square`, `Stack`, `VStack`, and `Wrap`.
   - Preserve semantics while using layout primitives. First evaluate `as` when it expresses both concerns, such as `<Flex as="section">`, `<Grid as="ul">`, or `<Wrap as="nav">`. Recommend it only when native attributes, accessibility behavior, and browser defaults remain correct.
   - Keep native semantic elements when conversion would obscure list, table, form, landmark, animation, measurement, focus, or third-party integration behavior. For text elements, apply the Typography mapping above rather than the layout-clarity criterion. An audit-only task reports the recommendation without modifying sources; Storybook-only minimal layout wrappers need no consistency migration.
4. Audit typography before leaving type-scale declarations in local styles.
   - For text without an explicit type scale, use the unstyled Typography mapping above and preserve non-font styles. Do not create typography tokens or a new semantic scale for this case.
   - Search for `fontSize`, `fontWeight`, `lineHeight`, and `letterSpacing` in `css` calls, `cva`/`sva` recipes, class names, and inline styles. First check whether the repository's `Typography` component has a variant that preserves the entire required type scale and responsive behavior.
   - When a matching variant exists, recommend `<Typography as="…" variant="…">`; preserve element semantics with `as`, colors with `tone`, and layout/spacing with Panda styles.
   - When no matching reusable scale exists, add a named semantic variant to the shared `Typography` component: update its `cva` definition, public variant type, and the backing desktop/mobile token variables. Migrate the audited caller to it and add a Storybook case covering its semantic `as` usage and mobile scale.
   - A missing type scale must become a shared Typography variant rather than remain duplicated in a caller, including when the first migration has a single caller. Give it a semantic name and token contract so later callers can reuse it.
5. Use feature-local composition (also called vertical slice decomposition) before promoting a component to the shared library.
   - Keep the page container focused on orchestration: URL/search params, local state, data retrieval, filter/sort application, view-model calculation, and event-handler assembly. It should not own feature presentation markup or page-local Panda styles.
   - Put a feature's prepared data and explicit callback contracts into feature-local `Layout` and `Content` components. Let them compose page regions and web/mobile presentations without owning URL synchronization or business-state derivation.
   - Extract independent page regions—such as desktop/mobile-only controls, titles, sort controls, filter wrappers, and result sections—into small components inside the feature folder. Co-locate each region's Panda styles with the component that renders the DOM.
   - Keep non-rendering feature rules, including filtering, sorting, metadata, and policy checks, in pure modules beside the feature. Do not mix them into a layout component.
   - Extract on a responsibility boundary, not a line-count threshold: state lifetime, URL synchronization, display region, platform presentation, or domain policy must be independently changeable or testable. Do not split JSX merely to create smaller files, increase prop drilling, or add meaningless one-line wrappers.
   - Keep a single-feature or product-contextual component feature-local. Consider promotion to atom, molecule, or organism only after at least two feature consumers demonstrate the same semantic markup or interaction contract, with a stable typed API and Storybook coverage.
   - Use this reference pattern when it fits: `ProductListingPage` owns filters, URL updates, comparison state, and displayed-data calculation; `ProductListingLayout` assembles the page frame and platform header action; `ProductListingContent` places results, desktop sticky filters, and mobile bottom sheets; leaf components and pure modules own triggers, sort controls, titles, tabs, metadata, and filter policy.
   - Apply the low-level composition criteria below when a region benefits from smaller structural parts, even when those parts have only one consumer.
6. Choose the lowest useful component layer:
   - **Atom:** a semantic HTML primitive or a single interaction, such as a field group, disclosure, badge, table, or stepper.
   - **Molecule:** a stable combination of atoms with reusable slots or typed data, such as a state panel, contact card, summary grid, or row list.
   - **Organism:** a domain-aware composition with reusable interaction and layout behavior, such as responsive navigation or a catalog control.
   - **Feature/layout:** routing, page data, orchestration, and product-specific configuration only.
7. Prefer typed data contracts over positional tuples and expose the variation that callers genuinely need: `variant`/`tone`, `size`, responsive layout mode, optional action slots, empty/loading/error states, `className`, and accessible labels.
8. Keep shared components independent of a feature's mock data and routes. If a link implementation is inherently application-specific, keep it in a molecule or organism rather than an atom.
9. Preserve native semantics. Use suitable landmarks, buttons, fieldsets, labels, `dl`, tables, live regions, and controlled selection state instead of recreating those behaviors with generic elements.
10. Update at least one existing caller when extracting a component, unless the task is explicitly library-only. Do not rewrite unrelated pages merely to force adoption.
11. Add a `*.stories.tsx` file for every new public atom, molecule, or organism. Cover the default state, meaningful variants, empty/error states where relevant, and a controlled interaction story for stateful controls. Add stories for new public Typography variants and newly introduced Base UI behavior. For feature-local composition, test pure policy/metadata modules directly and cover web/mobile layout branches in a feature story or existing route story.
12. Run the project styling generator when shared style extraction uses generated CSS, then run type checking, linting, and a production build. Build Storybook when stories are added or changed.

## JSX style props

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

## Low-level composition

Here, **low-level composition** is a descriptive working term for assembling a UI region from small components with explicit structural, styling, or interaction responsibilities. It is not an additional Atomic Design tier and does not require a compound-component API or shared context.

- Inspect each region for useful boundaries: an outer frame, width-constrained content, navigation, an action group, or a search control. A possible header composition is `HeaderWrapper` containing `HeaderContent`, which composes `HeaderNav`, `HeaderAction`, and `HeaderSearch`. Follow the observed DOM hierarchy; these names are examples, not a required component list.
- A small structural component is useful when it owns a meaningful contract, such as a landmark, sticky positioning, content width, responsive arrangement, or action spacing. A single DOM element or single consumer does not disqualify it. Keep the DOM and its Panda styles together; avoid empty wrappers that only rename a tag and own no such contract.
- Keep structural parts presentational. Pass prepared content through `children`, named slots, or typed props, and pass interactions through explicit callbacks. Keep routing, data retrieval, and business-state derivation in the existing orchestration owner. Do not add context, polymorphism, or configurable variants solely to support decomposition.
- Keep parts inside the owning feature or organism folder unless their reuse contract is demonstrated across features. Nesting within an organism does not make every part a public atom or molecule. Export only the parts needed by actual callers; introduce a compound-component API only when callers need to assemble the parts themselves.
- Preserve DOM order and nesting, landmarks, accessible names, focus and keyboard behavior, refs, event propagation, sticky/overflow behavior, and all responsive values during extraction. Do not add DOM wrappers merely to establish component boundaries.
- Judge the result by whether each part has a clear responsibility and the parent makes the region's composition easier to read and change. Keep markup inline when extraction adds indirection or prop forwarding without establishing an independent contract. Do not use file size or component count as success criteria.

For each composition finding, name the current responsibility, proposed part and owner folder, its props or slots, and the behavior to preserve. Classify existing small components as `keep` when their structural contract is already clear. Validate changed composition through the existing region or route story, including responsive branches; private structural parts do not each need a public story.

## Local conventions

- Read the repository's `AGENTS.md` and applicable framework guidance before changing code.
- Use the project's styling system and semantic token variables rather than introducing another styling layer.
- Do not create, modify, or retain `*.module.scss` files. Do not create replacement `styles.ts` files that merely centralize page-local class names.
- Author component styles in the component's own `.tsx` file with Panda CSS: prefer JSX style props for straightforward single-use styles on Panda primitives, `css` for styles that benefit from a named declaration or targets without style props, `cva` for typed visual variants, and `sva` for multi-slot component styles. Keep declarations near the markup they style; extract a shared component only when its semantic markup or interaction contract is genuinely reusable.
- Prefer named `styled-system/jsx` layout primitives for routine composition; never use the `styled` factory or its tag members. Use `as` when it preserves a meaningful element and its attribute/ref contract; retain native semantic elements with Panda `css` when it does not.
- Treat the shared `Typography` component as the entry point for text: use `unstyled` for preserved text without an explicit type scale, and named variants for reusable scales. Preserve the original semantic tag and non-font styles. Do not duplicate its font size, weight, line height, or letter spacing in a caller when a suitable variant exists.
- Treat feature folders as the first home for feature-specific UI and policy. Promote to `shared/components` only after the reuse contract is proven across feature boundaries.
- Avoid generic global class names for shared components; scoped generated styles or namespaced classes prevent collisions.
- Respect a dirty worktree: preserve changes that are not part of the requested extraction.

## Completion report

State which components were added, which callers were migrated, what extension points are available, and which verification commands passed. Mention only actionable remaining candidates for future extraction.

For an audit-only request, group findings as `immediate improvement`, `extraction candidate`, or `keep`. For every Base UI finding, report the official primitive name, whether the installed version supports it, whether a dependency upgrade is required, and the observed interaction evidence. For Panda and Typography findings, report the recommended primitive/variant, semantic `as` value when relevant, and the responsive behavior that must be retained.
