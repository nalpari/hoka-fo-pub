import type { ComponentProps } from 'react';

import Page from '@/app/mypage/referral/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type { MetricGrid as MetricGridContract } from '@/types/component-contracts/app-mypage-referral-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function MetricGrid(props: ComponentProps<typeof MetricGridContract> & object) {
  return (
    <RoutePreviewProvider target="MetricGrid" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
