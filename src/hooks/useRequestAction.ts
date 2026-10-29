'use client';

import { useCallback, useRef, useState } from 'react';

/** 중복 요청을 막고 요청 실패를 현재 화면에 유지합니다. (Prevents duplicate requests and keeps request failures on the current screen.) */
export function useRequestAction() {
  const active = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(async (action: () => void | Promise<void>) => {
    if (active.current) return false;
    active.current = true;
    setPending(true);
    setError('');
    try {
      await action();
      return true;
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : '요청을 처리하지 못했습니다. 다시 시도해 주세요.',
      );
      return false;
    } finally {
      active.current = false;
      setPending(false);
    }
  }, []);

  return { pending, error, run };
}
