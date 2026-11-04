import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary';

import type { OrderLine } from '@/components/orders/orders.types';

type OrderHistoryProductProps = {
  line: OrderLine;
  showAmount?: boolean;
  showQuantity?: boolean;
  imageSize?: 'standard' | 'claim';
  statusText?: string;
} & ({ onClick: () => void; cartAction?: never } | { onClick?: undefined; cartAction?: boolean });

/** [ 개발팀 바인딩 ] 주문 화면 소유자가 준비한 line의 상품/행 ID·옵션·수량·displayAmount와 표시 옵션을 제공합니다. onClick은 호출자가 소유한 상세 진입 콜백이며 조회·저장·금액 계산은 연결하지 않습니다. cartAction은 미연결 표시 버튼입니다. */
/** 주문 내역 상품 요약을 표시합니다. (Displays an order history product summary.) */
export function OrderHistoryProduct({
  line,
  showAmount = true,
  showQuantity = showAmount,
  imageSize = 'standard',
  cartAction = false,
  statusText,
  onClick,
}: OrderHistoryProductProps) {
  const platform = usePlatform();
  const Root = onClick ? 'button' : 'div';

  return (
    <Root
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={css({
        w: '100%',
        ...(onClick
          ? {
              display: 'block',
              p: '0',
              border: '0',
              bg: 'transparent',
              textAlign: 'left',
              cursor: 'pointer',
              _focusVisible: { outline: '2px solid var(--color-focus-ring)', outlineOffset: '2px' },
            }
          : {}),
      })}
    >
      <OrderProductSummary
        variant="history"
        imageSize={imageSize === 'claim' ? { web: 96, mobile: 64 } : undefined}
        image={line.image}
        name={line.name}
        optionText={
          '옵션 : ' +
          line.width +
          ' / ' +
          line.color +
          ' / ' +
          line.size +
          (showQuantity ? ' / ' + line.quantity + '개' : '')
        }
        amount={line.displayAmount ?? 0}
        amountLanguage={onClick ? 'en' : undefined}
        hideAmount={!showAmount || line.displayAmount === undefined}
        optionTone="subtle"
      >
        {statusText ? (
          <Typography
            variant="body4"
            weight="medium"
            tone="tertiary"
            className={css({ mt: 'auto', textAlign: 'right' })}
          >
            {statusText}
          </Typography>
        ) : null}
        {cartAction ? (
          <Box>
            <Button
              variant="plain"
              size={platform === 'mobile' ? 'sm' : 'md'}
              type="button"
              className={css({ alignSelf: 'flex-start' })}
            >
              <HStack gap="4px">
                <Icon name="bag-shopping-regular" size={platform === 'mobile' ? '14px' : '18px'} />
                장바구니 담기
              </HStack>
            </Button>
          </Box>
        ) : null}
      </OrderProductSummary>
    </Root>
  );
}
