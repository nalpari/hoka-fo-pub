import { css } from 'styled-system/css';
import { HomeCarouselSection } from '@/components/common/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';
import type { Product } from '@/mocks/products';
import type { Platform } from '@/lib/device';
import { Box } from 'styled-system/jsx';

const mobileSlide = css({
  w: '176px!',
  '& > *': { w: '100%' },
});

type RunClubRecommendationsProps = { products: Product[]; platform: Platform };

export function RunClubRecommendations({ products, platform }: RunClubRecommendationsProps) {
  return (
    <Box as="section" py="72px" overflow="hidden" _mobile={{ py: '10' }}>
      <HomeCarouselSection
        title="로드 러닝 Essential"
        titleVariant="heading7"
        itemCount={products.length}
        platform={platform}
        slideClassName={platform === 'mobile' ? mobileSlide : undefined}
        desktopCenteredItemCount={5}
        desktopItemGutter={16}
        mobileItemGutter={8}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </HomeCarouselSection>
    </Box>
  );
}
