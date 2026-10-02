import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cva } from 'styled-system/css';

const typography = cva({
  base: { fontFamily: 'var(--font-family-base)' },
  variants: {
    variant: {
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
  | 'display'
  | 'heading'
  | 'sectionHeading'
  | 'cardTitle'
  | 'body'
  | 'formLabel'
  | 'productAudience'
  | 'meta'
  | 'price'
  | 'priceEmphasis'
  | 'filterLegend'
  | 'bottomSheetTitle'
  | 'action';

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
      className={[typography({ tone, variant }), className].filter(Boolean).join(' ')}
    >
      {children}
    </Element>
  );
}
