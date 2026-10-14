import { HomeLayout } from '@/shared/features/home/HomeLayout';
import { usePlatform } from '@/shared/context/platform';
import { HomeBestSellerSection } from './HomeBestSellerSection';
import { HomeCategorySection } from './HomeCategorySection';
import { HomeExploreSection } from './HomeExploreSection';
import { HomeHeroSection } from './HomeHeroSection';
import { HomeShoeFinderSection } from './HomeShoeFinderSection';

export function HomePage() {
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
