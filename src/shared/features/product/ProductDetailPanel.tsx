import { Box, Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ProductDetailContent } from '@/shared/features/product/ProductDetailContent';
import { ProductDetailHeader } from '@/shared/features/product/ProductDetailHeader';
import { ProductDetailSupportRegion } from './ProductDetailSupportRegion';

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
    <Box
      as="article"
      pos="sticky"
      top="104px"
      alignSelf="start"
      px="0"
      _mobile={{ position: 'static', px: '4', pt: '6' }}
    >
      <Stack gap="8" _mobile={{ gap: '6' }}>
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
        <ProductDetailSupportRegion platform="mobile" />
      </Stack>
    </Box>
  );
}
