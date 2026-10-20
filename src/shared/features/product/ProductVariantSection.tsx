import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ProductVariantAction } from './ProductVariantAction';

type ProductVariantSectionProps = {
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  title: ReactNode;
};

/** Shared frame for a product-option control and its optional secondary action. */
export function ProductVariantSection({ action, children, id, title }: ProductVariantSectionProps) {
  return (
    <ContentSection
      as="section"
      id={id}
      gap="4"
      w="full"
      title={title}
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ w: 'full' }),
        titleProps: { variant: 'productSelectorLabel' },
        action: action ? <ProductVariantAction>{action}</ProductVariantAction> : null,
      }}
    >
      {children}
    </ContentSection>
  );
}
