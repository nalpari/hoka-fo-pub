'use client';

import { useRoutePreview } from '@/context/RoutePreview';

import { FindAccountRouteContent, routePreviewComponents } from './_components/FindAccountContent';

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <FindAccountRouteContent />;
}
