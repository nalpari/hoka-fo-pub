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

/** 상품의 성별과 사용 목적 메타데이터를 표시합니다. (Displays a product's gender and use metadata.) */
export function ProductDetailHeaderMeta({ product }: ProductDetailHeaderMetaProps) {
  const uses = [...new Set([product.runningType, productUseLabels[product.use]])].join(', ');

  return (
    <>
      <VStack alignItems="start" gap="2">
        {product.promotion && <PromotionBadge weight="medium" promotion={product.promotion} />}
        <HStack gap="2" color="var(--color-black-60)">
          <Typography variant="body4" weight="medium" tone="inherit">
            {product.gender}
          </Typography>
          {uses && (
            <>
              <Divider orientation="vertical" h="3" w="1px" bg="var(--color-black-60)" />
              <Typography variant="body4" weight="bold" tone="inherit">
                {uses}
              </Typography>
            </>
          )}
        </HStack>
      </VStack>
    </>
  );
}
