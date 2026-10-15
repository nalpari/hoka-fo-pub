import { css } from 'styled-system/css';
import { HomeCarouselSection } from '@/shared/components/molecules/HomeCarouselSection/HomeCarouselSection';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import type { Product } from '@/mocks/products';
import type { Platform } from '@/shared/lib/device';
import { Box } from 'styled-system/jsx';

const styles = {
  rail: css({ overflow: 'visible!' }),
  slide: css({
    w: 'calc((100% - 64px) / 5 + 16px)!',
    '&:first-child, &:last-child': { w: 'calc((100% - 64px) / 5 + 8px)!' },
    _mobile: {
      w: '176px!',
      '&:first-child, &:last-child': { w: '176px!' },
      '& > *': { w: '100%' },
    },
  }),
};

type RunClubRecommendationsProps = { products: Product[]; platform: Platform };

export function RunClubRecommendations({ products, platform }: RunClubRecommendationsProps) {
  return (
    <Box as="section" py="72px" overflow="hidden" _mobile={{ py: '10' }}>
      <HomeCarouselSection
        title="로드 러닝 Essential"
        titleVariant="heading7"
        itemCount={products.length}
        platform={platform}
        slideClassName={styles.slide}
        desktopCenteredItemCount={5}
        desktopItemGutter={16}
        mobileItemGutter={8}
        railClassName={styles.rail}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="showcase" />
        ))}
      </HomeCarouselSection>
    </Box>
  );
}
