import { Badge } from '@/components/common/atoms/Badge/Badge';
import type { OrderClaim } from './orders.types';

/** 취소·반품의 접수 또는 완료 상태를 표시합니다. (Displays a claim’s requested or completed status.) */
export function OrderClaimStatus({ kind, state }: Pick<OrderClaim, 'kind' | 'state'>) {
  return (
    <Badge variant="filled" tone="tertiary">
      {kind === 'cancel' ? '취소' : '반품'}
      {state === 'complete' ? '완료' : '접수'}
    </Badge>
  );
}
