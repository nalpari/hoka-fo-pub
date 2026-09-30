import type { Product } from '@/mocks/products';
import { ProductSpecs } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductSpecs';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

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
      <p className={css({ color: '#555', lineHeight: '1.6' })}>
        일상과 움직임을 위한 가벼운 제품입니다.
      </p>
      <Flex alignItems="center" gap="12px" mt="12px" fontSize="14px">
        <span aria-label={`평점 ${product.rating}점`}>
          ★★★★★ <strong className={css({ ml: '4px' })}>{product.rating.toFixed(1)}</strong>
          <span aria-hidden="true">/5</span>
        </span>
        <Button
          className={css({ p: '0', border: '0', color: 'var(--color-text-muted)', textDecoration: 'underline' })}
          onClick={onViewReviews}
        >
          {product.reviewCount}개 리뷰 보기
        </Button>
      </Flex>
      <ProductSpecs {...product} />
    </header>
  );
}
