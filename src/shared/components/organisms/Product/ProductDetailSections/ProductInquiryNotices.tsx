'use client';

import { useState } from 'react';
import { ProductInquiryAfterSalesNotice } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryAfterSalesNotice';
import { ProductInquiryCareNotice } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryCareNotice';
import { ProductInquiryDeliveryNotice } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiryDeliveryNotice';
import { Box } from 'styled-system/jsx';

export function ProductInquiryNotices() {
  const [openNotice, setOpenNotice] = useState<string | null>(null);

  return (
    <Box borderTop="1px solid #dfe3e8">
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
