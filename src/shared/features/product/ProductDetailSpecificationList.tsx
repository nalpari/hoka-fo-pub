import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ProductDetailSpecification } from './productDetailPresentation';

type Props = { items: readonly ProductDetailSpecification[]; gap: '4' | '8' };

export function ProductDetailSpecificationList({ items, gap }: Props) {
  return (
    <Stack as="dl" gap={gap}>
      {items.map((item) => (
        <Stack key={item.label} gap="2">
          <Typography as="dt" variant="body3" weight="bold">
            {item.label}
          </Typography>
          <Typography as="dd" variant="body3">
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
