import { Stack } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import type { OrderRecord } from './orders.types';
import { getClaimKind } from './order-policy';

type Props = {
  order: OrderRecord;
  onClaim: () => void;
  onTracking: () => void;
  onConfirm: () => void;
};

/** 주문 상태에 맞는 취소·배송·반품·리뷰 액션을 표시합니다. (Displays actions available for the order status.) */
export function OrderItemActions({ order, onClaim, onTracking, onConfirm }: Props) {
  const kind = getClaimKind(order.status);
  return (
    <Stack gap="2">
      {order.status !== 'paid' ? (
        <Button variant="secondary" size="short" fullWidth onClick={onTracking}>
          배송 조회
        </Button>
      ) : null}
      {kind ? (
        <Button variant="secondary" size="short" fullWidth onClick={onClaim}>
          {kind === 'cancel' ? '주문 취소' : '환불 신청'}
        </Button>
      ) : null}
      {order.status === 'delivered' ? (
        <Button variant="secondary" size="short" fullWidth onClick={onConfirm}>
          구매 확정
        </Button>
      ) : null}
      {order.status === 'purchased' ? (
        <ButtonLink
          href={`/mypage/reviews?order=${order.id}`}
          variant="secondary"
          size="short"
          fullWidth
        >
          리뷰 작성하기
        </ButtonLink>
      ) : null}
    </Stack>
  );
}
