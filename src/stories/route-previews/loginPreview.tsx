import type { ComponentProps } from 'react';

import Page from '@/app/login/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type { LoginContent as LoginContentContract } from '@/types/component-contracts/app-login-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function LoginContent(props: ComponentProps<typeof LoginContentContract> & object) {
  return (
    <RoutePreviewProvider target="LoginContent" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
