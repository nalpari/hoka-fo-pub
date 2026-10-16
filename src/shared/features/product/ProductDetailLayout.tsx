import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { ProductDetailBody } from './ProductDetailBody';

const styles = {
  page: css({ w: '100%', pt: '14', pb: '24', _mobile: { pt: 0 } }),
};

type Props = { viewer: ReactNode; isViewing: boolean; children: ReactNode; footer: ReactNode };

export function ProductDetailLayout({ viewer, isViewing, children, footer }: Props) {
  return (
    <ContentLayout className={styles.page}>
      {viewer}
      <ProductDetailBody isViewing={isViewing} footer={footer}>
        {children}
      </ProductDetailBody>
    </ContentLayout>
  );
}
