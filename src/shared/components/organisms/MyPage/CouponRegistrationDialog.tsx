import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CouponRegistrationDialog({ open, onOpenChange }: Props) {
  return (
    <ModalDialog
      closeLabel="쿠폰 등록 결과 닫기"
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="쿠폰등록"
    >
      <Stack gap="6">
        <Typography as="p" variant="body3">
          쿠폰이 등록되었습니다.
        </Typography>
        <Button fullWidth size="short" variant="primary" onClick={() => onOpenChange(false)}>
          확인
        </Button>
      </Stack>
    </ModalDialog>
  );
}
