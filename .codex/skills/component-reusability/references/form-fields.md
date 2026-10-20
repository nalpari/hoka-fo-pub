# Form-field reuse workflow

Use this workflow for field audits and authorized migrations. Keep the skill's scope-selection rules; a repository-wide survey does not automatically authorize implementation.

## Survey the rendered contract

Search existing `FormField`/`TextInput` compositions, shared wrappers, native `input`/`textarea`/`select`, and selection controls. Follow helper calls, field configuration arrays, adapters, aliases, and `as` props so a JSX search does not miss generated fields. Distinguish production consumers from stories, Mockup, and primitive internals. Label counts as source sites, files, or rendered instances; these are different measures.

For each candidate, record the consumers, current shared components, repeated responsibility, proposed API, and behavior that must remain feature-specific. Compare labels, errors, hints, control attributes, layout, and state transitions rather than matching placeholder text alone. Check whether a similarly named component is actually a read-only display.

## Choose the reusable boundary

- Reuse the current atoms first. A repeated `FormField` + `TextInput` can become a `TextFormField` molecule that composes their existing accessibility and styling contracts without another DOM wrapper.
- Add semantic presets such as name, phone, password, email, birth date, or verification code when real consumers share a useful input contract. Presets provide explicit, overridable presentation defaults; they do not silently add validation, digit stripping, date conversion, or a universal required policy.
- Keep feature adapters when they translate feature keys, information objects, or domain options. Delegate their common rendering instead of moving the feature's data model into the shared API.
- Share a repeated interaction process as well as its fields when appropriate: address search can share fields and modal wiring while parents keep draft values, errors, open state, and save behavior. Support observed layout and native-attribute differences explicitly. A style difference alone does not rule out reuse of the same process.
- Keep separate contracts for a full email input and local/domain inputs with a domain selector and check action. Likewise, share a countdown's formatting without moving timer creation, expiration, resend, or verification into the display component.
- Preserve selection values and option types. Similar preference radios may use `yes/no` or Korean strings; sharing presentation does not require changing their values.
- Retain specialized search, file, rating, size, quantity, and other controls when their existing shared components already express the interaction. Keep compact/native fields where a proposed boxed composition cannot preserve layout, uncontrolled values, or form submission.

Do not infer a need for a global form builder, context, form library, or Base UI replacement from repeated field markup. Lift the smallest demonstrated shared contract.

## Preserve attributes and ownership

Before editing, compare these contracts across consumers:

| Contract             | Preservation checks                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility        | `id`/label connection, error and hint descriptions, invalid state, focus behavior                                                |
| Native form behavior | `name`/`FormData`, form ownership, button types, `required`, `disabled`, `readOnly`                                              |
| Input behavior       | `type`, `autoComplete`, `inputMode`, `maxLength`, placeholder, password visibility, refs and event signatures                    |
| Value ownership      | controlled vs uncontrolled inputs, `defaultValue`, reset behavior, caller normalization and error clearing                       |
| Feature policy       | validation timing and rules, confirmation comparisons, verification invalidation, countdown lifecycle, request/submit/navigation |
| Presentation         | DOM order/nesting, responsive spacing, conditional content, label wrapping, counter formatting and disabled styles               |

A drawn `*` is not equivalent to native `required`. `disabled` excludes a control from native submission; `readOnly` has a different contract. Login `username`/`current-password` attributes must not inherit signup email/`new-password` defaults. Absence of an attribute can also be intentional; allow consumers to preserve it rather than injecting a preset value.

Keep values, validation, normalization, and business transitions with their existing owners. For an existing composed input, preserve native props in a typed `inputProps` object and keep field-level label/error/hint props separate. Use the installed input types; preserve discriminated single-line/multiline branches when deriving props. Do not erase union-specific attributes or cast away errors to force a wrapper API.

Use a narrow composition slot when a consumer must retain its existing input/counter grouping. Do not add wrapper elements solely to rename the composition. Preserve counter limits and formatting per consumer, including spaces and thousands separators. Keep parent-owned spacing under the skill's repeated-sibling-spacing guidance.

## Verify and report

For implementation changes, run appropriate type, lint, style generation, and build checks. Use a meaningful shared API story and affected existing flows to verify labels/errors, input changes, password visibility, native submission, and the transitions actually touched. For address/email/verification changes, include the relevant modal apply/cancel, domain disabled state, or timer/error transitions. Do not invent a fixed scenario count or require application builds for a skill-only change.

Compare affected desktop/mobile layouts and native attributes before and after migration. If comparing computed geometry, declare any subpixel tolerance and also inspect meaningful states; matching coordinates alone cannot verify form behavior. Record actual checks separately from source-only findings and untested external integrations.

Report migrated consumers, intentionally retained contracts, and verification results. Update the repository's related OKF concepts and migration record when implementation changes their findings. Historical survey counts should remain identified as pre-migration observations rather than current source counts.
