# Headings and content groups

Use this guidance within the user's established scope. An audit or skill update alone does not authorize source migration. Consult [the repository audit and migration record](../../../../okf/architecture/content-sections.md) for concrete consumers and verify the current API before editing.

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

Use a custom `header` ReactNode only when the default structure cannot express the observed contract, such as a title with adjacent controls, a divider group, or an existing feature-specific header adapter. `title`/`headerProps` and `header` are alternative APIs; do not supply both or detect arbitrary object shapes at runtime. Keep existing dedicated frame/interaction components when their contract remains useful.

## Preserve layout and behavior

- Reuse the existing region's Stack and semantic element where possible. Keep forms, lists, landmarks, accessible names, native attributes, refs, and event owners intact. Do not insert h/p elements inside a button/span-based interaction just to use the default header.
- Remove a redundant body Stack when it only repeats the section's uniform gap. Keep groups with their own spacing, responsive arrangement, padding, alignment, or conditional contract. Group arbitrary `children` when necessary to avoid applying the section gap to every nested fragment child.
- Transfer repeated margins into the correct parent gap only after resolving both sides of each boundary. Preserve unequal intervals, leading space, responsive values, margin collapse, dividers, and hidden/empty branches. A PC Grid does not become a vertical Stack merely because it has a heading.
- Preserve Panda extraction when moving layout styles into a nested props object. Use `headerProps.css` with `css.raw(...)` for such composed style objects, or another supported extraction path. Check that the generated rules exist; a runtime class name or another consumer's coincidental use of the same value is not evidence that the style will survive migration.
- The default header omits absent eyebrow/description nodes. Preserve title-only states and their existing heading hierarchy. Extend heading-level support for actual consumers rather than changing h4/h5 into h2 to satisfy the API.
- Verify the changed public API with an existing or new story, including title-only, supporting text, custom-header, and responsive states that matter. Compare affected layouts and relevant interactions; report actual verification separately from source-only audit findings. Update the related OKF record when migration changes its conclusions.
