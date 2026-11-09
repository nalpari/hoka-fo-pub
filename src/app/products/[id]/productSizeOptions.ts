import { koreanSizes } from '@/components/common/molecules/SizeSelector/koreanSizes';
import type { SizeSelectorOption } from '@/components/common/molecules/SizeSelector/SizeSelector';

import type { ProductWidthOption } from '@/mocks/products';

/** Availability wins over low-stock hints for every Korean size. */
export function productSizeOptions(
  width?: ProductWidthOption,
  sizes: readonly string[] = koreanSizes,
): SizeSelectorOption[] {
  return sizes.map((value) => ({
    value,
    state: !width?.sizes.includes(value)
      ? 'unavailable'
      : width.soldOut.includes(value)
        ? 'soldOut'
        : 'available',
  }));
}
