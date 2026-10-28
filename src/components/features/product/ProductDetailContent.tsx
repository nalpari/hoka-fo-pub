import type { ReactNode } from 'react';
import { Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ProductInformation } from '@/components/features/product/ProductInformation';
import { ProductPurchaseActions } from '@/components/features/product/ProductPurchaseActions';
import { ProductVariantSelectors } from '@/components/features/product/ProductVariantSelectors';

type ProductDetailContentProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  selectedOptions: ReactNode;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onAddToCart: () => void;
  onOrder: () => void;
};

/** 상품 상세의 선택 정보와 콘텐츠를 배치합니다. (Arranges product detail selections and content.) */
export function ProductDetailContent({
  product,
  gallery,
  color,
  width,
  size,
  error,
  selectedOptions,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onAddToCart,
  onOrder,
}: ProductDetailContentProps) {
  const isClifton = product.styleCode === 'HOKADFG34S';

  return (
    <Stack gap="10">
      <ProductVariantSelectors
        color={color}
        error={error}
        gallery={gallery}
        onColorChange={onColorChange}
        onSizeChange={onSizeChange}
        onWidthChange={onWidthChange}
        product={product}
        size={size}
        width={width}
      />
      {selectedOptions}
      <ProductPurchaseActions onAddToCart={onAddToCart} onOrder={onOrder} placement="inline" />
      <ProductInformation
        id="product-information"
        sections={[
          { title: '어떤 날씨에도 쿠션감 있는 편안한 주행', content: product.detailDescription },
          ...(isClifton
            ? [
                {
                  title: '새로운 특징',
                  content:
                    '앞발과 발등 부분의 드롭이 커지고 착화감이 개선된 새로운 라스트를 만나보실 수 있습니다. 또한 업그레이드된 러그 디자인으로 접지력을 더욱 강화했습니다.',
                },
              ]
            : []),
        ]}
        specifications={[
          {
            label: '신발 유형',
            value: isClifton || product.stability === 'Stable' ? '안정화' : '중립화',
          },
          { label: '추천 활동', value: isClifton ? '로드 러닝, 워킹, 라이프 스타일' : product.use },
          { label: '러닝 유형', value: product.runningType },
        ]}
      />
    </Stack>
  );
}
