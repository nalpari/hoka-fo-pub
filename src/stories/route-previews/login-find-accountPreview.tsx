import type { ComponentProps } from 'react';
import { RoutePreviewProvider } from '@/context/RoutePreview';

import Page from '@/app/login/find-account/page';
import type { IdConfirmationModal as IdConfirmationModalContract } from '@/types/component-contracts/app-login-find-account-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function IdConfirmationModal(
  props: ComponentProps<typeof IdConfirmationModalContract> & object,
) {
  return (
    <RoutePreviewProvider target="IdConfirmationModal" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
