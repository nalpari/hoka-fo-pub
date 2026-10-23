import { css } from 'styled-system/css';
import { InquiryBoard } from '@/shared/components/organisms/InquiryBoard/InquiryBoard';
import { productInquiries } from '@/shared/features/product/productInquiries';
import { ProductInquiryLink } from './ProductInquiryLink';

const board = css({ pt: '24px' });

export function ProductDetailInquiryContent() {
  return (
    <InquiryBoard
      title="상품문의"
      variant="product"
      pageSize={5}
      loadMoreSize={16}
      className={board}
      items={productInquiries}
      action={<ProductInquiryLink />}
    />
  );
}
