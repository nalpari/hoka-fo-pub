import type { ComponentProps } from 'react';
import Page from '@/app/page';
import { RoutePreviewProvider } from '@/context/RoutePreview';
import type {
  Hero as HeroContract,
  HeroCopy as HeroCopyContract,
  HeroSlide as HeroSlideContract,
} from '@/types/component-contracts/app-page';

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function Hero(props: ComponentProps<typeof HeroContract> & object) {
  return (
    <RoutePreviewProvider target="Hero" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function HeroCopy(props: ComponentProps<typeof HeroCopyContract> & object) {
  return (
    <RoutePreviewProvider target="HeroCopy" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}

/** 페이지 내부 구성을 기존 스토리 입력에 연결합니다. (Connects a page-local composition to existing story inputs.) */
export function HeroSlide(props: ComponentProps<typeof HeroSlideContract> & object) {
  return (
    <RoutePreviewProvider target="HeroSlide" props={props}>
      <Page />
    </RoutePreviewProvider>
  );
}
