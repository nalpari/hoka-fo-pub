# Headings and content groups

Use this guidance within the user's established scope. An audit or skill update alone does not authorize source migration. Consult [the repository audit and migration record](../../../../okf/architecture/content-sections.md) and [the footer action survey](../../../../okf/architecture/footer-actions.md) for concrete consumers and verify the current API before editing.

## Default composition

Use `ContentHeader` for ordinary titles, including a single heading without a description. Do not leave a bare heading `Typography` merely because the description is absent. Preserve the actual heading level, ID, responsive Typography props, and conditional presence; heading-like prices, menu labels, field labels, and decorative text are not automatically headings.

When the heading introduces related content, prefer the default `ContentHeader` built into `ContentSection`:

```tsx
<ContentSection
  as="section"
  gap="4"
  title="함께 구매하면 좋은 상품"
  headerProps={{ titleProps: { web: 'heading8', mo: 'heading7' } }}
>
  <RecommendationList />
</ContentSection>
```

`gap` belongs to the section's sibling intervals. `headerProps.gap` belongs to the title/eyebrow/description group. Do not accidentally move one interval to the other. Pass description, eyebrow, titleAs, titleProps, descriptionProps, and heading-specific spacing through `headerProps`; do not repeat `<ContentHeader>` or a single heading `Typography` in the `header` slot when this API is sufficient.

Use `headerProps.orientation="horizontal"` and `headerProps.action` for a heading group with an adjacent action. The supporting text stays grouped with the title; `gap` controls the heading text interval and the space before the action. Set an explicit gap to preserve an existing HStack interval. Use a custom `header` ReactNode only when the default structure cannot express the observed contract, such as a divider group. `title`/`headerProps` and `header` are alternative APIs; do not supply both or detect arbitrary object shapes at runtime. Assess existing header/frame adapters with [the wrapper workflow](wrapper-consolidation.md): preserve necessary boundaries and move shared optional composition into its existing owner instead of retaining a forwarding file solely for defaults.

## Preserve layout and behavior

- Reuse the existing region's Stack and semantic element where possible. Keep forms, lists, landmarks, accessible names, native attributes, refs, and event owners intact. Do not insert h/p elements inside a button/span-based interaction just to use the default header.
- Render `children` directly so their top-level elements participate in the section gap; do not add a body div or Fragment merely to hide the sibling structure. Remove a redundant body Stack when it only repeats the section's uniform gap. Keep consumer-owned groups when they express different spacing, responsive arrangement, padding, alignment, or a conditional contract.
- Transfer repeated margins into the correct parent gap only after resolving both sides of each boundary. Preserve unequal intervals, leading space, responsive values, margin collapse, dividers, and hidden/empty branches. A PC Grid does not become a vertical Stack merely because it has a heading.
- Preserve Panda extraction when moving layout styles into a nested props object. Use `headerProps.css` with `css.raw(...)` for such composed style objects, or another supported extraction path. Check that the generated rules exist; a runtime class name or another consumer's coincidental use of the same value is not evidence that the style will survive migration.
- The default header omits absent eyebrow/description nodes. Preserve title-only states and their existing heading hierarchy. Extend heading-level support for actual consumers rather than changing h4/h5 into h2 to satisfy the API.
- Verify the changed public API with an existing or new story, including title-only, supporting text, custom-header, and responsive states that matter. Compare affected layouts and relevant interactions; report actual verification separately from source-only audit findings. Update the related OKF record when migration changes its conclusions.

## Footer actions

`ContentSection.footer?: ReactNode` renders after `children` as part of the same Stack, without an automatic div or HTML footer. Prefer this slot for an action that completes that region: a list's load-more control, a completion link, or a related action group. `children` may be omitted for a header and CTA composition; do not invent an empty body or a heading just to use the slot.

- Survey `Button`, `ButtonLink`, action adapters, native buttons, and existing `footer`/`actions`/`action` slots. Distinguish region completion from field helpers, selection choices, header actions, row controls, and authentication steps between fields. Move the entire existing action group, preserving its visibility condition, order, links, callbacks, disabled/loading state, and responsive placement.
- Multiple buttons in a Fragment become separate flex items. Preserve a horizontal HStack/Grid group rather than expecting `footer` to infer button layout. A null/undefined footer creates no wrapper or residual gap.
- The section gap also applies before the footer. Compare it with existing body gap and footer mt/pt on PC and mobile. Preserve different intervals explicitly in the appropriate owner; do not add both the old margin and a new gap or use negative margins to compensate. Retain the current composition when the slot cannot express its layout without a larger redesign.
- A footer outside a form needs an explicit `form` id connection for submit buttons, or a composition that keeps the action inside its form. Preserve Enter submission, native validation, FormData, cancel-button type, and notice/error ordering. Do not move an authentication request past the code fields it enables.
- Prefer the existing owner's typed default-action API when it expresses the contract, such as CustomerCenterLayout.footerAction or ModalDialog.actions, while keeping custom footer alternatives mutually exclusive. AccountPageLayout can own optional heading/actions without a separate form-layout wrapper. Preserve spacing/form ownership and custom slots; do not create another section or adapter solely to host an action.
- Keep dedicated `ModalDialog.footer`, `BottomSheet.footer`, `Card.Footer`, and fixed purchase/order/mobile action bars responsible for scrolling, focus, safe areas, responsive placement, and button sizing. A button inside a modal body may belong in that modal's own footer; it is not a reason to insert ContentSection.
- Verify no-footer, conditional removal, grouped actions, header-with-footer-only, and form association states where applicable. Compare changed layouts and relevant interactions after migration; a prior audit or header migration is not runtime verification of footer changes.
