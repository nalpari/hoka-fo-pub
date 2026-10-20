'use client';

import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

const styles = {
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
    <Grid
      as="section"
      gap="normal"
      justifyItems="center"
      pt="46px"
      pb="2"
      textAlign="center"
      css={{
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
      }}
      aria-labelledby="complete-title"
    >
      <span aria-hidden="true">✓</span>
      <ContentHeader
        gap="3"
        titleAs="h2"
        title="회원가입이 완료되었습니다."
        titleProps={{ variant: 'heading7', id: 'complete-title' }}
        description={<>{name}님, HOKA 멤버십에 오신 것을 환영합니다.</>}
        descriptionProps={{ variant: 'body4', tone: 'tertiary' }}
      />
      <Link className={styles.primary} href="/login">
        <Typography as="span" variant="cta1" tone="inverse">
          로그인하러 가기
        </Typography>
      </Link>
    </Grid>
  );
}
