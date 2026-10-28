import type { ComponentProps } from 'react';
import Page from '@/app/signup/verify/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type { IdentityVerificationContent as IdentityVerificationContentContract } from '@/types/component-contracts/app-signup-verify-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function IdentityVerificationContent(
  props: ComponentProps<typeof IdentityVerificationContentContract> & object,
) {
  return (
    <RoutePreviewProvider target="IdentityVerificationContent" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
