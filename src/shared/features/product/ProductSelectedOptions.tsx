import { Box, Flex, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { NumberStepper } from '@/shared/components/atoms/NumberStepper/NumberStepper';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { AmountRow } from '@/shared/components/molecules/AmountRow/AmountRow';
import { faXmark } from '@/shared/icons/fontAwesome';
import type { CartItem } from '@/shared/types/cart';

export type ProductSelectedOptionsProps = {
  items: readonly CartItem[];
  unitPrice: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
};

/** 선택한 상품 옵션별 수량과 삭제 버튼 및 합계를 표시합니다. (Displays quantity, removal, and totals for selected product options.) */
export function ProductSelectedOptions({
  items,
  unitPrice,
  onQuantityChange,
  onRemove,
}: ProductSelectedOptionsProps) {
  if (!items.length) return null;

  return (
    <Stack gap="0" aria-label="선택한 상품 옵션">
      <Box as="ul" m="0" p="0" listStyleType="none">
        {items.map((item, index) => {
          const label = `${item.color}, ${item.size}, ${item.width}`;

          return (
            <li key={JSON.stringify([item.id, item.color, item.width, item.size])}>
              <Stack gap="3" py="4" borderBottom="1px solid var(--color-black-20)">
                <Flex gap="3" alignItems="center" justifyContent="space-between">
                  <Typography variant="body4">{label}</Typography>
                  <IconButton
                    aria-label={`${label} 삭제`}
                    size="24px"
                    onClick={() => onRemove(index)}
                  >
                    <Icon fontAwesomeIcon={faXmark} size={16} />
                  </IconButton>
                </Flex>
                <Flex gap="3" alignItems="center" justifyContent="space-between">
                  <NumberStepper
                    ariaLabel={`${label} 수량`}
                    min={1}
                    value={item.quantity}
                    onChange={(quantity) => onQuantityChange(index, quantity)}
                  />
                  <Typography variant="body3" weight="semibold">
                    {(unitPrice * item.quantity).toLocaleString('ko-KR')}원
                  </Typography>
                </Flex>
              </Stack>
            </li>
          );
        })}
      </Box>
      <AmountRow
        label="합계"
        amount={items.reduce((total, item) => total + unitPrice * item.quantity, 0)}
        emphasis
        emphasizeLabel
        py="5"
        borderTop="2px solid var(--color-black-100)"
        aria-live="polite"
      />
    </Stack>
  );
}
