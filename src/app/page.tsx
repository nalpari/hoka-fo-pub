'use client';

import { HomeLayout } from '@/components/features/home/HomeLayout';
import { usePlatform } from '@/context/platform';
import { HomeBestSellerSection } from '@/components/features/home/HomeBestSellerSection';
import { HomeCategorySection } from '@/components/features/home/HomeCategorySection';
import { HomeExploreSection } from '@/components/features/home/HomeExploreSection';
import { HomeHeroSection } from '@/components/features/home/HomeHeroSection';
import { HomeShoeFinderSection } from '@/components/features/home/HomeShoeFinderSection';

/** 홈의 주요 프로모션과 상품 영역을 구성합니다. (Composes the home promotions and product sections.) */
export default function Page() {
  const platform = usePlatform();
  return (
    <HomeLayout platform={platform}>
      <HomeHeroSection platform={platform} />
      <HomeCategorySection platform={platform} />
      <HomeBestSellerSection />
      <HomeExploreSection />
      <HomeShoeFinderSection platform={platform} />
    </HomeLayout>
  );
}
