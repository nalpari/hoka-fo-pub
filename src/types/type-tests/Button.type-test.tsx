import { Button, ButtonLink } from '@/components/common/atoms/Button';

// Compile-only API checks, validated by `npm run typecheck`.
export function checkButtonSizingTypes() {
  const valid = (
    <>
      <Button />
      <Button variant="icon" size={24} shape="circle" tone="inverse" aria-label="닫기" />
      <Button variant="icon" size="1.5rem" disabled aria-label="삭제" />
      <Button variant="icon" loading aria-label="처리 중" />
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

      <Button loadMore={{ remaining: 10 }} size="short" />
      <Button loadMore={{ remaining: 10 }} variant="link" size="lg" />
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

      <Button loadMore={{ remaining: 10 }} variant="filterTrigger" />
      <Button loadMore={{ remaining: 10 }} variant="headerSearch" />
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

  // @ts-expect-error Button loadMore must preserve variant/size correlation.
  const moreSmall = <Button loadMore={{ remaining: 10 }} size="sm" />;

  // @ts-expect-error Link load-more buttons reject short.
  const moreShort = <Button loadMore={{ remaining: 10 }} variant="link" size="short" />;

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

  // @ts-expect-error Button loadMore preserves the fixed-size constraint.
  const fixedMore = <Button loadMore={{ remaining: 10 }} variant="headerSearch" size="tall" />;

  // @ts-expect-error Icon-only shape options do not belong to text variants.
  const textShape = <Button variant="primary" shape="circle" />;

  // @ts-expect-error Icon mode uses its own geometry instead of fullWidth.
  const iconFullWidth = <Button variant="icon" fullWidth aria-label="닫기" />;

  // @ts-expect-error Text variants keep tall/short sizing rather than pixel sizes.
  const textPixels = <Button variant="primary" size={24} />;

  return [
    textShape,
    iconFullWidth,
    textPixels,
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
    moreSmall,
    moreShort,
    fixedFilter,
    fixedSearch,
    fixedSmall,
    fixedNavigation,
    fixedMore,
  ];
}

// Generated content and provider styles must not conflict with caller-owned content.
export function checkButtonPresentationTypes() {
  const valid = (
    <>
      <Button loadMore={{ remaining: 0 }} />
      <Button loadMore={{ counter: { current: 1, total: 3 } }} variant="primary" size="short" />
      <ButtonLink href="/support" loadMore={{ counter: { current: 1, total: 3 } }} />
      <Button social={{ provider: 'kakao' }}>카카오 로그인</Button>
      <Button social={{ provider: 'naver', appearance: 'signup' }} size="short">
        가입
      </Button>
    </>
  );
  // @ts-expect-error Generated count content replaces custom children.
  const countChildren = <Button loadMore={{ remaining: 1 }}>더보기</Button>;
  // @ts-expect-error Remaining and page-counter modes are mutually exclusive.
  const bothCounts = <Button loadMore={{ remaining: 1, counter: { current: 1, total: 2 } }} />;
  // @ts-expect-error Social presentation owns its icon.
  const socialIcon = <Button social={{ provider: 'kakao' }} icon="icon" />;

  // @ts-expect-error Social presentation owns its appearance variant.
  const socialVariant = <Button social={{ provider: 'kakao' }} variant="secondary" />;
  // @ts-expect-error Social and load-more modes cannot be combined.
  const bothModes = <Button social={{ provider: 'naver' }} loadMore={{ remaining: 1 }} />;
  // @ts-expect-error Icon-only geometry cannot contain a generated counter.
  const iconCount = <Button variant="icon" loadMore={{ remaining: 1 }} />;
  // @ts-expect-error Social sizing follows the primary button's tall/short scale.
  const socialSize = <Button social={{ provider: 'naver' }} size="sm" />;
  const linkChildren = (
    // @ts-expect-error Link counter content replaces custom children too.
    <ButtonLink href="/" loadMore={{ remaining: 1 }}>
      링크
    </ButtonLink>
  );
  return [
    valid,
    countChildren,
    bothCounts,
    socialIcon,
    socialVariant,
    bothModes,
    iconCount,
    socialSize,
    linkChildren,
  ];
}
