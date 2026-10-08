import { Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ProductInformation } from '@/shared/features/product/ProductInformation';
import { ProductPurchaseActions } from '@/shared/features/product/ProductPurchaseActions';
import { ProductVariantSelectors } from '@/shared/features/product/ProductVariantSelectors';

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
    <Stack gap="10">
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
      <ProductInformation
        id="product-information"
        sections={[
          { title: '어떤 날씨에도 무심함 있는 편안한 주행', content: product.detailDescription },
          {
            title: '새로운 특징',
            content:
              '알갱한 발볼 부분의 돔이 지지력과 착화감이 개선된 새로운 라스트를 만나보실 수 있습니다.',
          },
        ]}
        specifications={[
          { label: '컬러', value: color },
          { label: '스타일코드', value: product.styleCode },
          { label: '발볼 넓이', value: width },
        ]}
      />
    </Stack>
  );
}
