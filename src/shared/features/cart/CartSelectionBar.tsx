import { HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  allSelected: boolean;
  selectedCount: number;
  onSelectAll: (checked: boolean) => void;
  onRemoveSelected: () => void;
  onRemoveSoldOut: () => void;
};

export function CartSelectionBar({
  allSelected,
  selectedCount,
  onSelectAll,
  onRemoveSelected,
  onRemoveSoldOut,
}: Props) {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Checkbox
        aria-label="전체 상품 선택"
        checked={allSelected}
        onCheckedChange={onSelectAll}
        label={<Typography variant="body4">선택상품 {selectedCount}개</Typography>}
      />
      <HStack gap="3">
        <Button variant="link" size="sm" onClick={onRemoveSelected}>
          선택상품 삭제
        </Button>
        <Button variant="link" size="sm" onClick={onRemoveSoldOut}>
          품절상품 삭제
        </Button>
      </HStack>
    </HStack>
  );
}
