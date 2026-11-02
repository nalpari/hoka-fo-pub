'use client';
import { useRoutePreview } from '@/context/RoutePreview';

import { routePreviewComponents } from './_components/FindAccountContent';
import { FindAccountStatePreview } from './_components/FindAccountStatePreview';
/** 계정 찾기의 기본 입력을 표시합니다. (Displays the initial account recovery form.) */
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 회원·인증 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <FindAccountStatePreview state="initial" />;
}
