'use client';

/**
 * [개발팀 바인딩]
 * 이 화면은 잠금 안내/인증 이동 UI입니다. 실제 계정 잠금 여부는 로그인 서버 응답으로 판단하고 이 경로로 연결합니다.
 * 잠금 해제 요청은 verification 경로의 AccountServicesContext.unlock에서 처리하며 안내 확인 클릭만으로 계정 상태를 바꾸지 않습니다.
 */

import { useRouter } from 'next/navigation';

import { css } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const styles = {
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
};

type Props = { onClose: () => void; onConfirm: () => void };

function AccountLockedContent({ onClose, onConfirm }: Props) {
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

/** 계정 잠금 안내와 해제 절차의 진입 화면을 표시합니다. (Displays account lock information and entry to the unlock flow.) */
export default function Page() {
  const router = useRouter();
  return (
    <AccountLockedContent
      onClose={() => router.push('/login')}
      onConfirm={() => router.push('/login/account-locked/verification')}
    />
  );
}
