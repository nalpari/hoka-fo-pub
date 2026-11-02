import type { ReactNode } from 'react';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import type { BindingState } from '@/types/binding';

/** 서비스 요청 상태와 재시도 동작을 표시합니다. (Displays service request status and retry actions.) */
export function BindingFeedback({
  pending,
  error,
  onRetry,
  pendingMessage = '요청을 처리하고 있습니다.',
  errorFirst = false,
}: BindingState & { pendingMessage?: ReactNode; errorFirst?: boolean }) {
  const pendingContent = pending && <Typography role="status">{pendingMessage}</Typography>;
  const errorContent = error && <Typography role="alert">{error}</Typography>;

  return (
    <>
      {errorFirst ? errorContent : pendingContent}
      {errorFirst ? pendingContent : errorContent}
      {error && onRetry && (
        <Button onClick={onRetry} disabled={pending}>
          다시 시도
        </Button>
      )}
    </>
  );
}
