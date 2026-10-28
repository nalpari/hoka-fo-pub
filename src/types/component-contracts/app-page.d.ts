// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ReactNode } from 'react';
import { type Platform } from '@/context/platform';

import { type HomeShoeFinderCardVariant } from '@/app/homeContent';
/** 홈 콘텐츠의 공통 폭과 모바일 전용 타이포그래피 변수를 제공합니다. (Provides shared home content width and mobile type scale variables.) */
declare function HomeLayout({
  platform,
  children,
}: {
  platform: Platform;
  children: ReactNode;
}): import('react').JSX.Element;
declare function HomeBestSellerSection(): import('react').JSX.Element;
type HomeCategorySectionProps = {
  platform: Platform;
};
declare function HomeCategorySection({
  platform,
}: HomeCategorySectionProps): import('react').JSX.Element;
declare function HomeExploreSection(): import('react').JSX.Element;
type HeroCopyContent = {
  title: string;
  description: ReactNode;
};
type HeroCopyAction = {
  label: string;
  to: string;
};
type HeroCopyProps = {
  content: HeroCopyContent;
  actions: readonly HeroCopyAction[];
};
/** 홈 Hero의 제목·설명·행동 링크를 배치합니다. (Arranges the home hero title, description, and action links.) */
declare function HeroCopy({ content, actions }: HeroCopyProps): import('react').JSX.Element;
type HeroPaginationSlide = {
  id: string;
  title: string;
};
type HeroPaginationProps = {
  activeSlide: number;
  isProgressPaused: boolean;
  onSlideChange: (index: number) => void;
  progress: number;
  progressDuration: number;
  slides: readonly HeroPaginationSlide[];
};
declare function HeroPagination({
  activeSlide,
  isProgressPaused,
  onSlideChange,
  progress,
  progressDuration,
  slides,
}: HeroPaginationProps): import('react').JSX.Element | null;
type HeroSlideProps = {
  desktopImage: string;
  mobileImage: string;
  platform?: Platform;
};
/** One responsive, decorative background image in a Hero carousel track. */
declare function HeroSlide({
  desktopImage,
  mobileImage,
  platform,
}: HeroSlideProps): import('react').JSX.Element;
type HeroAction = HeroCopyAction;
type HeroContentSlide = HeroSlideProps & {
  actions: readonly HeroAction[];
  content: HeroCopyContent;
};
type HeroProps = {
  slides: readonly HeroContentSlide[];
  ariaLabel?: string;
  platform?: Platform;
};
declare function Hero({ ariaLabel, platform, slides }: HeroProps): import('react').JSX.Element;
type HomeHeroSectionProps = {
  platform: Platform;
};
declare function HomeHeroSection({ platform }: HomeHeroSectionProps): import('react').JSX.Element;
type HomeShoeFinderSectionProps = {
  platform: Platform;
  variant?: HomeShoeFinderCardVariant;
};
declare function HomeShoeFinderSection({
  platform,
  variant,
}: HomeShoeFinderSectionProps): import('react').JSX.Element;
/** 홈의 주요 프로모션과 상품 영역을 구성합니다. (Composes the home promotions and product sections.) */
export default function Page(): import('react').JSX.Element;
export {
  HomeLayout,
  HomeBestSellerSection,
  HomeCategorySection,
  HomeExploreSection,
  HeroCopy,
  type HeroCopyContent,
  type HeroCopyAction,
  type HeroCopyProps,
  HeroPagination,
  type HeroPaginationSlide,
  type HeroPaginationProps,
  HeroSlide,
  type HeroSlideProps,
  Hero,
  type HeroAction,
  type HeroContentSlide,
  type HeroProps,
  HomeHeroSection,
  HomeShoeFinderSection,
};
