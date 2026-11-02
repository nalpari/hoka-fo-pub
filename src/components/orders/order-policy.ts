/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 주문 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import type { OrderClaim, OrderLine, OrderRecord, OrderStatus } from './orders.types.ts';
export const orderStatusLabels: Record<OrderStatus, string> = {
  paid: '결제완료',
  preparing: '상품준비중',
  shipping: '배송중',
  delivered: '배송완료',
  purchased: '구매확정',
  cancelled: '취소완료',
  returned: '반품완료',
};
export const claimReasonLabels = {
  mind: '단순변심',
  size: '사이즈가 맞지 않음',
  damage: '상품불량/파손',
  wrong: '오배송',
  missing: '구성품 누락',
  other: '기타',
} as const;
export function getClaimLines(order: OrderRecord, claim: OrderClaim): OrderLine[] {
  return order.items.flatMap((line) =>
    claim.quantities[line.key] ? [{ ...line, quantity: claim.quantities[line.key] }] : [],
  );
}
