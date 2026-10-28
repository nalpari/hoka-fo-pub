import type { ComponentProps } from 'react';

import Page from '@/app/support/faq/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type { FaqList as FaqListContract } from '@/types/component-contracts/app-support-faq-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function FaqList(props: ComponentProps<typeof FaqListContract> & object) {
  return (
    <RoutePreviewProvider target="FaqList" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
