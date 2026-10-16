import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Stack } from 'styled-system/jsx';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function MyPageWithdrawalDialog({ open, onOpenChange, onConfirm }: Props) {
  return (
    <ModalDialog
      footer={
        <>
          <Button fullWidth size="short" variant="secondary" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button fullWidth size="short" variant="primary" onClick={onConfirm}>
            확인
          </Button>
        </>
      }
      closeLabel="회원탈퇴 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="회원탈퇴"
    >
      <Stack gap="4">
        <Typography as="h2" variant="heading9">
          회원탈퇴를 진행 하시겠습니까?
        </Typography>
        <Typography as="p" variant="body3">
          탈퇴 후에는 회원정보 및 이용내역을 복구할 수 없으며, 탈퇴 후 6개월간 재가입이 불가합니다.
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
