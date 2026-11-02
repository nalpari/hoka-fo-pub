'use client';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { orderRecommendations } from '@/mocks/orderRecommendations';

/** 주문 접수 완료 안내와 추천 상품을 표시합니다. (Displays order completion and recommended products.) */
export function CheckoutComplete() {
  return (
    <Stack gap={{ base: '24', _mobile: '16' }}>
      {/* 주문완료 안내 */}
      <Stack
        as="section"
        alignItems="center"
        alignSelf="center"
        w={{ base: '500px', _mobile: '100%' }}
        pt={{ base: '10', _mobile: '10' }}
        gap="8"
        textAlign="center"
      >
        <Stack alignItems="center" gap="4">
          <Typography as="p" variant="body2" weight="medium">
            구매해 주셔서 감사합니다.
          </Typography>
          <Typography as="p" variant="body4">
            주문이 정상적으로 접수되었습니다.
            <br />
            앞으로도 만족스러운 서비스로 보답하겠습니다.
          </Typography>
        </Stack>
        <ButtonLink
          href="/mypage/orders"
          variant="primary"
          size="tall"
          fullWidth
          className={css({ w: { base: '180px', _mobile: '100%' } })}
        >
          주문내용 확인하기
        </ButtonLink>
      </Stack>
      {/* 추천 상품 */}
      <OrderRecommendations
        items={orderRecommendations}
        layout="checkout"
        title="함께 구매하면 좋은 상품"
      />
    </Stack>
  );
}
