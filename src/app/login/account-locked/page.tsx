'use client';

import { useRouter } from 'next/navigation';

import { css } from 'styled-system/css';

import { Typography } from '@/components/common/atoms/Typography/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

const styles = {
  descriptionSecondLine: css({ display: 'inline', _mobile: { display: 'block' } }),
};

type Props = { onClose: () => void; onConfirm: () => void };

function AccountLockedContent({ onClose, onConfirm }: Props) {
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
