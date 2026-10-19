'use client';

import { useState } from 'react';
import { ProductInquiryAfterSalesNotice } from '@/shared/Mockup/product-detail-sections/ProductInquiryAfterSalesNotice';
import { ProductInquiryCareNotice } from '@/shared/Mockup/product-detail-sections/ProductInquiryCareNotice';
import { ProductInquiryDeliveryNotice } from '@/shared/Mockup/product-detail-sections/ProductInquiryDeliveryNotice';
import { Box } from 'styled-system/jsx';

export function ProductInquiryNotices() {
  const [openNotice, setOpenNotice] = useState<string | null>(null);

  return (
    <Box borderTop="1px solid var(--color-black-20)">
      <ProductInquiryDeliveryNotice
        isOpen={openNotice === 'delivery'}
        onToggle={() => setOpenNotice(openNotice === 'delivery' ? null : 'delivery')}
      />
      <ProductInquiryCareNotice
        isOpen={openNotice === 'care'}
        onToggle={() => setOpenNotice(openNotice === 'care' ? null : 'care')}
      />
      <ProductInquiryAfterSalesNotice
        isOpen={openNotice === 'after-sales'}
        onToggle={() => setOpenNotice(openNotice === 'after-sales' ? null : 'after-sales')}
      />
    </Box>
  );
}
