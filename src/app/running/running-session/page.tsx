'use client';

import { RunningSessionPage } from '@/components/running-session/RunningSessionPage';

/** [ 개발팀 바인딩 ] 현재 페이지는 RunningSessionPage의 기본 세션 fixture를 표시하고 필터만 로컬로 처리합니다. 실제 목록 연결 소유자가 해당 컴포넌트의 sessions에 표시 데이터를 제공하고 요청·pending/error·재시도와 응답 갱신 계약을 별도로 구현해야 합니다. 페이지 자체는 임의의 미리보기 props를 받지 않습니다. */

/** 러닝 세션 목록의 기본 라우트 화면을 표시합니다. (Displays the default running session list route.) */
export default function Page() {
  return <RunningSessionPage />;
}
