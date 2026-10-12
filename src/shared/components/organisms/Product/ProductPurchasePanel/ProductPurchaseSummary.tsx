import type { Product } from '@/mocks/products';
import { ProductSpecs } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductSpecs';
import { Button } from '@/shared/components/atoms/Button/Button';
import { RatingStars } from '@/shared/components/atoms/RatingStars/RatingStars';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type ProductPurchaseSummaryProps = {
  product: Product;
  onViewReviews: () => void;
};

/** 구매 패널 상단에 표시되는 상품 기본 정보와 핵심 스펙입니다. */
export function ProductPurchaseSummary({ product, onViewReviews }: ProductPurchaseSummaryProps) {
  return (
    <header>
      <small>
        {product.category} · {product.gender}
      </small>
      <h1>{product.name}</h1>
      <Typography as="p" variant="body3" tone="subtle">
        일상과 움직임을 위한 가벼운 제품입니다.
      </Typography>
      <Flex alignItems="center" gap="3" mt="3">
        <span>
          <RatingStars aria-label={`평점 ${product.rating}점`} value={product.rating} />
          <Typography
            as="strong"
            variant="body4"
            weight="bold"
            aria-hidden="true"
            className={css({ ml: '1' })}
          >
            {product.rating.toFixed(1)}
          </Typography>
          <Typography variant="body4" aria-hidden="true">
            /5
          </Typography>
        </span>
        <Button
          className={css({
            p: '0',
            border: '0',
            color: 'var(--color-text-tertiary)',
            textDecoration: 'underline',
          })}
          onClick={onViewReviews}
        >
          <Typography variant="body4" weight="inherit">
            {product.reviewCount}개 리뷰 보기
          </Typography>
        </Button>
      </Flex>
      <ProductSpecs {...product} />
    </header>
  );
}
