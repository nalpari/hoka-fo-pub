import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { OrderPageLayout } from '@/components/orders/OrderPageLayout';
import { orderRecommendations } from '@/mocks/orderRecommendations';

import { CartHeading } from './_components/CartHeading';
import { CartOrderActions } from './_components/CartOrderActions';
import { CartProductSection } from './_components/CartProductSection';
import { CartSupportInfo } from './_components/CartSupportInfo';
import { cartPreviewRows, cartPreviewTotal } from './cart-preview';

/** 고정 예시 데이터로 장바구니 마크업을 표시합니다. (Displays cart markup with fixed preview data.) */
export default function Page() {
  return (
    <OrderPageLayout step={1} title={<CartHeading itemCount={12} />}>
      <Stack gap="10" pb={{ _mobile: '12' }}>
        <CartProductSection rows={cartPreviewRows} total={cartPreviewTotal} />
        <HStack display={{ _mobile: 'none' }} justifyContent="center" gap="3">
          <Button variant="secondary">선택상품 주문하기</Button>
          <Button>전체상품 주문하기</Button>
        </HStack>
        <OrderRecommendations items={orderRecommendations} layout="portrait" title="추천 상품" />
        <CartSupportInfo />
        <Box display={{ base: 'none', _mobile: 'block' }}>
          <CartOrderActions total={cartPreviewTotal} />
        </Box>
      </Stack>
    </OrderPageLayout>
  );
}
