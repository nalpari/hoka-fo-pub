'use client';

import { useShop } from '@/context/ShopShell';

import { useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { products } from '@/mocks/products';
import { ProductDetailLayout } from '@/components/features/product/ProductDetailLayout';
import type { CartItem } from '@/types/cart';
import { NotFoundPage } from '@/components/features/not-found/NotFoundPage';
import { ProductDetailImageViewer } from '@/components/features/product/ProductDetailImageViewer';
import { ProductDetailMedia } from '@/components/features/product/ProductDetailMedia';
import { ProductDetailPanel } from '@/components/features/product/ProductDetailPanel';
import { ProductDetailFooter } from '@/components/features/product/ProductDetailFooter';
import { ProductSelectedOptions } from '@/components/features/product/ProductSelectedOptions';
import { productWidthOptions } from '@/components/features/product/ProductVariantSelectors';

/** 상품 옵션 누적 선택과 구매 및 상세 보기를 관리합니다. (Manages accumulated product selections, purchase actions, and detail viewing.) */
export default function Page() {
  const { add: onAddToCart } = useShop();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((item) => item.id === id);
  const initialColor = product?.colorThumbnails?.[0]?.label ?? product?.colors[0] ?? '';
  const [color, setColor] = useState(initialColor);
  const [width, setWidth] = useState(
    product ? (productWidthOptions(product, initialColor)[0]?.label ?? '') : '',
  );
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
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
    if (!selectedItems.length) {
      setError('사이즈를 선택해 주세요.');
      document
        .getElementById('product-size')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setError('');
    selectedItems.forEach(onAddToCart);
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
        selectedOptions={
          <ProductSelectedOptions
            items={selectedItems}
            unitPrice={product.price}
            onQuantityChange={(index, quantity) => {
              if (!Number.isSafeInteger(quantity) || quantity < 1) return;
              setSelectedItems((items) =>
                items.map((item, itemIndex) =>
                  itemIndex === index ? { ...item, quantity } : item,
                ),
              );
            }}
            onRemove={(index) =>
              setSelectedItems((items) => items.filter((_, itemIndex) => itemIndex !== index))
            }
          />
        }
        color={color}
        error={error}
        gallery={gallery}
        onAddToCart={() => submit(false)}
        onColorChange={(nextColor) => {
          setColor(nextColor);
          setWidth(productWidthOptions(product, nextColor)[0]?.label ?? '');
          setError('');
        }}
        onOrder={() => submit(true)}
        onSizeChange={(nextSize) => {
          const selectedWidth = productWidthOptions(product, color).find(
            (option) => option.label === width,
          );
          if (!selectedWidth?.sizes.includes(nextSize) || selectedWidth.soldOut.includes(nextSize))
            return;
          setSelectedItems((items) => {
            const exists = items.some(
              (item) => item.color === color && item.width === width && item.size === nextSize,
            );
            return exists
              ? items.map((item) =>
                  item.color === color && item.width === width && item.size === nextSize
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
                )
              : [...items, { id: product.id, color, width, size: nextSize, quantity: 1 }];
          });
          setError('');
        }}
        onWidthChange={(nextWidth) => {
          setWidth(nextWidth);
          setError('');
        }}
        onWishChange={() => setWish(!wish)}
        product={product}
        size=""
        width={width}
        wish={wish}
      />
    </ProductDetailLayout>
  );
}
