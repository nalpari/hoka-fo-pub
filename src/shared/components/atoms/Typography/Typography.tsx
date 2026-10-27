'use client';

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { isValidElement } from 'react';
import { css, cva, cx } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';

// Compact EN H7 uses the approved guide (500); the Figma style currently says 700.
export const figmaTypographyVariants = {
  heading1: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-84)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-50)',
      fontWeight: 'black',
    },
  },
  heading2: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-72)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-42)',
      fontWeight: 'black',
    },
  },
  heading3: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-58)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-36)',
      fontWeight: 'black',
    },
  },
  heading4: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-50)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-28)',
      fontWeight: 'black',
    },
  },
  heading5: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-42)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-22)',
      fontWeight: 'black',
    },
  },
  heading6: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-36)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-20)',
      fontWeight: 'black',
    },
  },
  heading7: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-28)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'medium',
    },
  },
  heading8: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-22)',
    fontWeight: 'black',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'medium',
    },
  },
  heading9: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-16)',
    fontWeight: 'medium',
    lineHeight: 'hoka',
    letterSpacing: '0',
    _mobile: {
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'medium',
    },
  },
  body1: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-24)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  body2: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-20)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  body3: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-16)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  body4: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-14)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  body5: {
    fontFamily: 'hoka',
    fontSize: 'var(--font-sizes-12)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  cta1: {
    fontFamily: 'hoka',
    fontSize: '16',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  cta2: {
    fontFamily: 'hoka',
    fontSize: '14',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: '0',
  },
  textLink1: {
    fontFamily: 'hoka',
    fontSize: '16',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: '0',
    textDecoration: 'underline',
  },
  textLink2: {
    fontFamily: 'hoka',
    fontSize: '14',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: '0',
    textDecoration: 'underline',
  },
  textLink3: {
    fontFamily: 'hoka',
    fontSize: '12',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: '0',
    textDecoration: 'underline',
  },
  headingKr1: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-84)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-50)',
      fontWeight: 'black',
    },
  },
  headingKr2: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-72)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-42)',
      fontWeight: 'black',
    },
  },
  headingKr3: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-58)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-36)',
      fontWeight: 'black',
    },
  },
  headingKr4: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-50)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-28)',
      fontWeight: 'black',
    },
  },
  headingKr5: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-42)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-22)',
      fontWeight: 'black',
    },
  },
  headingKr6: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-36)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-20)',
      fontWeight: 'black',
    },
  },
  headingKr7: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-28)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'semibold',
    },
  },
  headingKr8: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-22)',
    fontWeight: 'black',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'semibold',
    },
  },
  headingKr9: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-16)',
    fontWeight: 'semibold',
    lineHeight: 'koreanHeading',
    letterSpacing: 'korean',
    _mobile: {
      fontSize: 'var(--font-sizes-16)',
      fontWeight: 'semibold',
    },
  },
  bodyKr1: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-24)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  bodyKr2: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-20)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  bodyKr3: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-16)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  bodyKr4: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-14)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  bodyKr5: {
    fontFamily: 'korean',
    fontSize: 'var(--font-sizes-12)',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  ctaKr1: {
    fontFamily: 'korean',
    fontSize: '16',
    fontWeight: 'semibold',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  ctaKr2: {
    fontFamily: 'korean',
    fontSize: '14',
    fontWeight: 'semibold',
    lineHeight: 'body',
    letterSpacing: 'korean',
  },
  textLinkKr1: {
    fontFamily: 'korean',
    fontSize: '16',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: 'korean',
    textDecoration: 'underline',
  },
  textLinkKr2: {
    fontFamily: 'korean',
    fontSize: '14',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: 'korean',
    textDecoration: 'underline',
  },
  textLinkKr3: {
    fontFamily: 'korean',
    fontSize: '12',
    fontWeight: 'medium',
    lineHeight: 'body',
    letterSpacing: 'korean',
    textDecoration: 'underline',
  },
  mono1: {
    fontFamily: 'mono',
    fontSize: '24',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
  },
  mono2: {
    fontFamily: 'mono',
    fontSize: '20',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
  },
  mono3: {
    fontFamily: 'mono',
    fontSize: '16',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
  },
  mono4: {
    fontFamily: 'mono',
    fontSize: '14',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
  },
  mono5: {
    fontFamily: 'mono',
    fontSize: '12',
    fontWeight: 'normal',
    lineHeight: 'body',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
  },
} as const;

const typographyTones = {
  error: { color: 'red.100' },
  inherit: { color: 'inherit' },
  primary: { color: 'var(--color-text-primary)' },
  inverse: { color: 'var(--color-text-inverse)' },
  brand: { color: 'var(--color-text-brand)' },
  subtle: { color: 'var(--color-text-subtle)' },
  disabled: { color: 'var(--color-text-disabled)' },
  tertiary: { color: 'var(--color-text-tertiary)' },
  black40: { color: 'var(--color-black-40)' },
  black20: { color: 'var(--color-black-20)' },
  black10: { color: 'var(--color-black-10)' },
  red80: { color: 'var(--color-red-80)' },
} as const;

const typographyTone = cva({ variants: { tone: typographyTones } });

const typography = cva({
  base: { fontFamily: 'var(--font-family-base)' },
  variants: {
    variant: {
      loginTitle: {
        fontFamily: 'korean',
        fontSize: 'var(--type-login-title-font-size)',
        fontWeight: 'var(--type-login-title-font-weight)',
        lineHeight: 'var(--type-login-title-line-height)',
        letterSpacing: 'var(--type-login-title-letter-spacing)',
        _mobile: { fontSize: 'var(--type-login-title-mobile-font-size)' },
      },
      pageTitle: {
        fontSize: 'var(--type-page-title-font-size)',
        fontWeight: 'var(--type-page-title-font-weight)',
        lineHeight: 'var(--type-page-title-line-height)',
        letterSpacing: 'var(--type-page-title-letter-spacing)',
        _mobile: { fontSize: 'var(--type-page-title-mobile-font-size)' },
      },
      authTitle: {
        fontSize: 'var(--type-authTitle-font-size)',
        fontWeight: 'var(--type-authTitle-font-weight)',
        lineHeight: 'var(--type-authTitle-line-height)',
        letterSpacing: 'var(--type-authTitle-letter-spacing)',
        _mobile: { fontSize: 'var(--type-authTitle-mobile-font-size)' },
      },
      authCaption: figmaTypographyVariants.bodyKr5,
      authBody: figmaTypographyVariants.bodyKr3,
      authSmall: figmaTypographyVariants.bodyKr4,

      body: {
        ...figmaTypographyVariants.bodyKr3,
        fontSize: 'var(--type-body-font-size)',
        _mobile: { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
      },
      ...figmaTypographyVariants,
      cta2: {
        ...figmaTypographyVariants.cta2,
        _mobile: { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
      },
      ctaKr2: {
        ...figmaTypographyVariants.ctaKr2,
        _mobile: { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
      },
      textLink2: {
        ...figmaTypographyVariants.textLink2,
        _mobile: { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
      },
      textLinkKr2: {
        ...figmaTypographyVariants.textLinkKr2,
        _mobile: { fontSize: 'var(--home-body-14, var(--font-sizes-14))' },
      },
    },
    weight: {
      regular: {
        fontWeight: 'normal',
        _mobile: { fontWeight: 'normal' },
      },
      medium: {
        fontWeight: 'medium',
        _mobile: { fontWeight: 'medium' },
      },
      semibold: {
        fontWeight: 'semibold',
        _mobile: { fontWeight: 'semibold' },
      },
      bold: {
        fontWeight: 'bold',
        _mobile: { fontWeight: 'bold' },
      },
      black: {
        fontWeight: 'black',
        _mobile: { fontWeight: 'black' },
      },
      inherit: {
        fontWeight: 'inherit',
        _mobile: { fontWeight: 'inherit' },
      },
    },
    script: {
      en: { fontFamily: 'hoka', letterSpacing: '0' },
      ko: { fontFamily: 'korean', letterSpacing: 'korean' },
    },
    tone: typographyTones,
  },
});

export type TypographyVariant =
  | 'loginTitle'
  | 'pageTitle'
  | 'authTitle'
  | 'authCaption'
  | 'authBody'
  | 'authSmall'
  | 'body'
  | `heading${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `headingKr${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
  | `body${1 | 2 | 3 | 4 | 5}`
  | `bodyKr${1 | 2 | 3 | 4 | 5}`
  | `mono${1 | 2 | 3 | 4 | 5}`
  | 'ctaKr1'
  | 'ctaKr2'
  | 'textLinkKr1'
  | 'textLinkKr2'
  | 'textLinkKr3'
  | 'cta1'
  | 'cta2'
  | 'textLink1'
  | 'textLink2'
  | 'textLink3';

export type TypographyTone = NonNullable<Parameters<typeof typography>[0]>['tone'];

export type TypographyProps<T extends ElementType = 'span'> = Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'color'
> & {
  as?: T;
  children: ReactNode;
  tone?: TypographyTone;
  /** Visually hides text while keeping it available to screen readers. */
  srOnly?: boolean;
  /** Explicit tone overrides the inherited color. */
  variant?: TypographyVariant;
  /** Web override; falls back to variant when omitted. */
  web?: TypographyVariant;
  /** Mobile override; falls back to variant when omitted. */
  mo?: TypographyVariant;
  /** Defaults to auto: Hangul selects KR for paired variants; other semantic variants stay unchanged. */
  language?: 'auto' | 'en' | 'ko';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold' | 'black' | 'inherit';
};

function containsHangul(children: ReactNode): boolean {
  if (typeof children === 'string') return /\p{Script=Hangul}/u.test(children);
  if (Array.isArray(children)) return children.some(containsHangul);
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return containsHangul(children.props.children);
  }
  return false;
}

function resolveLanguageVariant(
  variant: TypographyVariant | undefined,
  language: TypographyProps['language'],
  children: ReactNode,
): TypographyVariant | undefined {
  if (!variant || !language) return variant;

  const pair = /^(heading|body|cta|textLink)(?:Kr)?(\d)$/.exec(variant);
  if (!pair) return variant;

  const korean = language === 'ko' || (language === 'auto' && containsHangul(children));
  const resolved = `${pair[1]}${korean ? 'Kr' : ''}${pair[2]}`;

  return resolved in figmaTypographyVariants ? (resolved as TypographyVariant) : variant;
}

/** 웹·모바일의 표준 타이포그래피 scale을 적용하는 텍스트 요소입니다. (Applies standard web and mobile typography scales to text.) */
export function Typography<T extends ElementType = 'span'>({
  as,
  children,
  className,
  tone,
  srOnly = false,
  variant,
  web,
  mo,
  language = 'auto',
  weight,
  ...props
}: TypographyProps<T>) {
  const Element = as ?? 'span';
  const platform = usePlatform();
  const selectedVariant = (platform === 'mobile' ? mo : web) ?? variant;
  const resolvedVariant = resolveLanguageVariant(selectedVariant, language, children);
  const resolvedTone = tone ?? (selectedVariant ? 'inherit' : undefined);

  return (
    <Element
      {...props}
      className={cx(
        selectedVariant
          ? typography({
              tone: resolvedTone,
              variant: resolvedVariant as never,
              weight,
            })
          : tone
            ? typographyTone({ tone })
            : undefined,
        srOnly && css({ srOnly: true }),
        className,
      )}
    >
      {children}
    </Element>
  );
}
