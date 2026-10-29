'use client';

/**
 * [개발팀 바인딩]
 * notify는 Provider 어댑터의 안정적인 콜백이어야 합니다. query는 JSON 직렬화 가능한 조건만 전달합니다.
 * 이 훅은 조회 조건 알림만 담당합니다. AbortController/페이지 초기화/응답 순서 보장/캐싱은 실제 조회 소유자에서 처리합니다.
 */

import { useEffect } from 'react';

/** 직렬화 가능한 화면 조회 조건을 서비스 소유자에게 전달합니다. (Notifies the service owner of serializable view query changes.) */
export function useBindingQuery<Q>(notify: ((query: Q) => void) | undefined, query: Q) {
  const key = JSON.stringify(query);
  useEffect(() => {
    notify?.(JSON.parse(key) as Q);
  }, [notify, key]);
}
