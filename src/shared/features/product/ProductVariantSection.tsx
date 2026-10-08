import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Stack, HStack, Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const header = css({ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' });

type ProductVariantSectionProps = {
  action?: ReactNode;
  children: ReactNode;
  id?: string;
  title: ReactNode;
};

/** Shared frame for a product-option control and its optional secondary action. */
export function ProductVariantSection({ action, children, id, title }: ProductVariantSectionProps) {
  return (
    <Stack as="section" id={id} gap="4" w="full">
      <HStack w="full" justify="space-between">
        <Typography as="h2" variant="productSelectorLabel">
          {title}
        </Typography>
        {action ? <div className={header}>{action}</div> : null}
      </HStack>
      <Box>{children}</Box>
    </Stack>
  );
}
