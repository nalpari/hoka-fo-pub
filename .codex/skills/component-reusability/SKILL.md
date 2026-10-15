---
name: component-reusability
description: Audit and improve React component reuse, low-level composition, Base UI adoption, Panda CSS/JSX composition, and Typography variants. Use when a codebase needs composable UI primitives or a repeatable UI architecture review.
---

# Component Reusability

Improve reuse without turning every visual difference into a new abstraction. Preserve feature-specific data, routing, and business behavior; move only reusable semantic markup, presentation states, or interaction contracts into shared components.

This is an evidence-based audit. Do not mechanically replace HTML with layout primitives or introduce Base UI for static markup. When a needed type scale lacks a Typography variant, define its semantic role, desktop/mobile values, and token contract before adding it. Every recommendation must name the observed pattern, the suggested API, why it improves the implementation, and the semantic, responsive, and migration constraints that must be preserved.

## Scope selection

Audit only folders explicitly named by the user. If the request does not name a target folder, ask “어느 폴더를 점검할까요?” before inspecting any files, and wait for the answer. Do not infer a default scope or inspect the repository until a target folder is supplied. When one or more folders are named, inspect only those folders and begin the workflow without asking for confirmation again.

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
   - Keep native semantic elements when a primitive adds no layout clarity or would obscure list, table, form, landmark, animation, measurement, focus, or third-party integration behavior. Do not replace text-only `span` elements or Storybook-only minimal wrappers merely for consistency.
4. Audit typography before leaving type-scale declarations in local styles.
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
- Prefer the available `styled-system/jsx` layout primitives for routine composition. Use their `as` prop when it preserves a meaningful element while making layout intent clearer; retain native semantic elements when it does not.
- Treat the shared `Typography` component as the single entry point for reusable type scales. Do not duplicate its font size, weight, line height, or letter spacing in a caller when a suitable variant exists.
- Treat feature folders as the first home for feature-specific UI and policy. Promote to `shared/components` only after the reuse contract is proven across feature boundaries.
- Avoid generic global class names for shared components; scoped generated styles or namespaced classes prevent collisions.
- Respect a dirty worktree: preserve changes that are not part of the requested extraction.

## Completion report

State which components were added, which callers were migrated, what extension points are available, and which verification commands passed. Mention only actionable remaining candidates for future extraction.

For an audit-only request, group findings as `immediate improvement`, `extraction candidate`, or `keep`. For every Base UI finding, report the official primitive name, whether the installed version supports it, whether a dependency upgrade is required, and the observed interaction evidence. For Panda and Typography findings, report the recommended primitive/variant, semantic `as` value when relevant, and the responsive behavior that must be retained.
