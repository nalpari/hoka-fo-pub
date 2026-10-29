'use client';

import { css } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const styles = {
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
};

type Props = { onClose: () => void; onConfirm: () => void };

/** 계정 잠금 안내와 해제 액션을 표시합니다. (Displays the account lock notice and recovery action.) */
export function AccountLockedContent({ onClose, onConfirm }: Props) {
  return (
    <ModalDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="아이디 / 비밀번호 찾기"
      closeLabel="안내 닫기"
      size="md"
      actions={{ kind: 'single', onConfirm: onConfirm }}
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
    </ModalDialog>
  );
}
