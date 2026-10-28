import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

export type ProfileEditNotice = 'cancel' | 'save' | 'complete' | 'unverified';

const notices = {
  cancel: { title: '회원정보 수정 취소 확인', message: '입력한 변경사항을 취소하시겠습니까?' },
  save: { title: '회원정보 수정 확인', message: '변경사항을 저장하시겠습니까?' },
  complete: { title: '회원정보 수정 완료', message: '회원정보가 변경되었습니다.' },
  unverified: {
    title: '휴대폰 본인인증 확인',
    message: '휴대폰 본인인증 후 변경사항을 저장해주세요.',
  },
};

type Props = {
  notice: ProfileEditNotice;
  onDismiss: () => void;
  onConfirm: () => void;
};

/** 회원정보 편집의 확인·완료·본인인증 안내를 공통 모달로 표시합니다. (Displays profile editing confirmations and notices using shared dialogs.) */
export function ProfileEditDialogs({ notice, onDismiss, onConfirm }: Props) {
  const { title, message } = notices[notice];
  const props = {
    open: true,
    title,
    closeLabel: `${title} 닫기`,
    onOpenChange: (open: boolean) => {
      if (!open) onDismiss();
    },
    onConfirm,
    children: (
      <Typography as="p" variant="body3">
        {message}
      </Typography>
    ),
  };

  return notice === 'cancel' || notice === 'save' ? (
    <ConfirmDialog {...props} />
  ) : (
    <SingleActionDialog {...props} size="sm" />
  );
}
