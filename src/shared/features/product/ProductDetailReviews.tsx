import type { ReactNode } from 'react';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductDetailPlaceholder } from './ProductDetailPlaceholder';

type Props = { count: number; id: string; className?: string; children?: ReactNode };

export function ProductDetailReviews({ count, id, className, children }: Props) {
  return (
    <ContentSection
      id={id}
      className={className}
      title={
        <>
          리뷰 <Typography variant="productSectionCount">({count})</Typography>
        </>
      }
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'productSectionTitle' } }}
      gap="6"
    >
      {children ?? <ProductDetailPlaceholder>크리마 영역 · 가로 1016px</ProductDetailPlaceholder>}
    </ContentSection>
  );
}
