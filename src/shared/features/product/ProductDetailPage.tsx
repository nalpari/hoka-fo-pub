'use client';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/mocks/products';
import { ProductDetailLayout } from '@/shared/features/product/ProductDetailLayout';
import type { CartItem } from '@/shared/types/cart';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';
import { ProductDetailImageViewer } from './ProductDetailImageViewer';
import { ProductDetailMedia } from '@/shared/features/product/ProductDetailMedia';
import { ProductDetailPanel } from '@/shared/features/product/ProductDetailPanel';
import { ProductDetailFooter } from '@/shared/features/product/ProductDetailFooter';
import { productWidthOptions } from '@/shared/features/product/ProductVariantSelectors';

export function ProductDetailPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((item) => item.id === id);
  const initialColor = product?.colorThumbnails?.[0]?.label ?? product?.colors[0] ?? '';
  const [color, setColor] = useState(initialColor);
  const [width, setWidth] = useState(
    product ? (productWidthOptions(product, initialColor)[0]?.label ?? '') : '',
  );
  const [size, setSize] = useState('');
  const [wish, setWish] = useState(false);
  const [error, setError] = useState('');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const viewerOrigin = useRef<{ element: HTMLElement | null; scrollY: number } | null>(null);
  const selectedColor = product?.colorThumbnails?.find((option) => option.label === color);
  const gallery = selectedColor
    ? selectedColor.galleryImages?.length
      ? selectedColor.galleryImages
      : [selectedColor.image]
    : product?.galleryImages?.length
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
    if (order) router.push('/checkout');
  };

  return (
    <ProductDetailLayout
      isViewing={viewerIndex !== null}
      viewer={
        viewerIndex !== null && (
          <ProductDetailImageViewer
            images={gallery}
            productName={product.name}
            initialIndex={viewerIndex}
            onClose={() => {
              setViewerIndex(null);
              requestAnimationFrame(() => {
                viewerOrigin.current?.element?.focus({ preventScroll: true });
                window.scrollTo({ top: viewerOrigin.current?.scrollY ?? 0, behavior: 'instant' });
              });
            }}
          />
        )
      }
      footer={
        <ProductDetailFooter
          recommendations={recommendations}
          onAddToCart={() => submit(false)}
          onOrder={() => submit(true)}
        />
      }
    >
      <ProductDetailMedia
        key={`${product.id}-${color}`}
        images={gallery}
        product={product}
        productName={product.name}
        onOpenImage={(index) => {
          viewerOrigin.current = {
            element: document.activeElement as HTMLElement | null,
            scrollY: window.scrollY,
          };
          setViewerIndex(index);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
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
    </ProductDetailLayout>
  );
}
