/** 개발팀 적용: API DTO를 화면 모델로 변환하고 현재 조회 상태를 전달합니다. 실패 시 error와 재시도 함수를 유지합니다. */
export type BindingState = { pending?: boolean; error?: string; onRetry?: () => void };

/**
 * [개발팀 바인딩]
 * items는 현재 조회 결과(더보기 화면이면 누적 배열), totalCount는 전체 일치 건수, hasMore는 다음 페이지 존재 여부입니다.
 * onQueryChange는 UI 조건을 알립니다. 서비스 소유자가 페이지를 초기화하고 조회/취소/늦은 응답 무시를 처리합니다.
 * onLoadMore는 누적 상태 반영 뒤 resolve하고 실패는 reject합니다. pending/error/onRetry는 초기/추가 조회 상태를 함께 전달합니다.
 */
export type ListBinding<T, Q> = BindingState & {
  items: readonly T[];
  totalCount: number;
  hasMore: boolean;
  /** 페이지 번호를 표시할 때 실제 서버 페이지 정보를 전달합니다. 없으면 읽은 항목 수/전체 건수를 표시합니다. */
  pageInfo?: { current: number; total: number };
  /** useCallback 등으로 참조를 유지합니다. 요청 취소와 오래된 응답 무시는 조회 소유자가 처리합니다. */
  onQueryChange: (query: Q) => void;
  onLoadMore: () => void | Promise<void>;
};
