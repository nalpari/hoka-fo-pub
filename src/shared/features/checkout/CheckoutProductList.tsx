import { HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { getCartImage } from '@/mocks/cartDisplay';
import type { CheckoutRow } from '@/shared/features/checkout/checkout-summary';

const productImage = css({ w: '96px', h: '96px', objectFit: 'cover', bg: 'black.10' });

type Props = { rows: readonly CheckoutRow[] };

export function CheckoutProductList({ rows }: Props) {
  return (
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
            <Typography variant="body4" weight="semibold">
              {product.name}
            </Typography>
            <Typography variant="body5" tone="subtle">
              옵션 : {item.width} / {item.color} / {item.size} {item.quantity}개
            </Typography>
            <Typography variant="body4" weight="semibold">
              {(product.price * item.quantity).toLocaleString()}원
            </Typography>
          </Stack>
        </HStack>
      ))}
    </Stack>
  );
}
