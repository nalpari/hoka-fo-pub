import { HStack } from 'styled-system/jsx';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { OrderHistoryProduct } from './OrderHistoryProduct';
import type { OrderLine } from './orders.types';

/** 신청 상품의 체크박스와 상품 정보를 표시합니다. (Displays a claim product checkbox and product information.) */
export function ClaimProductChoice({
  line,
  checked,
  onToggle,
}: {
  line: OrderLine;
  checked: boolean;
  onToggle: (line: OrderLine, checked: boolean) => void;
}) {
  return (
    <HStack gap="4" alignItems="flex-start">
      <Checkbox
        label={null}
        aria-label={`${line.name} ${line.size} ${line.key} 신청 상품 선택`}
        checked={checked}
        onCheckedChange={(checked) => onToggle(line, checked)}
      />
      <OrderHistoryProduct line={line} showAmount={false} />
    </HStack>
  );
}
