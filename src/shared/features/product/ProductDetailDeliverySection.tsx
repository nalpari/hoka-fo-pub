import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
    <Stack as="section" gap="5" aria-label={title}>
      <Typography as="h3" variant="heading8">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

export function ProductDetailDeliveryList({ children }: { children: ReactNode }) {
  return (
    <Typography as="ol" variant="body5" className={numberedList}>
      {children}
    </Typography>
  );
}
