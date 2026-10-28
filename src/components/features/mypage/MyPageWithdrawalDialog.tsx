import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function MyPageWithdrawalDialog({ open, onOpenChange, onConfirm }: Props) {
  return (
    <ConfirmDialog
      onConfirm={onConfirm}
      fullWidthActions={false}
      closeLabel="회원탈퇴 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="회원탈퇴"
    >
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="회원탈퇴를 진행 하시겠습니까?"
        titleProps={{ variant: 'heading9' }}
        description="탈퇴 후에는 회원정보 및 이용내역을 복구할 수 없으며, 탈퇴 후 6개월간 재가입이 불가합니다."
        descriptionProps={{ variant: 'body3' }}
      />
    </ConfirmDialog>
  );
}
