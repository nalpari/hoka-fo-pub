'use client';

import { css } from 'styled-system/css';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const styles = {
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
};

type Props = { onClose: () => void; onConfirm: () => void };

/** 계정 잠금 안내와 해제 액션을 표시합니다. (Displays the account lock notice and recovery action.) */
export function AccountLockedContent({ onClose, onConfirm }: Props) {
  return (
    <ModalDialog
      variant="alert"
      open
      onOpenChange={(open) => !open && onClose()}
      title="아이디 / 비밀번호 찾기"
      closeLabel="안내 닫기"

      actions={{ kind: 'single', onConfirm: onConfirm }}
      message="계정 잠금상태입니다"
      description={
        <>
          서비스 이용을 위해 계정잠금을 해제해주세요.&nbsp;
          <span className={styles.descriptionSecondLine}>PASS 인증화면으로 이동합니다.</span>
        </>
      }
    />
  );
}
