import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ProductPurchaseActions } from '@/shared/features/product/ProductPurchaseActions';
import { ProductVariantSelectors } from '@/shared/features/product/ProductVariantSelectors';

const styles = {
  info: css({
    mt: '7',
    p: '5',
    bg: 'var(--color-black-10)',
    '& h2': { mb: '3', fontSize: '16' /* 기존 17px */, fontWeight: 'black' },
    '& h3': { mt: '5', mb: '2', fontSize: '12', fontWeight: 'bold' },
    '& p': { fontSize: '12', lineHeight: 'body' },
  }),
  specs: css({
    display: 'grid',
    gridTemplateColumns: '76px 1fr',
    gap: '1.5 3',
    mt: '5',
    fontSize: '12',
    '& dt': { fontWeight: 'bold' },
  }),
};

type ProductDetailContentProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onOpenSizeGuide: () => void;
  onAddToCart: () => void;
  onOrder: () => void;
};

export function ProductDetailContent({
  product,
  gallery,
  color,
  width,
  size,
  error,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onOpenSizeGuide,
  onAddToCart,
  onOrder,
}: ProductDetailContentProps) {
  return (
    <Flex direction="column" gap="5">
      <ProductVariantSelectors
        color={color}
        error={error}
        gallery={gallery}
        onColorChange={onColorChange}
        onOpenSizeGuide={onOpenSizeGuide}
        onSizeChange={onSizeChange}
        onWidthChange={onWidthChange}
        product={product}
        size={size}
        width={width}
      />
      <ProductPurchaseActions onAddToCart={onAddToCart} onOrder={onOrder} placement="inline" />
      <section className={styles.info} id="product-information">
        <h2>상품 정보</h2>
        <h3>어떤 날씨에도 무심함 있는 편안한 주행</h3>
        <p>{product.detailDescription}</p>
        <h3>새로운 특징</h3>
        <p>
          알갱한 발볼 부분의 돔이 지지력과 착화감이 개선된 새로운 라스트를 만나보실 수 있습니다.
        </p>
        <dl className={styles.specs}>
          <dt>컬러</dt>
          <dd>{color}</dd>
          <dt>스타일코드</dt>
          <dd>{product.styleCode}</dd>
          <dt>발볼 넓이</dt>
          <dd>{width}</dd>
        </dl>
      </section>
    </Flex>
  );
}
