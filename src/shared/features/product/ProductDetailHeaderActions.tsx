import { css } from 'styled-system/css';
import { Flex, HStack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Button } from '@/shared/components/atoms/Button/Button';
import { RatingStars } from '@/shared/components/atoms/RatingStars/RatingStars';
import { Wishlist } from '@/shared/components/atoms/Wishlist/Wishlist';
import { ShareButton } from '@/shared/components/atoms/ShareButton/ShareButton';

const styles = {
  reviewLink: css({
    borderColor: 'var(--color-black-60)',
    color: 'var(--color-black-60)',
    '--color-action-underline-color': 'var(--color-black-60)',
    '--button-border-color-hover': 'var(--color-black-60)',
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
  return (
    <Flex alignItems="center" justifyContent="space-between" w="full">
      <HStack gap="10px">
        <RatingStars aria-label={`평점 ${product.rating}점`} value={product.rating} />
        <Button
          className={styles.reviewLink}
          variant="link"
          onClick={() =>
            document.getElementById('product-information')?.scrollIntoView({ behavior: 'smooth' })
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
