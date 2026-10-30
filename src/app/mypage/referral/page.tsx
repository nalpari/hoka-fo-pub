'use client';

/**
 * [개발팀 바인딩]
 * MyPageDataContext.overview.item의 referralCode/referralCount/referralRewards를 사용합니다.
 * 코드 발급·추천 인정·리워드 집계는 서버 책임입니다. 완료 인원과 적립값은 같은 기준 시점의 요약 응답으로 전달합니다.
 */

import { useRoutePreview } from '@/context/RoutePreview';

import { RouteContent, routePreviewComponents } from './_components/ReferralContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
