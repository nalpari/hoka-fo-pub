import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { getCartImage } from '@/mocks/cartDisplay';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Collapsible } from '@/shared/components/atoms/Collapsible/Collapsible';
import { OrderProductSummary } from '@/shared/components/molecules/OrderProductSummary/OrderProductSummary';
import type { CheckoutRow } from './checkout-summary';

type Props = {
  item: CheckoutRow['item'];
  product: CheckoutRow['product'];
  expanded: boolean;
  selected: string;
  onExpandedChange: (open: boolean) => void;
  onSelect: (value: string) => void;
};

export function CouponProductItem({
  item,
  product,
  expanded,
  selected,
  onExpandedChange,
  onSelect,
}: Props) {
  return (
    <Stack gap="4" py="4" borderTop="1px solid var(--colors-black-100)">
      <OrderProductSummary
        variant="coupon"
        image={getCartImage(item, product.primaryImage ?? '')}
        name={product.name}
        optionText={`옵션 : ${item.width} / ${item.color} / ${item.size} ${item.quantity}개`}
        amount={product.price * item.quantity}
      />
      <Collapsible
        open={expanded}
        onOpenChange={onExpandedChange}
        indicator={<Icon fontAwesomeIcon={expanded ? faMinus : faPlus} size={12} />}
        panelClassName={css({ pt: '4' })}
        triggerClassName={css({ minH: '24px', textAlign: 'left' })}
        trigger={
          <Typography as="span" variant="body5">
            사용 가능 쿠폰 2개 (전체 3개)
          </Typography>
        }
      >
        <Radio
          ariaLabel={`${product.name} 상품 쿠폰`}
          value={selected}
          onValueChange={onSelect}
          options={[
            { value: '0', label: '적용 쿠폰 없음' },
            { value: '0.1', label: '[상품쿠폰] 10% 할인 쿠폰' },
            { value: '0.07', label: '[등급쿠폰] HOKA FAMILY 감사 쿠폰 7%' },
            { value: 'expired', label: '사용 기간이 만료된 쿠폰', disabled: true },
          ]}
        />
      </Collapsible>
    </Stack>
  );
}
