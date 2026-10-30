'use client';

import { css } from 'styled-system/css';
import { Circle, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { faCheck } from '@/icons/fontAwesome';
import { orderRecommendations } from '@/mocks/orderRecommendations';

/** 주문 완료 아이콘과 감사 인사를 표시합니다. (Displays the order completion icon and thank-you message.) */
function CheckoutCompleteHeader() {
  return (
    <>
      <Circle
        border="2px solid var(--colors-black-100)"
        size="10"
        flex="0 1 auto"
        display={{ _mobile: 'none' }}
        aria-hidden="true"
      >
        <Icon fontAwesomeIcon={faCheck} size={26} />
      </Circle>
      <Typography as="p" variant="heading7">
        구매해 주셔서 감사합니다.
      </Typography>
    </>
  );
}

/** 주문 접수 완료 안내와 추천 상품을 표시합니다. (Displays order completion and recommended products.) */
export function CheckoutComplete() {
  return (
    <Stack gap="16">
      <ContentSection
        as="section"
        alignItems="center"
        gap="8"
        pt="16"
        header={<CheckoutCompleteHeader />}
        footer={
          <ButtonLink href="/mypage/orders" variant="primary" size="short" fullWidth>
            주문 내용 확인하기
          </ButtonLink>
        }
      >
        <Typography as="p" variant="body4" className={css({ textAlign: 'center' })}>
          주문이 정상적으로 접수되었습니다.
          <br />
          앞으로도 만족스러운 서비스로 보답하겠습니다.
        </Typography>
      </ContentSection>
      <OrderRecommendations items={orderRecommendations} layout="portrait" />
    </Stack>
  );
}
