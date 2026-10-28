import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { Platform } from '@/lib/device';
import {
  ProductOptionList,
  type ProductOptionThumbnail,
} from '@/components/common/molecules/ProductOptionList/ProductOptionList';

export type ProductVariantSummaryDisplay = 'colors' | 'widths' | 'colors-widths';

export type ProductVariantSummaryProps = {
  colorCount: number;
  display?: ProductVariantSummaryDisplay;
  options: readonly ProductOptionThumbnail[];
  platform: Platform;
  widthCount: number;
};

/** Product color and width option summary: text on web, swatches on mobile. */
export function ProductVariantSummary({
  colorCount,
  display = 'colors-widths',
  options,
  platform,
  widthCount,
}: ProductVariantSummaryProps) {
  const summaryText = {
    colors: `${colorCount} colors`,
    widths: `${widthCount} widths`,
    'colors-widths': `${colorCount} colors, ${widthCount} widths`,
  }[display];

  if (platform === 'web') {
    return (
      <Typography variant="body4" tone="subtle">
        {summaryText}
      </Typography>
    );
  }

  return <ProductOptionList layout="scroll" options={options} />;
}
