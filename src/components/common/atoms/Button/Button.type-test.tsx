import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import { LoadMoreButton } from '@/components/common/atoms/LoadMoreButton';
import { ToggleButton } from '@/components/common/atoms/ToggleButton';

// Compile-only API checks, validated by `npm run typecheck`.
export function checkButtonSizingTypes() {
  const valid = (
    <>
      <Button />
      <Button size="tall" />
      <Button variant="primary" size="short" />
      <Button variant="link" size="sm" />
      <Button variant="link" size="md" />
      <Button variant="link" size="lg" />
      <Button variant="plain" size="md" />
      <Button variant="chip">Chip</Button>
      <ButtonLink href="/" size="tall">
        Button
      </ButtonLink>
      <ButtonLink href="/" variant="link" size="sm">
        Link
      </ButtonLink>
      <ToggleButton expanded={false} size="short">
        Toggle
      </ToggleButton>
      <ToggleButton expanded={false} variant="link" size="md">
        Toggle link
      </ToggleButton>
      <LoadMoreButton remaining={10} size="short" />
      <LoadMoreButton remaining={10} variant="link" size="lg" />
      <Button variant="filterTrigger">Filter</Button>
      <Button variant="filterTrigger" size="compact">
        Filter
      </Button>
      <Button variant="filterTrigger" size="regular">
        Filter &amp; Sort
      </Button>
      <Button variant="headerSearch">Search</Button>
      <ButtonLink href="/" variant="filterTrigger">
        Filter
      </ButtonLink>
      <ButtonLink href="/" variant="headerSearch">
        Search
      </ButtonLink>
      <ToggleButton expanded={false} variant="filterTrigger">
        Filter
      </ToggleButton>
      <ToggleButton expanded={false} variant="headerSearch">
        Search
      </ToggleButton>
      <LoadMoreButton remaining={10} variant="filterTrigger" />
      <LoadMoreButton remaining={10} variant="headerSearch" />
    </>
  );

  // @ts-expect-error A default variant uses tall/short.
  const defaultSmall = <Button size="sm" />;

  // @ts-expect-error Chip has one fixed size.
  const chipShort = <Button variant="chip" size="short" />;

  // @ts-expect-error Non-link variants reject legacy sizes.
  const primaryLarge = <Button variant="primary" size="lg" />;

  // @ts-expect-error Link retains its own sizing scale.
  const linkTall = <Button variant="link" size="tall" />;

  // @ts-expect-error Height has been removed from the API.
  const legacyHeight = <Button height="tall" />;

  // @ts-expect-error Secondary inverse has been consolidated into primary.
  const legacyInverse = <Button variant="secondaryInverse" />;

  const navigationSmall = (
    // @ts-expect-error ButtonLink must preserve variant/size correlation.
    <ButtonLink href="/" size="sm">
      Button
    </ButtonLink>
  );

  const navigationShort = (
    // @ts-expect-error A text navigation link cannot use short.
    <ButtonLink href="/" variant="link" size="short">
      Link
    </ButtonLink>
  );

  const navigationHeight = (
    // @ts-expect-error ButtonLink no longer accepts height either.
    <ButtonLink href="/" height="short">
      Button
    </ButtonLink>
  );

  const toggleSmall = (
    // @ts-expect-error ToggleButton must preserve variant/size correlation.
    <ToggleButton expanded={false} size="sm">
      Toggle
    </ToggleButton>
  );

  const toggleTall = (
    // @ts-expect-error Link toggles reject tall.
    <ToggleButton expanded={false} variant="link" size="tall">
      Toggle
    </ToggleButton>
  );

  // @ts-expect-error LoadMoreButton must preserve variant/size correlation.
  const moreSmall = <LoadMoreButton remaining={10} size="sm" />;

  // @ts-expect-error Link load-more buttons reject short.
  const moreShort = <LoadMoreButton remaining={10} variant="link" size="short" />;

  // @ts-expect-error Filter triggers accept compact/regular, not tall/short.
  const fixedFilter = <Button variant="filterTrigger" size="tall" />;

  // @ts-expect-error Fixed search buttons reject explicit sizing.
  const fixedSearch = <Button variant="headerSearch" size="short" />;

  // @ts-expect-error Fixed variants also reject link sizes.
  const fixedSmall = <Button variant="headerSearch" size="sm" />;

  const fixedNavigation = (
    // @ts-expect-error ButtonLink preserves the fixed-size constraint.
    <ButtonLink href="/" variant="headerSearch" size="tall">
      Search
    </ButtonLink>
  );

  const fixedToggle = (
    // @ts-expect-error ToggleButton preserves the fixed-size constraint.
    <ToggleButton expanded={false} variant="filterTrigger" size="short">
      Filter
    </ToggleButton>
  );

  // @ts-expect-error LoadMoreButton preserves the fixed-size constraint.
  const fixedMore = <LoadMoreButton remaining={10} variant="headerSearch" size="tall" />;

  return [
    valid,
    defaultSmall,
    chipShort,
    primaryLarge,
    linkTall,
    legacyHeight,
    legacyInverse,
    navigationSmall,
    navigationShort,
    navigationHeight,
    toggleSmall,
    toggleTall,
    moreSmall,
    moreShort,
    fixedFilter,
    fixedSearch,
    fixedSmall,
    fixedNavigation,
    fixedToggle,
    fixedMore,
  ];
}
