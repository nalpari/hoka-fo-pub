# Wrapper and parent-option consolidation

Use for wrapper audits and authorized component cleanup. An audit or policy/skill update does not authorize application migration, unused-file deletion, staging, or commits beyond the user's request. Keep the established scope and existing authorization; do not add a second approval gate for work already authorized.

## Choose the ownership change

Inspect actual implementations and resolve TypeScript symbols through aliases, re-exports, namespace access, and dynamic imports. Count distinct production consumer modules, excluding stories, tests, and type-only use. Search those excluded consumers separately before removing files. JSX counts and barrel import counts are not production-parent counts.

| Observed responsibility                                                                       | Preferred change                                                                                                                |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Only forwards props, renames them, or supplies presentation defaults                          | Use the existing base directly and preserve defaults at consumers. Multiple consumers do not establish an independent contract. |
| Shared optional composition or interaction already belongs to an existing component           | Add a small typed option/variant to that owner and move the wrapper's implementation into its module.                           |
| A component has exactly one production parent                                                 | Follow [single-parent consolidation](single-parent-consolidation.md); keep useful local components at module scope.             |
| No production consumers, including story-only implementations                                 | Report separately; remove only within an authorized unused/story-only cleanup after reference checks.                           |
| Necessary runtime boundary, independent shared behavior, or a different domain responsibility | Retain it and state the concrete reason; file size alone is not the reason.                                                     |

State the observed pattern, real consumers, proposed owner/API, net production-file reduction, and preservation constraints. Distinguish symbol removal from file removal: deleting one function from a surviving file does not reduce files. Do not copy shared implementation into callers or introduce compatibility/preset files that recreate the removed indirection.

## Keep the owner small and compatible

- Use the closest existing owner with the right responsibility. A domain frame owns its common breadcrumbs, gutters, and supported layouts; generic controls own their label/error presentation. Keep business validation, authentication, request state, product data, and route transitions with their current owners.
- Prefer optional modes that preserve existing default callers. Repeated domain layouts can become a layout variant on the existing domain frame rather than another whole-page wrapper. Generate shared base breadcrumbs once and accept only the caller's remaining trail. Preserve one main landmark and the original navigation behavior, width, gaps, and mobile spacing.
- Use a discriminant when alternatives require different data. Keep incompatible generated options and custom slots mutually exclusive in types, such as a default action configuration versus a custom footer. Preserve the custom composition escape hatch instead of inferring it from arbitrary object shapes.
- Do not pre-design unused modes, add loose boolean combinations, or move domain-specific data into a generic atom merely to save a file. Preserve optional absence: no title, action, error, or label must keep its original DOM and spacing unless the requested API explicitly changes that state.
- Retain native props, refs, callback signatures, generic values, checked/disabled/invalid semantics, accessible names/descriptions, and form/submit association. Keep interactive links and detail buttons inside consent text from toggling the checkbox. Changing a visual label must not change submitted values or required policy.
- Keep local helper functions at module scope and preserve Hooks/state lifetime and server/client, metadata, and lazy-loading boundaries. Do not add wrappers solely to rename components.

The repository demonstrates both direct base use and parent options: ContentHeader/TextFormField replaced default-only wrappers; ModalDialog.actions, CustomerCenterLayout.footerAction, AccountPageLayout's optional heading/actions, Checkbox.consent, and Radio.label absorbed shared composition. MyPageFrame's layout modes illustrate domain-frame ownership. Verify the current sources and [UI record](../../../../okf/architecture/ui.md) before reusing these examples; an in-progress source change is not a completed verification result.

## Migrate styles, consumers, and evidence together

- Transfer defaults and spread precedence explicitly, including overrides nested in inputProps, titleProps, or style objects. Follow dynamic component selection and configuration helpers; remove their dispatch only when the surviving base preserves all selected contracts.
- Preserve parent-owned spacing, hidden/conditional content, and footer placement. A footer's button spacing and the region's sibling gap are distinct. Keep fixed/mobile safe-area behavior with its responsible owner.
- Follow the skill's Panda composition rules: merge conflicting internal base/variant objects before generating classes. Preserve extraction for nested configuration with css.raw or another supported path; check the generated rules and computed styles rather than relying on coincidental rules from another consumer.
- Update runtime imports, type references, tests, stories, previews, and any IA/story links before deletion. Keep stories under src/stories with meaningful states and interactions. Preserve titles/IDs for a pure move; when ownership intentionally changes their classification, update affected references rather than keeping a production wrapper only for Storybook.
- Test new alternatives, omitted options, and unchanged default consumers. Verify incompatible API combinations with type checks; compare PC/mobile geometry, accessibility and keyboard/form interactions appropriate to the change. Use the installed Next guides before modifying route boundaries.
- Confirm the running server/build actually reflects the edited source. A production server may retain its old modules after another build; use an owned current preview rather than stopping another chat's server. Distinguish viewport width from the app's actual platform/provider. If input automation fails, inspect document focus and event/state evidence before attributing it to the component; the repository's [focus diagnosis](../../../../okf/development/verification.md#storybook-자동-입력과-브라우저-포커스-2026-10-28) is specific to the observed Ego/CDP environment.
- Update relevant OKF concepts, index and log while preserving historical provenance and distinguishing audit findings, source changes, completed checks, and pending work. A policy-only update needs skill/document validation, not application builds or source edits.

## Concurrent edits and requested staging

Record relevant working files and the index before editing. When requested to stage this task, apply its delta to the current index, preserving both earlier staged work and newly staged concurrent work. Do not stage whole mixed files or restore old working bytes over another chat's edits. Inspect staged content and required OKF coverage; run okf:check for staged source changes. Leave unrelated unstaged changes alone. This workflow grants no permission to message another chat, stage an audit automatically, or commit/push.
