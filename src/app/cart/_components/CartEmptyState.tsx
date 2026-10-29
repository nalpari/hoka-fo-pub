'use client';

import { Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

/** 빈 장바구니 안내와 쇼핑 링크를 표시합니다. (Displays an empty cart message and shopping link.) */
export function CartEmptyState() {
  return (
    <Stack alignItems="center" gap="4" py="20" borderTop="1px solid var(--colors-black-20)">
      <Typography variant="body3">장바구니에 담은 상품이 없습니다.</Typography>
      <ButtonLink href="/products" variant="secondary">
        쇼핑 계속하기
      </ButtonLink>
    </Stack>
  );
}
