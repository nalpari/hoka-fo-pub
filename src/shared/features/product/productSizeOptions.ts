import type { ProductWidthOption } from '@/mocks/products';
import type { SizeSelectorOption } from '@/shared/components/molecules/SizeSelector/SizeSelector';
import { koreanSizes } from '@/shared/components/molecules/SizeSelector/koreanSizes';

/** Availability wins over low-stock hints for every Korean size. */
export function productSizeOptions(width?: ProductWidthOption): SizeSelectorOption[] {
  return koreanSizes.map((value) => ({
    value,
    state: !width?.sizes.includes(value)
      ? 'unavailable'
      : width.soldOut.includes(value)
        ? 'soldOut'
        : width.lowStockSizes?.includes(value)
          ? 'lowStock'
          : 'available',
  }));
}
