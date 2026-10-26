import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ClaimKind } from './orders.types';

/** 취소와 반품의 상품 선택·환불 절차를 안내합니다. (Explains product selection and refund steps for claims.) */
export function ClaimInstructions({ kind }: { kind: ClaimKind }) {
  return (
    <Typography variant="body4" tone="subtle">
      {kind === 'cancel' ? (
        <>
          취소할 상품과 수량을 선택해주세요.
          <br />
          일부만 취소(부분취소)할 수 있으며, 배송비는 주문의 남은 상품이 모두 취소될 때 함께
          환불됩니다.
        </>
      ) : (
        <>
          반품할 상품과 수량을 선택해주세요.
          <br />
          상품을 회수한 뒤 결제 금액이 환불됩니다. (반품 접수)
        </>
      )}
    </Typography>
  );
}
