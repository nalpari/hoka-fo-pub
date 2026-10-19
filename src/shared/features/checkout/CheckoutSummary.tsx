import { Box, HStack, Stack } from 'styled-system/jsx';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { getCartImage } from '@/mocks/cartDisplay';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

const productImage = css({ w: '96px', h: '96px', objectFit: 'cover', bg: 'black.10' });

export function CheckoutSummary({ rows, total }: { rows: readonly CheckoutRow[]; total: number }) {
  return (
    <Stack as="section" gap="4">
      <Typography as="h2" web="heading9" mo="heading7">
        주문상품 정보 및 할인 적용
      </Typography>
      <Stack borderTop="1px solid var(--colors-black-100)">
        {rows.map(({ item, product }) => (
          <HStack
            key={`${item.id}-${item.color}-${item.width}-${item.size}`}
            gap="4"
            py="6"
            borderBottom="1px solid var(--colors-black-20)"
            alignItems="flex-start"
          >
            <img
              src={getCartImage(item, product.primaryImage ?? '/images/mypage/speedgoat-7-gtx.png')}
              alt={product.name}
              className={productImage}
            />
            <Stack gap="1" minW="0" flex="1">
              <Typography web="body4" mo="body4" weight="semibold">
                {product.name}
              </Typography>
              <Typography web="body5" mo="body5" tone="subtle">
                옵션 : {item.width} / {item.color} / {item.size} {item.quantity}개
              </Typography>
              <Typography web="body4" mo="body4" weight="semibold">
                {(product.price * item.quantity).toLocaleString()}원
              </Typography>
            </Stack>
          </HStack>
        ))}
      </Stack>
      <Typography web="body5" mo="body5" tone="subtle">
        * 상품수량 변경은 상품상세 또는 장바구니에서 하실 수 있습니다.
      </Typography>
      <Stack gap="3" pt="4" borderTop="1px solid var(--colors-black-20)">
        <HStack justifyContent="space-between">
          <Typography web="body4" mo="body4">
            총 상품금액
          </Typography>
          <Typography web="body4" mo="body4">
            {total.toLocaleString()}원
          </Typography>
        </HStack>
        <HStack justifyContent="space-between">
          <Typography web="body4" mo="body4">
            상품 할인금액
          </Typography>
          <Typography web="body4" mo="body4">
            0원
          </Typography>
        </HStack>
        <HStack justifyContent="space-between">
          <Typography web="body4" mo="body4">
            쿠폰
          </Typography>
          <Link
            href="/mypage/coupons"
            className={css({ fontSize: '12px', textDecoration: 'underline' })}
          >
            조회하기
          </Link>
        </HStack>
        <HStack justifyContent="space-between" py="4" borderTop="1px solid var(--colors-black-20)">
          <Typography web="body4" mo="body4" weight="semibold">
            총 결제 금액
          </Typography>
          <Typography web="body3" mo="body3" weight="semibold">
            {total.toLocaleString()}원
          </Typography>
        </HStack>
        <Box bg="black.10" p="4">
          <Stack gap="1">
            <Typography web="body5" mo="body5" tone="subtle">
              - 쿠폰 보유 시 최대 할인 쿠폰으로 자동 적용됩니다.
            </Typography>
            <Typography web="body5" mo="body5" tone="subtle">
              - 정상 상품과 세일 상품을 함께 결제 시 쿠폰 적용 가능 상품에만 쿠폰이 적용됩니다.
            </Typography>
            <Typography web="body5" mo="body5" tone="subtle">
              - 할인 및 쿠폰 적용 후 실 결제금액의 최대 30%까지 마일리지 사용 가능합니다.
            </Typography>
            <Typography web="body5" mo="body5" tone="subtle">
              - 마일리지는 5,000점 이상 보유 시 100점 단위로 사용 가능합니다.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
