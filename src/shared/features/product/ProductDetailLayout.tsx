import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

const styles = {
  page: css({ maxW: '1532px', mx: 'auto', pt: '14', pb: '24', _mobile: { pt: 0 } }),
  layout: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) minmax(340px, .85fr)',
    gap: '8',
    _mobile: { display: 'block' },
  }),
};

type Props = { viewer: ReactNode; isViewing: boolean; children: ReactNode; footer: ReactNode };

export function ProductDetailLayout({ viewer, isViewing, children, footer }: Props) {
  return (
    <ContentLayout className={styles.page}>
      {viewer}
      <div hidden={isViewing}>
        <div className={styles.layout}>{children}</div>
        {footer}
      </div>
    </ContentLayout>
  );
}
