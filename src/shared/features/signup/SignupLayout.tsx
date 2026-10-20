import type { ComponentProps, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';

import { SignupProgress } from '@/shared/components/molecules/Signup/SignupProgress';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  pageTitle: css({
    mt: '2',
    mb: '7',
  }),
  eyebrow: css({
    m: 0,
  }),
};

type Props = ComponentProps<typeof SignupProgress> & { children: ReactNode };

export function SignupLayout({ step, method, children }: Props) {
  return (
    <AccountPageLayout
      contentAs="section"
      contentLabelledBy="signup-title"
      fillMobileViewport
      pageCss={css.raw({ pt: '24', pb: '24' })}
      contentCss={css.raw({ w: '100%', minW: 0 })}
    >
      {step !== 0 ? (
        <>
          <Typography
            as="p"
            variant="body5"
            tone="tertiary"
            weight="medium"
            className={styles.eyebrow}
          >
            JOIN HOKA
          </Typography>
          <Typography as="h1" variant="heading6" className={styles.pageTitle} id="signup-title">
            회원가입
          </Typography>
          <SignupProgress method={method} step={step} />
        </>
      ) : null}
      {children}
    </AccountPageLayout>
  );
}
