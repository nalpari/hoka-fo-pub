import { css } from 'styled-system/css';
import type { Product } from '@/mocks/products';
import { ProductDetailContent } from '@/shared/features/product/ProductDetailContent';
import { ProductDetailHeader } from '@/shared/features/product/ProductDetailHeader';
import { ProductDetailSupport } from '@/shared/features/product/ProductDetailSupport';

const styles = {
  root: css({
    position: 'sticky',
    top: '104px',
    alignSelf: 'start',
    px: '4',
    _mobile: { position: 'static', px: '4', pt: '8' },
  }),
  support: css({ display: 'none', _mobile: { display: 'block' } }),
};

type ProductDetailPanelProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  wish: boolean;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onOpenSizeGuide: () => void;
  onAddToCart: () => void;
  onOrder: () => void;
  onWishChange: () => void;
};

export function ProductDetailPanel({
  product,
  gallery,
  color,
  width,
  size,
  error,
  wish,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onOpenSizeGuide,
  onAddToCart,
  onOrder,
  onWishChange,
}: ProductDetailPanelProps) {
  return (
    <article className={styles.root}>
      <ProductDetailHeader onWishChange={onWishChange} product={product} wish={wish} />
      <ProductDetailContent
        color={color}
        error={error}
        gallery={gallery}
        onAddToCart={onAddToCart}
        onColorChange={onColorChange}
        onOpenSizeGuide={onOpenSizeGuide}
        onOrder={onOrder}
        onSizeChange={onSizeChange}
        onWidthChange={onWidthChange}
        product={product}
        size={size}
        width={width}
      />
      <div className={styles.support}>
        <ProductDetailSupport />
      </div>
    </article>
  );
}
