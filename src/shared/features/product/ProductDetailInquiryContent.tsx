import { css } from 'styled-system/css';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { InquiryBoard } from '@/shared/components/organisms/InquiryBoard/InquiryBoard';
import { productInquiries } from '@/shared/features/product/productInquiries';

const inquiryButton = css({
  minW: '120px',
  '--button-radius': '4px',
});

const board = css({ pt: '24px' });

export function ProductDetailInquiryContent() {
  return (
    <InquiryBoard
      title="상품문의"
      className={board}
      items={productInquiries}
      defaultExpandedIds={['product-inquiry-1']}
      action={
        <ButtonLink
          href="/support/inquiries/new"
          variant="primary"
          size="short"
          className={inquiryButton}
        >
          문의하기
        </ButtonLink>
      }
    />
  );
}
