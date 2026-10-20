import { HStack, Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { getCartImage } from '@/mocks/cartDisplay';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Collapsible } from '@/shared/components/atoms/Collapsible/Collapsible';
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
      <HStack alignItems="flex-start" gap="4">
        <img
          src={getCartImage(item, product.primaryImage ?? '')}
          alt={product.name}
          className={css({ w: '88px', h: '88px', objectFit: 'contain', bg: 'black.10' })}
        />
        <Stack gap="1">
          <Typography variant="body4" weight="semibold">
            {product.name}
          </Typography>
          <Typography variant="body5">
            옵션 : {item.width} / {item.color} / {item.size} {item.quantity}개
          </Typography>
          <Typography variant="body4">
            {(product.price * item.quantity).toLocaleString()}원
          </Typography>
        </Stack>
      </HStack>
      <Collapsible
        open={expanded}
        onOpenChange={onExpandedChange}
        indicator={null}
        panelClassName={css({ pt: '4' })}
        triggerRender={<Button variant="link" size="sm" />}
        trigger={<>사용 가능 쿠폰 2개 (전체 3개) {expanded ? '−' : '+'}</>}
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
