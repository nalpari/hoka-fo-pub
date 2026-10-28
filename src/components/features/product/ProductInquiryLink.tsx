import type { CSSProperties } from 'react';
import { Box } from 'styled-system/jsx';
import { ButtonLink } from '@/components/common/atoms/Button/Button';

export function ProductInquiryLink() {
  return (
    <Box w="120px" flexShrink="0">
      <ButtonLink
        href="/support/inquiries/new"
        variant="secondary"
        size="short"
        fullWidth
        style={{ '--button-height': '36px', '--button-label-weight': '400' } as CSSProperties}
      >
        문의하기
      </ButtonLink>
    </Box>
  );
}
