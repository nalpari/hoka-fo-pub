'use client';

import { useState } from 'react';
import type { Product } from '@/mocks/products';
import type { CartItem } from '@/shared/types/cart';
import { ColorSelector } from '@/shared/components/organisms/Product/ProductPurchasePanel/ColorSelector';
import { DeliveryBenefits } from '@/shared/components/organisms/Product/ProductPurchasePanel/DeliveryBenefits';
import { LaunchNotice } from '@/shared/components/organisms/Product/ProductPurchasePanel/LaunchNotice';
import { ProductPurchaseSummary } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductPurchaseSummary';
import { QuantityStepper } from '@/shared/components/organisms/Product/ProductPurchasePanel/QuantityStepper';
import { SizeSelector } from '@/shared/components/organisms/Product/ProductPurchasePanel/SizeSelector';
import { WidthSelector } from '@/shared/components/organisms/Product/ProductPurchasePanel/WidthSelector';
import { PurchaseActions } from '@/shared/components/organisms/Product/ProductPurchasePanel/PurchaseActions';
import { css } from 'styled-system/css';

type ProductPurchasePanelProps = {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onOrder: () => void;
  onOpenSizeGuide?: () => void;
  onViewReviews: () => void;
};
const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;

function getWidthOptions(product: Product, color: string) {
  return (
    product.colorOptions?.find((option) => option.color === color)?.widths ?? [
      { label: product.width, sizes: product.sizes, soldOut: product.soldOut },
    ]
  );
}

export function ProductPurchasePanel({
  product,
  onAddToCart,
  onOrder,
  onOpenSizeGuide,
  onViewReviews,
}: ProductPurchasePanelProps) {
  const [color, setColor] = useState(product.colors[0] ?? '');
  const [width, setWidth] = useState<string>(
    () => getWidthOptions(product, product.colors[0] ?? '')[0]?.label ?? '',
  );
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [selectionError, setSelectionError] = useState('');
  const addToCart = (order = false) => {
    if (!color || !size) {
      setSelectionError(!color ? '색상을 선택해 주세요.' : '사이즈를 선택해 주세요.');
      return;
    }
    setSelectionError('');
    onAddToCart({ id: product.id, color, width, size, quantity });
    if (order) onOrder();
  };

  return (
    <article
      id="product-purchase"
      className={css({
        position: { base: 'sticky', _mobile: 'static' },
        top: '96px',
        alignSelf: 'start',
      })}
    >
      <ProductPurchaseSummary onViewReviews={onViewReviews} product={product} />
      {product.launchStatus === 'COMING' && <LaunchNotice status={product.launchStatus} />}
      <strong className={css({ display: 'block', my: '20px', fontSize: '26px' })}>
        {won(product.price)}
      </strong>
      <hr />
      <WidthSelector
        onChange={(nextWidth) => {
          setWidth(nextWidth);
          setSize('');
          setSelectionError('');
        }}
        value={width}
        widths={getWidthOptions(product, color).map((option) => option.label)}
      />
      <ColorSelector
        colors={product.colors}
        image={product.primaryImage}
        onChange={(nextColor) => {
          setColor(nextColor);
          setWidth(getWidthOptions(product, nextColor)[0]?.label ?? '');
          setSize('');
          setSelectionError('');
        }}
        value={color}
      />
      <SizeSelector
        onChange={(nextSize) => {
          setSize(nextSize);
          setSelectionError('');
        }}
        onOpenGuide={onOpenSizeGuide}
        sizes={
          getWidthOptions(product, color).find((option) => option.label === width)?.sizes ?? []
        }
        soldOut={
          getWidthOptions(product, color).find((option) => option.label === width)?.soldOut ?? []
        }
        value={size}
      />
      {selectionError && (
        <p className={css({ m: '-12px 0 18px', color: '#f95050', fontSize: '14px' })} role="alert">
          {selectionError}
        </p>
      )}
      <QuantityStepper onChange={setQuantity} value={quantity} />
      <PurchaseActions
        onAddToCart={() => addToCart()}
        onOrder={() => addToCart(true)}
        onWishChange={setWish}
        wish={wish}
      />
      <DeliveryBenefits />
      <p className={css({ color: 'var(--color-text-muted)', fontSize: '12px' })}>
        실제 결제와 주문 전송은 연결하지 않은 데모입니다.
      </p>
    </article>
  );
}
