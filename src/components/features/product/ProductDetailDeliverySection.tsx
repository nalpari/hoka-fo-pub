import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography/Typography';

const numberedList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  listStyleType: 'decimal',
  pl: '4',
});

export function ProductDetailDeliverySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <ContentSection
      as="section"
      gap="5"
      aria-label={title}
      title={<>{title}</>}
      headerProps={{ titleAs: 'h3', titleProps: { variant: 'heading8' } }}
    >
      {children}
    </ContentSection>
  );
}

export function ProductDetailDeliveryList({ children }: { children: ReactNode }) {
  return (
    <Typography as="ol" variant="body5" className={numberedList}>
      {children}
    </Typography>
  );
}
