import { useState } from 'react';

/** [ 개발팀 바인딩 ] 패널을 열 때 전달된 예시 목록으로 시작한다. 개별·전체 삭제는 열린 패널에서만 반영한다. */
export function useRecentSearches(initialSearches: readonly string[] = []) {
  const [recentSearches, setRecentSearches] = useState(() => [...initialSearches]);
  return {
    recentSearches,
    removeRecentSearch: (query: string) =>
      setRecentSearches((items) => items.filter((item) => item !== query)),
    clearRecentSearches: () => setRecentSearches([]),
  };
}
