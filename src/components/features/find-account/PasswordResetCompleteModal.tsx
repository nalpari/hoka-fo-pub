import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';

import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

type PasswordResetCompleteModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function PasswordResetCompleteModal({
  onOpenChange,
  onConfirm,
}: PasswordResetCompleteModalProps) {
  return (
    <SingleActionDialog
      onConfirm={onConfirm}
      open
      onOpenChange={onOpenChange}
      title="비밀번호 재설정"
      closeLabel="비밀번호 변경 완료 안내 닫기"
      size="md"
    >
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="비밀번호 변경완료"
        titleProps={{ variant: 'body2' }}
        description="비밀번호 변경이 완료되었습니다."
        descriptionProps={{ variant: 'body4' }}
      />
    </SingleActionDialog>
  );
}
