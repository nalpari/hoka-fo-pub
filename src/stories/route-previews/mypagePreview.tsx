import type { ComponentProps } from 'react';
import Page from '@/app/mypage/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type { LogoutDialog as LogoutDialogContract } from '@/types/component-contracts/app-mypage-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function LogoutDialog(props: ComponentProps<typeof LogoutDialogContract> & object) {
  return (
    <RoutePreviewProvider target="LogoutDialog" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
