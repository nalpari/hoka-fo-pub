import { css } from 'styled-system/css';
import { Flex, HStack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Button } from '@/components/common/atoms/Button/Button';
import { RatingStars } from '@/components/common/atoms/RatingStars/RatingStars';
import { Wishlist } from '@/components/common/atoms/Wishlist/Wishlist';
import { ShareButton } from '@/components/common/atoms/ShareButton/ShareButton';
import { usePlatform } from '@/context/platform';

const styles = {
  reviewLink: css({
    borderColor: 'var(--color-text-subtle)',
    color: 'var(--color-text-subtle)',
    '--color-action-underline-color': 'var(--color-text-subtle)',
    '--button-border-color-hover': 'var(--color-text-subtle)',
  }),
  icons: css({
    display: 'flex',
    gap: '3',
    '& button': { fontSize: '24' /* 기존 25px */, lineHeight: 'hoka' },
  }),
};

type ProductDetailHeaderActionsProps = {
  product: Product;
  wish: boolean;
  onWishChange: () => void;
};

export function ProductDetailHeaderActions({
  product,
  wish,
  onWishChange,
}: ProductDetailHeaderActionsProps) {
  const platform = usePlatform();

  return (
    <Flex alignItems="center" justifyContent="space-between" w="full">
      <HStack gap="10px">
        <RatingStars aria-label={`평점 ${product.rating}점`} value={product.rating} />
        <Button
          className={styles.reviewLink}
          variant="link"
          onClick={() =>
            document
              .getElementById(platform === 'web' ? 'product-reviews' : 'product-information')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
          type="button"
          size="md"
        >
          {product.reviewCount}개 리뷰 보기
        </Button>
      </HStack>
      <HStack gap="2">
        <ShareButton size="24px" />
        <Wishlist active={wish} ariaLabel="관심상품" onActiveChange={onWishChange} />
      </HStack>
    </Flex>
  );
}
