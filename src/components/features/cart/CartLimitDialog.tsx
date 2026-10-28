import { Stack } from 'styled-system/jsx';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import { Typography } from '@/components/common/atoms/Typography/Typography';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** 구매 수량 제한 안내와 닫기 액션을 표시합니다. (Displays the cart purchase limit notice.) */
export function CartLimitDialog({ open, onOpenChange }: Props) {
  return (
    <SingleActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title="장바구니"
      closeLabel="안내 닫기"
      onConfirm={() => onOpenChange(false)}
    >
      <Stack gap="4">
        <Typography variant="body2">변경할 수 없습니다</Typography>
        <Typography variant="body4">구매 수량이 제한된 상품입니다</Typography>
      </Stack>
    </SingleActionDialog>
  );
}
