import { CheckoutCompleteHeader } from './CheckoutCompleteHeader';
import { orderRecommendations } from '@/mocks/orderRecommendations';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ButtonLink } from '@/components/common/atoms/Button/Button';
import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations/OrderRecommendations';

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
