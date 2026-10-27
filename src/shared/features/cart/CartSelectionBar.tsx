import { HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { usePlatform } from '@/shared/context/platform';

type Props = {
  allSelected: boolean;
  selectedCount: number;
  totalCount: number;
  soldOutCount: number;
  onSelectAll: (checked: boolean) => void;
  onRemoveSelected: () => void;
  onRemoveSoldOut: () => void;
};

/** 전체 선택과 선택·품절 상품 삭제를 제공합니다. (Provides cart selection and removal actions.) */
export function CartSelectionBar({
  allSelected,
  selectedCount,
  totalCount,
  soldOutCount,
  onSelectAll,
  onRemoveSelected,
  onRemoveSoldOut,
}: Props) {
  const mobile = usePlatform() === 'mobile';

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Checkbox
        aria-label="전체 상품 선택"
        checked={allSelected}
        onCheckedChange={onSelectAll}
        label={
          <Typography variant="body4">
            {mobile ? (
              <>
                전체{' '}
                <Typography as="span" variant="body4" weight="medium">
                  ({selectedCount}/{totalCount})
                </Typography>
              </>
            ) : (
              `선택상품 ${selectedCount}개`
            )}
          </Typography>
        }
      />
      <HStack gap={{ base: '3', _mobile: '2' }}>
        <Button
          variant="link"
          size={mobile ? 'md' : 'sm'}
          disabled={selectedCount === 0}
          onClick={onRemoveSelected}
        >
          선택상품 삭제
        </Button>
        <Button
          variant="link"
          size={mobile ? 'md' : 'sm'}
          disabled={soldOutCount === 0}
          onClick={onRemoveSoldOut}
        >
          품절상품 삭제
        </Button>
      </HStack>
    </HStack>
  );
}
