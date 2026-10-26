'use client';

import { ClaimInstructions } from './ClaimInstructions';

import { useId, useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { BottomSheet } from '@/shared/components/layouts/BottomSheet/BottomSheet';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { ClaimProductSelection } from './ClaimProductSelection';
import { ClaimReasonFields } from './ClaimReasonFields';
import { ClaimAmountSummary } from './ClaimAmountSummary';
import { getClaimAmount, getRemainingLines } from './order-policy';
import type { ClaimKind, ClaimReason, OrderRecord } from './orders.types';

export type ClaimDraft = {
  quantities: Record<string, number>;
  reason: ClaimReason;
  details: string;
};

type Props = {
  order: OrderRecord;
  kind: ClaimKind;
  onClose: () => void;
  onSubmit: (draft: ClaimDraft) => string | null;
};

/** 취소·환불 신청 초안을 관리하고 검증 결과를 표시합니다. (Manages a cancellation or refund draft and validation feedback.) */
export function OrderClaimSheet({ order, kind, onClose, onSubmit }: Props) {
  const id = useId();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState<ClaimReason>('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const items = getRemainingLines(order);
  const amounts = getClaimAmount(items, quantities, reason);
  return (
    <BottomSheet
      title={kind === 'cancel' ? '주문 취소 신청' : '환불(반품) 신청'}
      ariaLabel={kind === 'cancel' ? '주문 취소 신청' : '환불(반품) 신청'}
      onClose={onClose}
      footer={
        <Button type="submit" form={id} variant="primary" fullWidth>
          신청하기
        </Button>
      }
    >
      <form
        id={id}
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setError(onSubmit({ quantities, reason, details }) ?? '');
        }}
      >
        <Stack gap="6">
          <ClaimInstructions kind={kind} />
          <ClaimProductSelection
            items={items}
            kind={kind}
            quantities={quantities}
            onToggle={(line, checked) =>
              setQuantities((previous) => ({
                ...previous,
                [line.key]: checked ? (kind === 'return' ? line.quantity : 1) : 0,
              }))
            }
            onQuantity={(key, value) =>
              setQuantities((previous) => ({ ...previous, [key]: value }))
            }
          />
          <ClaimReasonFields
            id={id}
            reason={reason}
            details={details}
            onReasonChange={setReason}
            onDetailsChange={setDetails}
          />
          <ClaimAmountSummary {...amounts} kind={kind} />
          {error ? <StatusMessage tone="error">{error}</StatusMessage> : null}
        </Stack>
      </form>
    </BottomSheet>
  );
}
