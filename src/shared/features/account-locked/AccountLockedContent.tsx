import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

const styles = {
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
};

type Props = { onClose: () => void; onConfirm: () => void };

export function AccountLockedContent({ onClose, onConfirm }: Props) {
  return (
    <SingleActionDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="아이디 / 비밀번호 찾기"
      closeLabel="안내 닫기"
      size="md"
      onConfirm={onConfirm}
    >
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="계정 잠금상태입니다"
        titleProps={{ variant: 'body2' }}
        description={
          <>
            서비스 이용을 위해 계정잠금을 해제해주세요.&nbsp;
            <Typography as="span" className={styles.descriptionSecondLine}>
              휴대폰 인증화면으로 이동합니다.
            </Typography>
          </>
        }
        descriptionProps={{ variant: 'body4' }}
      />
    </SingleActionDialog>
  );
}
