import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cva } from 'styled-system/css';

// Compact EN H7 uses the approved guide (500); the Figma style currently says 700.
const figmaTypographyVariants = {
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

const typography = cva({
  base: { fontFamily: 'var(--font-family-base)' },
  variants: {
    variant: {
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

      display: {
        fontSize: 'var(--type-display-font-size)',
        fontWeight: 'var(--type-display-font-weight)',
        lineHeight: 'var(--type-display-line-height)',
        letterSpacing: 'var(--type-display-letter-spacing)',
        _mobile: { fontSize: 'var(--type-display-mobile-font-size)' },
      },
      heading: figmaTypographyVariants.headingKr7,
      sectionHeading: {
        fontSize: 'var(--type-section-heading-font-size)',
        fontWeight: 'var(--type-section-heading-font-weight)',
        lineHeight: 'var(--type-section-heading-line-height)',
        _mobile: {
          fontSize: 'var(--type-section-heading-mobile-font-size)',
          lineHeight: 'var(--type-section-heading-mobile-line-height)',
        },
      },
      cardTitle: {
        fontSize: 'var(--type-card-title-font-size)',
        fontWeight: 'var(--type-card-title-font-weight)',
        lineHeight: 'var(--type-card-title-line-height)',
        _mobile: { fontSize: 'var(--type-card-title-mobile-font-size)' },
      },
      body: {
        ...figmaTypographyVariants.bodyKr3,
        _mobile: { fontSize: '14' },
      },
      formLabel: figmaTypographyVariants.bodyKr3,
      productAudience: figmaTypographyVariants.body3,
      productUse: {
        fontFamily: 'korean',
        fontWeight: 'bold',
        fontSize: '14',
        lineHeight: 'body',
        letterSpacing: 'korean',
      },
      productDetailGender: {
        fontFamily: 'hoka',
        fontWeight: 'medium',
        fontSize: '14',
        lineHeight: 'productGender',
      },
      productWidthOption: figmaTypographyVariants.cta2,
      sizeOption: figmaTypographyVariants.body5,
      productOptionValue: {
        fontFamily: 'hoka',
        fontWeight: 'medium',
        fontSize: '16',
        lineHeight: 'productOptionValue',
      },
      productSelectorLabel: {
        fontSize: 'var(--type-product-selector-label-font-size)',
        fontWeight: 'var(--type-product-selector-label-font-weight)',
        lineHeight: 'var(--type-product-selector-label-line-height)',
        letterSpacing: 'var(--type-product-selector-label-letter-spacing)',
        _mobile: { fontSize: 'var(--type-product-selector-label-mobile-font-size)' },
      },
      productSelectorAction: figmaTypographyVariants.body5,
      productTitle: {
        fontSize: 'var(--type-product-title-font-size)',
        fontWeight: 'var(--type-product-title-font-weight)',
        lineHeight: 'var(--type-product-title-line-height)',
        letterSpacing: 'var(--type-product-title-letter-spacing)',
        _mobile: { fontSize: 'var(--type-product-title-mobile-font-size)' },
      },
      productPrice: {
        fontSize: 'var(--type-product-price-font-size)',
        fontWeight: 'var(--type-product-price-font-weight)',
        lineHeight: 'var(--type-product-price-line-height)',
        _mobile: { fontSize: 'var(--type-product-price-mobile-font-size)' },
      },
      meta: {
        fontSize: 'var(--type-meta-font-size)',
        fontWeight: 'var(--type-meta-font-weight)',
        lineHeight: 'var(--type-meta-line-height)',
        _mobile: { fontSize: 'var(--type-meta-mobile-font-size)' },
      },
      price: {
        fontSize: 'var(--type-price-font-size)',
        fontWeight: 'var(--type-price-font-weight)',
        lineHeight: 'var(--type-price-line-height)',
        letterSpacing: 'var(--type-body-letter-spacing)',
        _mobile: { fontSize: 'var(--type-price-mobile-font-size)' },
      },
      priceEmphasis: { fontWeight: 'var(--type-price-emphasis-font-weight)' },
      action: {
        ...figmaTypographyVariants.ctaKr1,
        _mobile: { fontSize: '14' },
      },
      filterLegend: figmaTypographyVariants.ctaKr1,
      bottomSheetTitle: {
        fontWeight: 'var(--type-bottom-sheet-title-font-weight)',
        fontSize: 'var(--type-bottom-sheet-title-font-size)',
        lineHeight: 'var(--type-bottom-sheet-title-line-height)',
        letterSpacing: 'var(--type-bottom-sheet-title-letter-spacing)',
      },
      ...figmaTypographyVariants,
    },
    weight: { regular: { fontWeight: 'normal' }, medium: { fontWeight: 'medium' } },
    tone: {
      primary: { color: 'var(--color-text-primary)' },
      inverse: { color: 'var(--color-text-inverse)' },
      subtle: { color: 'var(--color-text-subtle)' },
    },
  },
  defaultVariants: { tone: 'primary', variant: 'body' },
});

export type TypographyVariant =
  | 'authTitle'
  | 'authCaption'
  | 'authBody'
  | 'authSmall'
  | 'display'
  | 'heading'
  | 'sectionHeading'
  | 'cardTitle'
  | 'body'
  | 'formLabel'
  | 'productAudience'
  | 'productUse'
  | 'productDetailGender'
  | 'productWidthOption'
  | 'productOptionValue'
  | 'sizeOption'
  | 'productSelectorLabel'
  | 'productSelectorAction'
  | 'productTitle'
  | 'productPrice'
  | 'meta'
  | 'price'
  | 'priceEmphasis'
  | 'filterLegend'
  | 'bottomSheetTitle'
  | 'action'
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

export type TypographyProps<T extends ElementType = 'span'> = Omit<
  ComponentPropsWithoutRef<T>,
  'as' | 'color'
> & {
  as?: T;
  children: ReactNode;
  tone?: 'primary' | 'inverse' | 'subtle';
  variant?: TypographyVariant;
  weight?: 'regular' | 'medium';
};

/** Semantic text primitive with paired desktop and mobile type scales. */
export function Typography<T extends ElementType = 'span'>({
  as,
  children,
  className,
  tone,
  variant,
  weight,
  ...props
}: TypographyProps<T>) {
  const Element = as ?? 'span';

  return (
    <Element
      {...props}
      className={[typography({ tone, variant: variant as never, weight }), className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Element>
  );
}
