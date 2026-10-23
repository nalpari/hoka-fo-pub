import { Fragment } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ProductSpecificationHelp } from './ProductSpecificationHelp';
import type { ProductDetailSpecification } from './productDetailPresentation';

type Props = { items: readonly ProductDetailSpecification[]; gap: '4' | '8' };

export function ProductDetailSpecificationList({ items, gap }: Props) {
  return (
    <Stack as="dl" gap={gap}>
      {items.map((item) => (
        <Stack key={item.label} gap="2">
          <Typography as="dt" variant="body3" weight="bold">
            <HStack as="span" gap="2" alignItems="center">
              {item.label}
              {item.help ? (
                <ProductSpecificationHelp label={item.label} description={item.help} />
              ) : null}
            </HStack>
          </Typography>
          {typeof item.value === 'string' ? (
            <Typography as="dd" variant="body3">
              {item.value}
            </Typography>
          ) : (
            <HStack as="dd" gap="3" flexWrap="wrap">
              {item.value.map((value, index) => (
                <Fragment key={value}>
                  {index > 0 ? (
                    <Box as="span" aria-hidden="true" h="4" borderLeft="1px solid black" />
                  ) : null}
                  <Typography as="span" variant="body3">
                    {value}
                  </Typography>
                </Fragment>
              ))}
            </HStack>
          )}
        </Stack>
      ))}
    </Stack>
  );
}
