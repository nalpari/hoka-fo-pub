import type { ComponentProps } from 'react';
import { RoutePreviewProvider } from '@/context/RoutePreview';

import Page from '@/app/login/find-account/password-reset/page';
import type { PasswordResetCompleteModal as PasswordResetCompleteModalContract } from '@/types/component-contracts/app-login-find-account-password-reset-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function PasswordResetCompleteModal(
  props: ComponentProps<typeof PasswordResetCompleteModalContract> & object,
) {
  return (
    <RoutePreviewProvider target="PasswordResetCompleteModal" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
