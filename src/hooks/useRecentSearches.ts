import { useState } from 'react';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 콘텐츠 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  return {
    recentSearches,
    removeRecentSearch: (query: string) =>
      setRecentSearches((items) => items.filter((item) => item !== query)),
    clearRecentSearches: () => setRecentSearches([]),
  };
}
