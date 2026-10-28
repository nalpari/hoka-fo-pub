import type { ComponentProps } from 'react';
import { RoutePreviewProvider } from '@/context/RoutePreview';

import Page from '@/app/mypage/coupons/page';
import type { CouponManager as CouponManagerContract } from '@/types/component-contracts/app-mypage-coupons-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function CouponManager(props: ComponentProps<typeof CouponManagerContract> & object) {
  return (
    <RoutePreviewProvider target="CouponManager" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
