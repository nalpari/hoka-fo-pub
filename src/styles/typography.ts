const displaySizes = {
  wide: [84, 72, 58, 50],
  compact: [50, 44, 42, 40],
} as const;

const headingSizes = {
  wide: [44, 42, 40, 36, 34, 32, 30, 28, 24, 22],
  compact: [36, 34, 32, 30, 28, 24, 22, 20],
} as const;

const bodySizes = [24, 20, 18, 16, 15, 14, 13, 12, 10] as const;

const families = {
  ko: {
    name: 'Pretendard',
    value: 'var(--font-family-korean)',
    headingLineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  en: {
    name: 'The Future HOKA',
    value: 'var(--font-family-base)',
    headingLineHeight: 1,
    letterSpacing: '0',
  },
} as const;

export const typographyWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

const bodyWeights = {
  '': 'regular',
  M: 'medium',
  S: 'semibold',
  B: 'bold',
  E: 'extrabold',
} as const;

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ResponsiveTypographyVariant =
  | `d${1 | 2 | 3 | 4}`
  | `h${HeadingLevel}${'' | 'B'}`
  | `b${HeadingLevel | 9}${keyof typeof bodyWeights}`;

export type TypographyVariant = ResponsiveTypographyVariant | `h${9 | 10}${'' | 'B'}`;

export type TypographyLanguage = keyof typeof families;

type StylePlatform = 'wide' | 'compact' | 'common';
type StyleGroup = 'display' | 'heading' | 'body';
type Weight = keyof typeof typographyWeights;

export type TypographyStyleKey = `${TypographyLanguage}-${StylePlatform}-${TypographyVariant}`;

function styleDefinition(
  language: TypographyLanguage,
  platform: StylePlatform,
  group: StyleGroup,
  variant: TypographyVariant,
  fontSize: number,
  weight: Weight,
) {
  const family = families[language];
  const label = variant.toUpperCase();
  const groupName = group[0].toUpperCase() + group.slice(1);
  const platformName = platform[0].toUpperCase() + platform.slice(1);
  const styleName = language === 'en' ? `EN - ${label}` : label;

  return {
    key: `${language}-${platform}-${variant}` as TypographyStyleKey,
    path:
      platform === 'common'
        ? `${groupName}/${styleName}`
        : `${groupName}/${platformName}/${styleName}`,
    language,
    platform,
    group,
    variant,
    fontFamily: family.name,
    fontSize,
    fontWeight: typographyWeights[weight],
    lineHeight: group === 'body' ? 1.5 : family.headingLineHeight,
    letterSpacing: family.letterSpacing,
    weight,
  };
}

export const typographyStyles = (['ko', 'en'] as const).flatMap((language) => [
  ...(['wide', 'compact'] as const).flatMap((platform) => [
    ...displaySizes[platform].map((size, index) =>
      styleDefinition(
        language,
        platform,
        'display',
        `d${index + 1}` as TypographyVariant,
        size,
        'black',
      ),
    ),
    ...headingSizes[platform].flatMap((size, index) => [
      styleDefinition(
        language,
        platform,
        'heading',
        `h${index + 1}` as TypographyVariant,
        size,
        'bold',
      ),
      styleDefinition(
        language,
        platform,
        'heading',
        `h${index + 1}B` as TypographyVariant,
        size,
        'black',
      ),
    ]),
  ]),
  ...bodySizes.flatMap((size, index) =>
    (Object.keys(bodyWeights) as (keyof typeof bodyWeights)[])
      .filter((suffix) => language === 'ko' || (suffix !== 'S' && suffix !== 'E'))
      .map((suffix) =>
        styleDefinition(
          language,
          'common',
          'body',
          `b${index + 1}${suffix}` as TypographyVariant,
          size,
          bodyWeights[suffix],
        ),
      ),
  ),
]);

function sizeTokens(sizes: readonly number[]) {
  return Object.fromEntries(
    [...new Set(sizes)].map((size) => [size, { value: `${size / 16}rem` }]),
  );
}

export const typographyTokens = {
  fonts: Object.fromEntries(
    Object.entries(families).map(([name, font]) => [name, { value: font.value }]),
  ),
  fontSizes: {
    display: sizeTokens([...displaySizes.wide, ...displaySizes.compact]),
    heading: sizeTokens([...headingSizes.wide, ...headingSizes.compact]),
    body: sizeTokens(bodySizes),
  },
  fontWeights: Object.fromEntries(
    Object.entries(typographyWeights).map(([name, value]) => [name, { value: String(value) }]),
  ),
};

export const typographyTextStyles = Object.fromEntries(
  typographyStyles.map(({ key, language, group, fontSize, weight, lineHeight, letterSpacing }) => [
    key,
    {
      value: {
        fontFamily: language,
        fontSize: `${group}.${fontSize}`,
        fontWeight: weight,
        lineHeight: String(lineHeight),
        letterSpacing,
      },
    },
  ]),
);
