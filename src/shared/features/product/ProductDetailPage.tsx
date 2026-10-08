'use client';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from 'styled-system/css';
import { products } from '@/mocks/products';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import type { CartItem } from '@/shared/types/cart';
import { usePlatform } from '@/shared/context/platform';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';
import { ProductDetailMedia } from '@/shared/features/product/ProductDetailMedia';
import { ProductDetailPanel } from '@/shared/features/product/ProductDetailPanel';
import { ProductPurchaseActions } from '@/shared/features/product/ProductPurchaseActions';
import { ProductDetailRecommend } from '@/shared/features/product/ProductDetailRecommend';
import { productWidthOptions } from '@/shared/features/product/ProductVariantSelectors';

const styles = {
  page: css({ maxW: '1532px', mx: 'auto', pt: '14', pb: '24', _mobile: { p: '0 0 24' } }),
  layout: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) minmax(340px, .85fr)',
    gap: '8',
    _mobile: { display: 'block' },
  }),
};

export function ProductDetailPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const { pathname } = useLocation();
  const platform = usePlatform();
  const product = products.find((item) => pathname.endsWith(item.id));
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [width, setWidth] = useState(
    product ? (productWidthOptions(product, product.colors[0] ?? '')[0]?.label ?? '') : '',
  );
  const [size, setSize] = useState('');
  const [wish, setWish] = useState(false);
  const [error, setError] = useState('');
  const gallery = product?.galleryImages?.length
    ? product.galleryImages
    : product
      ? [product.primaryImage, product.hoverImage]
      : [];
  const recommendations = products.filter((item) => item.id !== product?.id).slice(0, 6);

  if (!product) return <NotFoundPage />;

  const submit = (order: boolean) => {
    if (!size) {
      setError('사이즈를 선택해 주세요.');
      document
        .getElementById('product-size')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setError('');
    onAddToCart({ id: product.id, color, width, size, quantity: 1 });
    if (order) location.assign('/checkout');
  };

  return (
    <ContentLayout className={styles.page}>
      <main className={styles.layout}>
        <ProductDetailMedia images={gallery} productName={product.name} />
        <ProductDetailPanel
          color={color}
          error={error}
          gallery={gallery}
          onAddToCart={() => submit(false)}
          onColorChange={(nextColor) => {
            setColor(nextColor);
            setWidth(productWidthOptions(product, nextColor)[0]?.label ?? '');
            setSize('');
            setError('');
          }}
          onOpenSizeGuide={() =>
            window.open(
              'https://www.hoka.com/',
              'shoe-size-guide',
              'popup=yes,width=900,height=1000,resizable=yes,scrollbars=yes',
            )
          }
          onOrder={() => submit(true)}
          onSizeChange={(nextSize) => {
            setSize(nextSize);
            setError('');
          }}
          onWidthChange={(nextWidth) => {
            setWidth(nextWidth);
            setSize('');
            setError('');
          }}
          onWishChange={() => setWish(!wish)}
          product={product}
          size={size}
          width={width}
          wish={wish}
        />
        <ProductDetailRecommend products={recommendations} />
      </main>
      {platform === 'mobile' && (
        <ProductPurchaseActions
          onAddToCart={() => submit(false)}
          onOrder={() => submit(true)}
          placement="fixed"
        />
      )}
    </ContentLayout>
  );
}
