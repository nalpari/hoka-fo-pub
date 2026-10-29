/**
 * [개발팀 바인딩]
 * 현재 최근 검색어는 이 브라우저의 localStorage에 최대 10개 보관합니다. 인기/자동완성 검색어 API와 별개입니다.
 * 회원별 서버 기록을 붙일 경우 이 상태 소유자에서 조회/추가/삭제/전체삭제 결과를 연결하고 로그인 전 브라우저 기록의 병합 정책을 결정해야 합니다.
 */

import { useState } from 'react';

const storageKey = 'hoka-recent-searches';

const readRecentSearches = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(stored)
      ? stored.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
};

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);

  const persistRecentSearches = (next: string[]) => {
    setRecentSearches(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // Storage can be blocked or full; keep the in-memory list.
    }
  };

  const addRecentSearch = (query: string) => {
    persistRecentSearches([query, ...recentSearches.filter((item) => item !== query)].slice(0, 10));
  };

  const removeRecentSearch = (query: string) => {
    persistRecentSearches(recentSearches.filter((item) => item !== query));
  };

  const clearRecentSearches = () => persistRecentSearches([]);

  return { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches };
}
