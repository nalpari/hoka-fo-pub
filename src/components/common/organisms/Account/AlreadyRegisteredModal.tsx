import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';

import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

const styles = {
  body: css({ gap: '4' }),
  heading: css({ m: '0' }),
  description: css({ m: '0' }),
};

export type AlreadyRegisteredModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function AlreadyRegisteredModal({ onOpenChange, onConfirm }: AlreadyRegisteredModalProps) {
  return (
    <SingleActionDialog
      open
      onOpenChange={onOpenChange}
      title="회원가입"
      closeLabel="이미 가입한 회원 안내 닫기"
      size="md"
      onConfirm={onConfirm}
    >
      <ContentHeader
        gap="4"
        className={styles.body}
        titleAs="h2"
        title="이미 가입된 회원이 있습니다"
        titleProps={{ variant: 'body2', className: styles.heading }}
        description="입력하신 정보로 이미 가입한 회원이 있습니다. 가입정보가 기억나지 않으시면 ID/비밀번호 찾기 메뉴를 사용하거나 고객센터로 문의해주세요."
        descriptionProps={{ variant: 'body4', className: styles.description }}
      />
    </SingleActionDialog>
  );
}
