'use client';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

/** 빈 장바구니 안내와 탐색 링크를 표시합니다. (Displays an empty cart message and browsing links.) */
export function CartEmptyState() {
  return (
    <Stack
      w={{ base: '520px', _mobile: '343px' }}
      maxW="100%"
      alignSelf="center"
      alignItems="center"
      gap={{ base: '48px', _mobile: '32px' }}
    >
      <Stack gap="16px" alignItems="center">
        <Icon name="hoka-bag-shopping-regular" size={24} />
        <Typography variant="body3" className={css({ textAlign: 'center' })}>
          장바구니가 비어 있습니다.
        </Typography>
      </Stack>
      <HStack w="100%" gap="2" justifyContent="center" _mobile={{ flexDirection: 'column' }}>
        <Box w={{ base: '180px', _mobile: '100%' }}>
          <ButtonLink href="/mypage/wishlist" variant="primary" size="tall" fullWidth>
            관심상품 보러가기
          </ButtonLink>
        </Box>
        <Box w={{ base: '180px', _mobile: '100%' }}>
          <ButtonLink href="/products" variant="primary" size="tall" fullWidth>
            베스트 상품 보러가기
          </ButtonLink>
        </Box>
      </HStack>
    </Stack>
  );
}
