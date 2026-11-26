'use client';

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  isValidElement,
  type ReactNode,
} from 'react';
import { usePlatform } from '@/context/platform';

import { css, cva, cx } from 'styled-system/css';

import {
  type ResponsiveTypographyVariant,
  type TypographyLanguage,
  type TypographyStyleKey,
  type TypographyVariant,
  typographyWeights,
} from '@/styles/typography';

import {
  isNamedTone,
  resolveToneColor,
  type TypographyTone,
  typographyTones,
} from './Typography.tone';

export type { ResponsiveTypographyVariant, TypographyVariant } from '@/styles/typography';

export type { TypographyTone } from './Typography.tone';

const typographyTone = cva({ variants: { tone: typographyTones } });

const typographyBase = css({ transform: 'translateY(1px)' });

const inheritedWeight = css({ fontWeight: 'inherit' });

const underlined = css({ textDecoration: 'underline' });

type WeightValue = (typeof typographyWeights)[keyof typeof typographyWeights];

export type TypographyWeight =
  keyof typeof typographyWeights | 'inherit' | `${WeightValue}-${WeightValue}`;

export type TypographyProps<T extends ElementType = 'span'> = Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'color'
> & {
  as?: T;
  children: ReactNode;
  tone?: TypographyTone;
  srOnly?: boolean;
  variant?: ResponsiveTypographyVariant;
  web?: TypographyVariant;
  mo?: ResponsiveTypographyVariant;
  /** Defaults to auto. Hangul text selects Pretendard. */
  language?: 'auto' | TypographyLanguage;
  /** Use a variant suffix for fixed weights. Dynamic states resolve to a registered style. */
  weight?: TypographyWeight;
  underline?: boolean;
};

function containsHangul(children: ReactNode): boolean {
  if (typeof children === 'string') return /\p{Script=Hangul}/u.test(children);
  if (Array.isArray(children)) return children.some(containsHangul);
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return containsHangul(children.props.children);
  }
  return false;
}

function resolveVariant(
  variant: TypographyVariant,
  language: TypographyLanguage,
  mobile: boolean,
  weight: TypographyWeight | undefined,
): TypographyVariant {
  if (variant.startsWith('d')) return variant;

  const requested =
    weight && weight !== 'inherit'
      ? weight in typographyWeights
        ? typographyWeights[weight as keyof typeof typographyWeights]
        : Number(weight.split('-')[mobile ? 1 : 0])
      : undefined;

  if (variant.startsWith('h')) {
    return requested === undefined
      ? variant
      : (variant.replace(/B?$/, requested >= 800 ? 'B' : '') as TypographyVariant);
  }

  const level = variant.slice(0, 2);
  const existing = variant.slice(2);
  const suffix =
    requested === undefined
      ? existing
      : requested >= 800
        ? 'E'
        : requested >= 700
          ? 'B'
          : requested >= 600
            ? 'S'
            : requested >= 500
              ? 'M'
              : '';
  return `${level}${language === 'en' && (suffix === 'S' || suffix === 'E') ? 'B' : suffix}` as TypographyVariant;
}

/** 화면과 언어에 맞는 HOKA 텍스트 스타일을 적용합니다. (Applies HOKA text styles for the active platform and language.) */
export function Typography<T extends ElementType = 'span'>({
  as,
  children,
  className,
  style,
  tone,
  srOnly = false,
  variant,
  web,
  mo,
  language = 'auto',
  weight,
  underline = false,
  ...props
}: TypographyProps<T>) {
  const Element = as ?? 'span';
  const mobile = usePlatform() === 'mobile';
  const selected = (mobile ? mo : web) ?? variant;
  const lang = language === 'auto' ? (containsHangul(children) ? 'ko' : 'en') : language;
  const resolved = selected && resolveVariant(selected, lang, mobile, weight);
  const platform = resolved?.startsWith('b') ? 'common' : mobile ? 'compact' : 'wide';
  const textStyle = resolved && (`${lang}-${platform}-${resolved}` as TypographyStyleKey);
  const namedTone = tone && isNamedTone(tone) ? tone : undefined;

  return (
    <Element
      {...props}
      style={tone && !namedTone ? { color: resolveToneColor(tone), ...style } : style}
      className={cx(
        textStyle && typographyBase,
        textStyle && css({ textStyle }),
        namedTone && typographyTone({ tone: namedTone }),
        textStyle && weight === 'inherit' && inheritedWeight,
        underline && underlined,
        srOnly && css({ srOnly: true }),
        className,
      )}
    >
      {children}
    </Element>
  );
}
