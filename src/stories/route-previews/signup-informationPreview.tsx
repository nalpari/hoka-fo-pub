import type { ComponentProps } from 'react';

import Page from '@/app/signup/information/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type {
  MarketingConsentSummaryModal as MarketingConsentSummaryModalContract,
  RegistrationContent as RegistrationContentContract,
  RegistrationMarketingConsentSummaryModal as RegistrationMarketingConsentSummaryModalContract,
} from '@/types/component-contracts/app-signup-information-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function MarketingConsentSummaryModal(
  props: ComponentProps<typeof MarketingConsentSummaryModalContract> & object,
) {
  return (
    <RoutePreviewProvider target="MarketingConsentSummaryModal" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function RegistrationMarketingConsentSummaryModal(
  props: ComponentProps<typeof RegistrationMarketingConsentSummaryModalContract> & object,
) {
  return (
    <RoutePreviewProvider target="RegistrationMarketingConsentSummaryModal" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function RegistrationContent(
  props: ComponentProps<typeof RegistrationContentContract> & object,
) {
  return (
    <RoutePreviewProvider target="RegistrationContent" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
