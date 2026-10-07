import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const root = css({ mt: '6' });

const header = css({ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' });

type ProductVariantSectionProps = {
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  title: string;
};

/** Shared frame for a product-option control and its optional secondary action. */
export function ProductVariantSection({ action, children, id, title }: ProductVariantSectionProps) {
  return (
    <section className={root} id={id}>
      {action ? (
        <div className={header}>
          <Typography as="h2" variant="productSelectorLabel">
            {title}
          </Typography>
          {action}
        </div>
      ) : (
        <Typography as="h2" className={css({ mb: '3' })} variant="productSelectorLabel">
          {title}
        </Typography>
      )}
      {children}
    </section>
  );
}
