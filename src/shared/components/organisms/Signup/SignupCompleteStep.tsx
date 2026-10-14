'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';

const styles = {
  complete: css({
    display: 'grid',
    justifyItems: 'center',
    pt: '46px',
    pb: '2',
    textAlign: 'center',
    '& > span': {
      display: 'grid',
      w: '58px',
      h: '58px',
      mb: '5',
      borderRadius: '50%',
      placeItems: 'center',
      bg: 'var(--color-black-100)',
      color: 'var(--color-text-inverse)',
      fontSize: '28',
    },
  }),
  primary: css({
    display: 'grid',
    w: '100%',
    maxW: '240px',
    minH: '50px',
    mt: '7',
    placeItems: 'center',
    bg: 'var(--color-black-100)',
    color: 'var(--color-text-inverse)',
  }),
};

export function SignupCompleteStep({ name }: { name: string }) {
  return (
    <section className={styles.complete} aria-labelledby="complete-title">
      <span aria-hidden="true">✓</span>
      <Typography as="h2" variant="heading7" id="complete-title">
        회원가입이 완료되었습니다.
      </Typography>
      <Typography as="p" variant="body4" tone="tertiary" className={css({ mt: '3', mb: '0' })}>
        {name}님, HOKA 멤버십에 오신 것을 환영합니다.
      </Typography>
      <Link className={styles.primary} href="/login">
        <Typography as="span" variant="cta1" tone="inverse">
          로그인하러 가기
        </Typography>
      </Link>
    </section>
  );
}
