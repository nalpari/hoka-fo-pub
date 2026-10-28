import type { ComponentProps } from 'react';

import Page from '@/app/signup/terms/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type {
  SignupTermsContent as SignupTermsContentContract,
  TermsDialog as TermsDialogContract,
} from '@/types/component-contracts/app-signup-terms-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function TermsDialog(props: ComponentProps<typeof TermsDialogContract> & object) {
  return (
    <RoutePreviewProvider target="TermsDialog" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function SignupTermsContent(
  props: ComponentProps<typeof SignupTermsContentContract> & object,
) {
  return (
    <RoutePreviewProvider target="SignupTermsContent" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
