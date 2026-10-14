import type { ComponentProps, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { SignupProgress } from '@/shared/components/molecules/Signup/SignupProgress';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  page: css({
    pt: '20',
    px: '5',
    pb: '24',
    _mobile: {
      pt: '10',
      px: '4',
      pb: '8',
      minH: 'calc(100svh - var(--layout-site-header-height))',
    },
  }),
  signup: css({
    w: '100%',
    maxW: '500px',
    minW: 0,
    mx: 'auto',
  }),
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
    <main className={styles.page}>
      <section className={styles.signup} aria-labelledby="signup-title">
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
      </section>
    </main>
  );
}
