import type { ComponentProps } from 'react';
import { RoutePreviewProvider } from '@/context/RoutePreview';

import Page from '@/app/products/[id]/page';
import type {
  InquiryBoard as InquiryBoardContract,
  ProductColorSelector as ProductColorSelectorContract,
  ProductInquiryLink as ProductInquiryLinkContract,
  ProductSelectedOptions as ProductSelectedOptionsContract,
  ProductTechSpecs as ProductTechSpecsContract,
} from '@/types/component-contracts/app-products-id-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function InquiryBoard(props: ComponentProps<typeof InquiryBoardContract> & object) {
  return (
    <RoutePreviewProvider target="InquiryBoard" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function ProductInquiryLink(
  props: ComponentProps<typeof ProductInquiryLinkContract> & object,
) {
  return (
    <RoutePreviewProvider target="ProductInquiryLink" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function ProductColorSelector(
  props: ComponentProps<typeof ProductColorSelectorContract> & object,
) {
  return (
    <RoutePreviewProvider target="ProductColorSelector" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function ProductSelectedOptions(
  props: ComponentProps<typeof ProductSelectedOptionsContract> & object,
) {
  return (
    <RoutePreviewProvider target="ProductSelectedOptions" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function ProductTechSpecs(props: ComponentProps<typeof ProductTechSpecsContract> & object) {
  return (
    <RoutePreviewProvider target="ProductTechSpecs" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
