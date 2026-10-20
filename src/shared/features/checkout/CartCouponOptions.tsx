import { Radio } from '@/shared/components/atoms/Radio/Radio';

type Props = { value: string; onValueChange: (value: string) => void; eligible: boolean };

export function CartCouponOptions({ value, onValueChange, eligible }: Props) {
  return (
    <Radio
      ariaLabel="장바구니 쿠폰"
      value={value}
      onValueChange={onValueChange}
      options={[
        { value: 'none', label: '쿠폰 없음' },
        {
          value: '5000',
          label: '장바구니 5,000원 할인',
          disabled: !eligible,
        },
        {
          value: '4000',
          label: 'HOKA FAMILY 장바구니 4,000원 할인',
          disabled: !eligible,
        },
      ]}
    />
  );
}
