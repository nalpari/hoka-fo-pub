import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import { usePlatform } from '@/shared/context/platform';
import { HomeBestSellerSection } from './HomeBestSellerSection';
import { HomeCategorySection } from './HomeCategorySection';
import { HomeExploreSection } from './HomeExploreSection';
import { HomeHeroSection } from './HomeHeroSection';
import { HomeShoeFinderSection } from './HomeShoeFinderSection';

const home = css({
  overflow: 'hidden',
  color: 'var(--color-text-primary)',
  bg: 'var(--color-surface-default)',
  fontFamily: 'var(--font-family-base)',
  pb: '24',
  _mobile: {
    pb: '18',
  },
});

export function HomePage() {
  const platform = usePlatform();
  return (
    <main className={`${home} home-page-${platform}`}>
      <VStack alignItems="flex-start" gap={{ base: '112px', _mobile: '72px' }}>
        <HomeHeroSection platform={platform} />
        <HomeCategorySection platform={platform} />
        <HomeBestSellerSection />
        <HomeExploreSection />
        <HomeShoeFinderSection platform={platform} />
      </VStack>
    </main>
  );
}
