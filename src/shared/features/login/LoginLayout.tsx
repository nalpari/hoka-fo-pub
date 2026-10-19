import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';

import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  title: css({ m: '0', mb: '10' }),
};

export function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <AccountPageLayout pageCss={css.raw({ pb: '124px' })}>
      <Typography as="h1" variant="loginTitle" className={styles.title} id="login-title">
        HOKA Korea에
        <br />
        오신것을 환영합니다
      </Typography>
      {children}
    </AccountPageLayout>
  );
}
