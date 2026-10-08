import { HStack, VStack, Divider } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { PromotionBadge } from '@/shared/components/atoms/Badge/PromotionBadge';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type ProductDetailHeaderMetaProps = {
  product: Product;
};

const productUseLabels: Record<Product['use'], string> = {
  'Everyday Run': '데일리 러닝',
  'Trail Running': '트레일 러닝',
  Walking: '워킹',
};

export function ProductDetailHeaderMeta({ product }: ProductDetailHeaderMetaProps) {
  const uses = [...new Set([product.runningType, productUseLabels[product.use]])].join(', ');

  return (
    <>
      <VStack alignItems="start" gap="2">
        {product.promotion && <PromotionBadge fontWeight="medium" promotion={product.promotion} />}
        <HStack gap="2" color="var(--color-black-60)">
          <Typography as="span" variant="productDetailGender" style={{ color: 'inherit' }}>
            {product.gender}
          </Typography>
          {uses && (
            <>
              <Divider orientation="vertical" h="3" w="1px" bg="var(--color-black-60)" />
              <Typography as="span" variant="productUse" style={{ color: 'inherit' }}>
                {uses}
              </Typography>
            </>
          )}
        </HStack>
      </VStack>
    </>
  );
}
