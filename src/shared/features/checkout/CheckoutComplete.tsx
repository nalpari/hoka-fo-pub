import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Circle, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faCheck } from '@/shared/icons/fontAwesome';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { OrderRecommendations } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendations';

export function CheckoutComplete() {
  return (
    <Stack gap="16">
      <ContentSection
        as="section"
        alignItems="center"
        gap="8"
        pt="16"
        header={
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
        }
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
      <OrderRecommendations />
    </Stack>
  );
}
