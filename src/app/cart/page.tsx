import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';

import { OrderRecommendations } from '@/components/common/organisms/OrderRecommendations';

import { OrderPageLayout } from '@/components/orders/OrderPageLayout';
import { orderRecommendations } from '@/mocks/orderRecommendations';

import { CartHeading } from './_components/CartHeading';
import { CartOrderActions } from './_components/CartOrderActions';
import { CartProductSection } from './_components/CartProductSection';
import { CartSupportInfo } from './_components/CartSupportInfo';
import { cartPreviewRows } from './cart-preview';

/** 고정 예시 데이터로 장바구니 마크업을 표시합니다. (Displays cart markup with fixed preview data.) */
export default function Page() {
  return (
    <OrderPageLayout title={<CartHeading />} headerSpacing="none" maxWidth="1132px">
      <Stack gap={{ base: '14', _mobile: '8' }} mt={{ base: '6', _mobile: '0' }}>
        <Stack gap="0" pt={{ base: '8', _mobile: '0' }}>
          <CartProductSection rows={cartPreviewRows} />
          <HStack
            display={{ base: 'flex', _mobile: 'none' }}
            justifyContent="center"
            gap="2"
            mt={{ base: '8', _mobile: '0' }}
            py={{ base: '4', _mobile: '0' }}
          >
            <Box w="180px">
              <Button variant="secondary" fullWidth>
                선택상품 주문하기
              </Button>
            </Box>
            <Box w="180px">
              <Button variant="primary" fullWidth>
                전체상품 주문하기
              </Button>
            </Box>
          </HStack>
        </Stack>
        <OrderRecommendations items={orderRecommendations} layout="portrait" title="추천 상품" />
        <CartSupportInfo />
        <CartOrderActions />
      </Stack>
    </OrderPageLayout>
  );
}
