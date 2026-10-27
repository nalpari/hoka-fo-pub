import type { ReactNode } from 'react';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductDetailPlaceholder } from './ProductDetailPlaceholder';

type Props = { count: number; id: string; className?: string; children?: ReactNode };

/** 상품 리뷰 섹션의 제목·건수와 내용을 구성합니다. (Composes the product review heading, count, and content.) */
export function ProductDetailReviews({ count, id, className, children }: Props) {
  return (
    <ContentSection
      id={id}
      className={className}
      title={
        <>
          리뷰 <Typography variant="body1" weight="medium">({count})</Typography>
        </>
      }
      headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading8' } }}
      gap="6"
    >
      {children ?? <ProductDetailPlaceholder>크리마 영역 · 가로 1016px</ProductDetailPlaceholder>}
    </ContentSection>
  );
}
