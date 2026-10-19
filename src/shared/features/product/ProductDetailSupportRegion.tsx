import { Box } from 'styled-system/jsx';
import type { Platform } from '@/shared/lib/device';
import { ProductDetailSupport } from './ProductDetailSupport';

export function ProductDetailSupportRegion({ platform }: { platform: Platform }) {
  return (
    <Box
      display={platform === 'mobile' ? 'none' : undefined}
      _mobile={{ display: platform === 'mobile' ? 'block' : 'none' }}
    >
      <ProductDetailSupport />
    </Box>
  );
}
