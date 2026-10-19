import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import {
  ProductDetailDeliverySection,
  ProductDetailDeliveryList,
} from './ProductDetailDeliverySection';
import { Grid, Stack } from 'styled-system/jsx';

const processTitle = css({
  borderRight: '1px solid token(colors.border.default)',
  pr: '6',
  _mobile: { borderRight: 'none', pr: '0' },
});

const stepRow = css({ display: 'flex', alignItems: 'center', gap: '5' });

const stepNumber = css({ flexShrink: '0', width: '8' });

const returnSteps = [
  '마이페이지 > 주문/배송 조회 > 주문 상세 내역 확인',
  '반품할 상품을 선택하여 반품 신청 후 수거 일정 확인',
  '최초 수령 상태와 동일하게 이중 포장하여 방문 기사님께 전달',
  '호카 물류센터에 상품 도착',
  '반품 요청 내용 및 상품 상태 확인',
  '반품 완료 및 결제수단별 환불 진행',
];

export function ProductDetailReturnGuide() {
  return (
    <ProductDetailDeliverySection title="호카 반품 안내">
      <ProductDetailDeliveryList>
        <li>온라인 스토어에서 구매하신 상품은 온라인으로 반품을 신청하실 수 있습니다.</li>
        <li>고객님 변심으로 발생하는 반품 배송비는 환불 금액에서 차감될 수 있습니다.</li>
        <li>상품과 구성품을 수령 당시 상태로 포장하여 지정 택배사의 수거를 기다려 주세요.</li>
      </ProductDetailDeliveryList>
      <Grid
        gridTemplateColumns="minmax(0, 1fr) minmax(0, 3fr)"
        gap="8"
        borderTop="2px solid token(colors.border.strong)"
        borderBottom="1px solid token(colors.border.default)"
        py="10"
        _mobile={{ gridTemplateColumns: '1fr', gap: '6', py: '6' }}
      >
        <Typography as="h4" variant="body2" tone="tertiary" className={processTitle}>
          상품 반품
          <br />
          STEP
        </Typography>
        <Stack as="ol" gap="6">
          {returnSteps.map((step, index) => (
            <li key={step} className={stepRow}>
              <Typography variant="body1" className={stepNumber} aria-hidden="true">
                {index + 1}
              </Typography>
              <Typography variant="body5">{step}</Typography>
            </li>
          ))}
        </Stack>
      </Grid>
    </ProductDetailDeliverySection>
  );
}
