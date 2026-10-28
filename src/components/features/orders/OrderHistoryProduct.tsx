import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { OrderProductSummary } from '@/components/common/molecules/OrderProductSummary/OrderProductSummary';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import type { OrderLine } from './orders.types';

type Props = { line: OrderLine; onAddToCart?: (line: OrderLine) => void; showAmount?: boolean };

/** 주문 내역 상품의 요약과 다시 담기 액션을 표시합니다. (Displays an order history product and its reorder action.) */
export function OrderHistoryProduct({ line, onAddToCart, showAmount = true }: Props) {
  return (
    <Box w="100%" className={css({ '& > div > img': { _mobile: { w: '96px', h: '96px' } } })}>
      <OrderProductSummary
        variant="coupon"
        image={line.image}
        name={line.name}
        optionText={`옵션 : ${line.width} / ${line.color} / ${line.size} / ${line.quantity}개`}
        amount={line.price * line.quantity}
        hideAmount={!showAmount}
      >
        {onAddToCart ? (
          <Button
            variant="plain"
            size="sm"
            onClick={() => onAddToCart(line)}
            icon={<Icon fontAwesomeIcon={faBagShopping} size={12} />}
          >
            장바구니 담기
          </Button>
        ) : null}
      </OrderProductSummary>
    </Box>
  );
}
