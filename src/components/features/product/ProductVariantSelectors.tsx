import { Stack } from 'styled-system/jsx';
import type { Product, ProductWidthOption } from '@/mocks/products';
import { ProductColorSelector } from '@/components/features/product/ProductColorSelector';
import { ProductSizeSelector } from '@/components/features/product/ProductSizeSelector';
import { ProductWidthSelector } from '@/components/common/molecules/ProductOptionSelectors/ProductWidthSelector';

export function productWidthOptions(product: Product, color: string): ProductWidthOption[] {
  return (
    product.colorOptions?.find((option) => option.color === color)?.widths ?? [
      {
        label: product.width,
        sizes: product.sizes,
        soldOut: product.soldOut,
        lowStockSizes: product.lowStockSizes,
      },
    ]
  );
}

type ProductVariantSelectorsProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
};

/** 상품별 옵션 데이터와 변경 콜백을 선택 영역에 연결합니다. (Connects product option data and callbacks to the selectors.) */
export function ProductVariantSelectors({
  product,
  gallery,
  color,
  width,
  size,
  error,
  onColorChange,
  onWidthChange,
  onSizeChange,
}: ProductVariantSelectorsProps) {
  const widthOptions = productWidthOptions(product, color);
  const selected = widthOptions.find((option) => option.label === width) ?? widthOptions[0];

  return (
    <>
      <Stack gap="10">
        <ProductWidthSelector
          onValueChange={onWidthChange}
          options={widthOptions.map((option) => option.label)}
          value={width}
        />
        <ProductColorSelector
          colors={product.colors}
          colorThumbnails={product.colorThumbnails}
          gallery={gallery}
          onValueChange={onColorChange}
          value={color}
        />
        <ProductSizeSelector
          error={error}
          onValueChange={onSizeChange}
          selectedWidth={selected}
          value={size}
        />
      </Stack>
    </>
  );
}
