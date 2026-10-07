import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cva } from 'styled-system/css';

const englishHeadingSizes = [96, 80, 64, 56, 48, 40, 32, 24] as const;
const koreanHeadingSizes = [84, 72, 58, 50, 42, 36, 28, 22] as const;
const bodySizes = [24, 20, 16, 14, 12] as const;

const figmaTypographyVariants = {
  ...Object.fromEntries(
    englishHeadingSizes.map((fontSize, index) => [
      `heading${index + 1}`,
      { fontSize: `${fontSize}px`, fontWeight: '900', lineHeight: '0.96' },
    ]),
  ),
  ...Object.fromEntries(
    koreanHeadingSizes.map((fontSize, index) => [
      `headingKr${index + 1}`,
      {
        fontFamily: 'var(--font-family-korean)',
        fontSize: `${fontSize}px`,
        fontWeight: '900',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
      },
    ]),
  ),
  ...Object.fromEntries(
    bodySizes.map((fontSize, index) => [
      `body${index + 1}`,
      { fontSize: `${fontSize}px`, fontWeight: '400', lineHeight: '1.3' },
    ]),
  ),
  ...Object.fromEntries(
    bodySizes.map((fontSize, index) => [
      `bodyKr${index + 1}`,
      {
        fontFamily: 'var(--font-family-korean)',
        fontSize: `${fontSize}px`,
        fontWeight: '400',
        lineHeight: '1.3',
        letterSpacing: '-0.02em',
      },
    ]),
  ),
  ...Object.fromEntries(
    bodySizes.map((fontSize, index) => [
      `mono${index + 1}`,
      {
        fontFamily: 'var(--font-family-mono)',
        fontSize: `${fontSize}px`,
        fontWeight: '400',
        lineHeight: '1.3',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
    ]),
  ),
  cta1: { fontSize: '16px', fontWeight: '500', lineHeight: '1.3' },
  cta2: { fontSize: '14px', fontWeight: '500', lineHeight: '1.3' },
  textLink1: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.3',
    textDecoration: 'underline',
  },
  textLink2: {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.3',
    textDecoration: 'underline',
  },
  textLink3: {
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1.3',
    textDecoration: 'underline',
  },
};

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
      authCaption: {
        fontSize: 'var(--type-authCaption-font-size)',
        fontWeight: 'var(--type-authCaption-font-weight)',
        lineHeight: 'var(--type-authCaption-line-height)',
        letterSpacing: 'var(--type-authCaption-letter-spacing)',
        _mobile: { fontSize: 'var(--type-authCaption-mobile-font-size)' },
      },
      authBody: {
        fontSize: 'var(--type-authBody-font-size)',
        fontWeight: 'var(--type-authBody-font-weight)',
        lineHeight: 'var(--type-authBody-line-height)',
        letterSpacing: 'var(--type-authBody-letter-spacing)',
        _mobile: { fontSize: 'var(--type-authBody-mobile-font-size)' },
      },
      authSmall: {
        fontSize: 'var(--type-authSmall-font-size)',
        fontWeight: 'var(--type-authSmall-font-weight)',
        lineHeight: 'var(--type-authSmall-line-height)',
        letterSpacing: 'var(--type-authSmall-letter-spacing)',
        _mobile: { fontSize: 'var(--type-authSmall-mobile-font-size)' },
      },

      display: {
        fontSize: 'var(--type-display-font-size)',
        fontWeight: 'var(--type-display-font-weight)',
        lineHeight: 'var(--type-display-line-height)',
        letterSpacing: 'var(--type-display-letter-spacing)',
        _mobile: { fontSize: 'var(--type-display-mobile-font-size)' },
      },
      heading: {
        fontSize: 'var(--type-heading-font-size)',
        fontWeight: 'var(--type-heading-font-weight)',
        lineHeight: 'var(--type-heading-line-height)',
        letterSpacing: 'var(--type-heading-letter-spacing)',
        _mobile: { fontSize: 'var(--type-heading-mobile-font-size)' },
      },
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
        fontSize: 'var(--type-body-font-size)',
        fontWeight: 'var(--type-body-font-weight)',
        lineHeight: 'var(--type-body-line-height)',
        letterSpacing: 'var(--type-body-letter-spacing)',
        _mobile: { fontSize: 'var(--type-body-mobile-font-size)' },
      },
      formLabel: {
        fontSize: 'var(--type-form-label-font-size)',
        fontWeight: 'var(--type-form-label-font-weight)',
        lineHeight: 'var(--type-form-label-line-height)',
        letterSpacing: 'var(--type-form-label-letter-spacing)',
        _mobile: { fontSize: 'var(--type-form-label-mobile-font-size)' },
      },
      productAudience: {
        fontSize: 'var(--type-product-audience-font-size)',
        fontWeight: 'var(--type-product-audience-font-weight)',
        lineHeight: 'var(--type-product-audience-line-height)',
        letterSpacing: 'var(--type-product-audience-letter-spacing)',
      },
      productSelectorLabel: {
        fontSize: 'var(--type-product-selector-label-font-size)',
        fontWeight: 'var(--type-product-selector-label-font-weight)',
        lineHeight: 'var(--type-product-selector-label-line-height)',
        letterSpacing: 'var(--type-product-selector-label-letter-spacing)',
        _mobile: { fontSize: 'var(--type-product-selector-label-mobile-font-size)' },
      },
      productSelectorAction: {
        fontSize: 'var(--type-product-selector-action-font-size)',
        fontWeight: 'var(--type-product-selector-action-font-weight)',
        lineHeight: 'var(--type-product-selector-action-line-height)',
        letterSpacing: 'var(--type-product-selector-action-letter-spacing)',
        _mobile: { fontSize: 'var(--type-product-selector-action-mobile-font-size)' },
      },
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
        fontSize: 'var(--type-action-font-size)',
        fontWeight: 'var(--type-action-font-weight)',
        lineHeight: 'var(--type-action-line-height)',
        letterSpacing: 'var(--type-action-letter-spacing)',
        _mobile: { fontSize: 'var(--type-action-mobile-font-size)' },
      },
      filterLegend: {
        fontWeight: 'var(--type-filter-legend-font-weight)',
        fontSize: 'var(--type-filter-legend-font-size)',
        lineHeight: 'var(--type-filter-legend-line-height)',
        letterSpacing: 'var(--type-filter-legend-letter-spacing)',
      },
      bottomSheetTitle: {
        fontWeight: 'var(--type-bottom-sheet-title-font-weight)',
        fontSize: 'var(--type-bottom-sheet-title-font-size)',
        lineHeight: 'var(--type-bottom-sheet-title-line-height)',
        letterSpacing: 'var(--type-bottom-sheet-title-letter-spacing)',
      },
      ...figmaTypographyVariants,
    },
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
  | `heading${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`
  | `headingKr${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`
  | `body${1 | 2 | 3 | 4 | 5}`
  | `bodyKr${1 | 2 | 3 | 4 | 5}`
  | `mono${1 | 2 | 3 | 4 | 5}`
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
};

/** Semantic text primitive with paired desktop and mobile type scales. */
export function Typography<T extends ElementType = 'span'>({
  as,
  children,
  className,
  tone,
  variant,
  ...props
}: TypographyProps<T>) {
  const Element = as ?? 'span';

  return (
    <Element
      {...props}
      className={[typography({ tone, variant: variant as never }), className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Element>
  );
}
