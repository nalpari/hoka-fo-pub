import { Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { OrderCardHeader } from './OrderCardHeader';
import { OrderHistoryProduct } from './OrderHistoryProduct';
import { OrderInformationSection } from './OrderInformationSection';
import { OrderClaimGroup } from './OrderClaimGroup';
import { getOrderAmounts, getRemainingLines, orderStatusLabels } from './order-policy';
import type { OrderCardActions } from './OrderCard';
import type { OrderRecord } from './orders.types';

type Props = OrderCardActions & { order: OrderRecord; onList: () => void; onDelete: () => void };

/** 주문 상품·받는 사람·결제 정보와 취소 내역을 표시합니다. (Displays order products, recipient, payment, and claim history.) */
export function OrderDetail({ order, onList, onDelete, ...actions }: Props) {
  const amounts = getOrderAmounts(order);

  return (
    <ContentSection
      gap="8"
      header={<OrderCardHeader order={order} compact />}
      footer={
        <Stack gap="4">
          <Button variant="link" size="sm" onClick={onDelete}>
            주문 내역 삭제
          </Button>
          <Button variant="primary" fullWidth onClick={onList}>
            주문목록 돌아가기
          </Button>
        </Stack>
      }
    >
      <Typography variant="body5">
        {orderStatusLabels[order.status]} · {order.expectedDate} 도착 예정
      </Typography>
      <Stack gap="4">
        {getRemainingLines(order).map((line) => (
          <OrderHistoryProduct key={line.key} line={line} onAddToCart={actions.onAddToCart} />
        ))}
      </Stack>
      <OrderInformationSection
        title="받는사람 정보"
        items={[
          { term: '받는사람', description: '홍길동' },
          { term: '연락처', description: '010-1234-5678' },
          { term: '받는주소', description: '서울시 강남구 역삼동 123-45' },
          { term: '배송요청사항', description: '부재시 문 앞에 놓아주세요.' },
        ]}
      />
      <OrderInformationSection
        title="결제 정보"
        items={[
          { term: '결제수단', description: '신용카드' },
          { term: '총 상품금액', description: `${amounts.total.toLocaleString()}원` },
          {
            term: '취소금액',
            description: `${amounts.claimed.toLocaleString()}원`,
          },
          {
            term: '총 결제금액',
            description: `${amounts.remaining.toLocaleString()}원`,
          },
        ]}
      />
      {order.claims.length ? (
        <ContentSection title="취소·반품·교환 내역" gap="4">
          <Stack gap="4">
            {order.claims.map((claim) => (
              <OrderClaimGroup
                key={claim.id}
                order={order}
                claim={claim}
                onDetail={() => actions.onClaimDetail(order, claim)}
              />
            ))}
          </Stack>
        </ContentSection>
      ) : null}
    </ContentSection>
  );
}
