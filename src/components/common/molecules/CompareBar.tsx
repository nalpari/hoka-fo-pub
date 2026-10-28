import { HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography';

import type { Product } from '@/mocks/products';

export function CompareBar({
  products,
  onClear,
  onCompare,
}: {
  products: Product[];
  onClear: () => void;
  onCompare: () => void;
}) {
  return (
    <HStack
      as="aside"
      pos="sticky"
      bottom={{ base: '18px', _mobile: '8px' }}
      zIndex="3"
      flexWrap={{ base: 'nowrap', _mobile: 'wrap' }}
      gap="2.5"
      mt="5"
      border="1px solid var(--color-black-100)"
      p={{ base: '14px 18px', _mobile: '10px' }}
      bg="var(--color-white-000)"
      boxShadow="0 8px 24px color-mix(in srgb, var(--color-black-100) 12%, transparent)"
      aria-live="polite"
    >
      <Stack flex="1" gap="3px">
        <Typography as="small" variant="body5">
          상품 비교 · 최대 3개
        </Typography>
        <Typography as="strong" variant="body5">
          {products.map((product) => product.name).join('  ·  ')}
        </Typography>
      </Stack>
      <Button onClick={onClear} size="short">
        선택 해제
      </Button>
      <Button onClick={onCompare} size="short" variant="primary">
        비교하기 ({products.length})
      </Button>
    </HStack>
  );
}
