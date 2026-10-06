import { css } from 'styled-system/css';
import type { Platform } from '@/shared/lib/device';
import {
  ProductOptionList,
  type ProductOptionThumbnail,
} from '@/shared/components/molecules/ProductOptionList/ProductOptionList';

const summary = css({ fontSize: '14px', color: '#4D4D4D' });

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
    return <span className={summary}>{summaryText}</span>;
  }

  return <ProductOptionList layout="scroll" options={options} />;
}
