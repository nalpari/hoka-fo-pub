import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { ProductDetailInquiryContent } from './ProductDetailInquiryContent';
import { ProductTechSpecs } from './ProductTechSpecs';
import { ProductDetailEditorial } from './ProductDetailEditorial';
import { ProductDetailScrollSpy } from './ProductDetailScrollSpy';
import { ProductDetailPlaceholder } from './ProductDetailPlaceholder';
import { ProductDetailReviews } from './ProductDetailReviews';
import { ProductDetailSupportSections } from './ProductDetailSupportSections';
import { getProductDetailPresentation, productDetailAnchors } from './productDetailPresentation';

const destination = css({
  scrollMarginTop:
    'calc(var(--layout-site-header-height) + var(--product-detail-nav-height) + 24px)',
});

export function ProductDetailSections({ product }: { product: Product }) {
  const presentation = getProductDetailPresentation(product);

  return (
    <ProductDetailScrollSpy items={productDetailAnchors}>
      <Stack gap="96px">
        <Box id="product-details" className={destination}>
          <ProductTechSpecs
            specifications={presentation.specifications}
            attributes={presentation.attributes}
            scales={presentation.scales}
          />
        </Box>
        {presentation.features.length > 0 && (
          <ProductDetailEditorial features={presentation.features} />
        )}
        <ProductDetailPlaceholder>상세페이지 영역 (이미지세트 &amp; IMC)</ProductDetailPlaceholder>
        <ProductDetailReviews
          id="product-reviews"
          className={destination}
          count={product.reviewCount}
        />
        <Box id="product-inquiries" className={destination}>
          <ProductDetailInquiryContent />
        </Box>
        <ProductDetailSupportSections specifications={presentation.notice} />
      </Stack>
    </ProductDetailScrollSpy>
  );
}
