'use client';

/**
 * [개발팀 바인딩]
 * run에 화면의 변경 요청을 전달합니다. 같은 훅 인스턴스의 중복 실행을 막고 reject된 Error를 현재 화면의 error로 표시합니다.
 * action은 서버 처리와 필요한 목록 갱신을 끝낸 뒤 resolve해야 합니다. 실패를 { ok: false }로 resolve하면 UI가 성공으로 판단하므로 어댑터에서 reject로 변환합니다.
 */

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
