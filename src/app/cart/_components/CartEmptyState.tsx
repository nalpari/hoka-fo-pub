'use client';

import { Box } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { Icon } from '@/components/common/atoms/Icon';

/** 빈 장바구니 안내와 탐색 링크를 표시합니다. (Displays an empty cart message and browsing links.) */
export function CartEmptyState() {
  return (
    <EmptyState
      variant="plain"
      layout="cart"
      as="div"
      title="장바구니가 비어 있습니다."
      icon={<Icon name="hoka-bag-shopping-regular" size={24} />}
      action={
        <>
          <Box>
            <ButtonLink href="/mypage/wishlist" variant="primary" size="tall" fullWidth>
              관심상품 보러가기
            </ButtonLink>
          </Box>
          <Box>
            <ButtonLink href="/products" variant="primary" size="tall" fullWidth>
              베스트 상품 보러가기
            </ButtonLink>
          </Box>
        </>
      }
    />
  );
}
