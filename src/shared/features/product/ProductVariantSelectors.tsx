import { Stack } from 'styled-system/jsx';
import type { Product, ProductWidthOption } from '@/mocks/products';
import { ProductColorSelector } from '@/shared/features/product/ProductColorSelector';
import { ProductSizeSelector } from '@/shared/features/product/ProductSizeSelector';
import { ProductWidthSelector } from '@/shared/features/product/ProductWidthSelector';

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
  onOpenSizeGuide: () => void;
};

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
  onOpenSizeGuide,
}: ProductVariantSelectorsProps) {
  const widthOptions = productWidthOptions(product, color);
  const selected = widthOptions.find((option) => option.label === width) ?? widthOptions[0];

  return (
    <>
      <Stack gap="10">
        <ProductWidthSelector onValueChange={onWidthChange} options={widthOptions} value={width} />
        <ProductColorSelector
          colors={product.colors}
          gallery={gallery}
          onValueChange={onColorChange}
          value={color}
        />
        <ProductSizeSelector
          error={error}
          onOpenSizeGuide={onOpenSizeGuide}
          onValueChange={onSizeChange}
          selectedWidth={selected}
          value={size}
        />
      </Stack>
    </>
  );
}
