'use client';

import { createContext, type ReactNode } from 'react';

import type { FaqCategory, FaqEntry } from '@/app/support/faq/faq.data';
import type { BindingState, ListBinding } from '@/types/binding';

export type NoticeView = { id: string; title: string; date: string; body: ReactNode };

export type TermsVersion = { id: string; label: string };

export type TermsDocumentView = {
  id: string;
  version: string;
  effectiveAt: string;
  body: ReactNode;
};

/** 개발팀 적용: BO 응답의 HTML은 연결 어댑터에서 프로젝트의 안전한 렌더러로 변환해 body로 전달합니다. 화면은 원본 HTML을 직접 실행하지 않습니다. */
export type TermsBinding = BindingState & {
  versions: readonly TermsVersion[];
  document: TermsDocumentView | null;
  onQueryChange: (query: { kind: 'privacy' | 'terms'; versionId: string }) => void;
};

/** 목록은 서버가 검색·정렬한 현재 페이지/누적 결과입니다. 전체 건수와 hasMore를 실제 응답으로 갱신합니다. */
/**
 * [개발팀 바인딩]
 * faq는 { category, query } 변경을 서버 조회에 연결합니다. items는 이미 필터링한 현재 누적 결과이며 totalCount/hasMore는 서버 응답입니다.
 * 공지 목록의 id와 상세 onQueryChange({ id })를 같은 서버 식별자로 매핑합니다. 없는 id는 item: null로 전달하며 첫 공지로 대체하지 않습니다.
 * terms는 이용약관/개인정보처리방침을 구분합니다. versions의 id는 조회용, label은 표시용이며 document.body/version/effectiveAt를 함께 갱신합니다.
 * BO HTML은 서비스 어댑터에서 안전한 렌더링 노드로 변환합니다. 신뢰하지 않은 HTML을 이 화면에 직접 실행시키지 않습니다.
 * 조회 오류는 error/onRetry로, 조회 중은 pending으로 전달합니다. 조회 콜백 참조를 유지하고 이전 검색 응답 폐기는 요청 소유자가 처리합니다.
 */
export const SupportContentContext = createContext<{
  faq?: ListBinding<FaqEntry & { id: string }, { category: FaqCategory; query: string }>;
  notices?: ListBinding<NoticeView, Record<string, never>>;
  notice?: BindingState & {
    item: NoticeView | null;
    onQueryChange: (query: { id: string }) => void;
  };
  terms?: { privacy: TermsBinding; terms: TermsBinding };
}>({});
