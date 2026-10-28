import type { ComponentProps } from 'react';
import { RoutePreviewProvider } from '@/context/RoutePreview';

import Page from '@/app/signup/verify/phone/page';
import type { AlreadyRegisteredModal as AlreadyRegisteredModalContract } from '@/types/component-contracts/app-signup-verify-phone-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function AlreadyRegisteredModal(
  props: ComponentProps<typeof AlreadyRegisteredModalContract> & object,
) {
  return (
    <RoutePreviewProvider target="AlreadyRegisteredModal" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
