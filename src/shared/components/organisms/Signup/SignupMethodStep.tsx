'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, Center, Grid, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  id: SignupMethod;
  label: string;
  description: string;
};

const styles = {
  benefit: css({
    border: '1px solid var(--color-black-20)',
    borderRadius: '8px',
    color: 'var(--color-text-primary)',
    textAlign: 'center',
    '& svg': { w: '20px', h: '20px' },
  }),
  benefitsLink: css({ textUnderlineOffset: '3px' }),
};

const kakaoStyle = {
  '--button-bg': '#FAE100',
  '--button-color': 'var(--color-black-100)',
  '--button-border-color': '#FAE100',
  '--button-border-width': '0px',
} as CSSProperties;

const naverStyle = {
  '--button-bg': '#03C75A',
  '--button-color': 'var(--color-white-000)',
  '--button-border-color': '#03C75A',
  '--button-border-width': '0px',
} as CSSProperties;

const localStyle = {
  '--button-bg': 'var(--color-black-100)',
  '--button-color': 'var(--color-white-000)',
  '--button-border-color': 'var(--color-black-100)',
  '--button-border-width': '0px',
} as CSSProperties;

type SignupMethodStepProps = {
  methods: SignupMethodOption[];
  onSelect: (method: SignupMethod) => void;
};

export function SignupMethodStep({ methods, onSelect }: SignupMethodStepProps) {
  const methodById = new Map(methods.map((method) => [method.id, method]));

  return (
    <section aria-labelledby="signup-title">
      <Stack gap="3">
        <Typography as="h1" web="heading7" mo="heading5" id="signup-title">
          가입과 동시에 시작되는 혜택!
        </Typography>
        <Typography as="p" variant="body3" tone="tertiary">
          HOKA Korea 온라인 회원만을 위한 특별한 혜택!
        </Typography>
      </Stack>

      <Grid columns={3} gap="1.5" mt="6" aria-label="회원가입 혜택">
        <Grid
          alignContent="center"
          justifyItems="center"
          gap="3"
          minH="108px"
          py="3"
          px="1"
          className={styles.benefit}
        >
          <Icon name="gift" size="18px" />
          <Typography as="span" variant="body4">
            신규가입
            <br />
            1만원 쿠폰
          </Typography>
        </Grid>
        <Grid
          alignContent="center"
          justifyItems="center"
          gap="3"
          minH="108px"
          py="3"
          px="1"
          className={styles.benefit}
        >
          <Icon name="partyHorn" size="18px" />
          <Typography as="span" variant="body4">
            기념일
            <br />
            축하 쿠폰
          </Typography>
        </Grid>
        <Grid
          alignContent="center"
          justifyItems="center"
          gap="3"
          minH="108px"
          py="3"
          px="1"
          className={styles.benefit}
        >
          <Icon name="medal" size="18px" />
          <Typography as="span" variant="body4">
            회원 등급별
            <br />
            혜택
          </Typography>
        </Grid>
      </Grid>

      <Center mt="6">
        <Link className={styles.benefitsLink} href="/support/member-benefits">
          <Typography as="span" variant="textLinkKr2">
            회원 등급별 혜택 더 보기
          </Typography>
        </Link>
      </Center>

      <Stack gap="2" mt="9">
        <Button
          fullWidth
          icon={<Icon name="social/kakao" size="18px" />}
          onClick={() => onSelect(methodById.get('kakao')!.id)}
          style={kakaoStyle}
          variant="primary"
          size="tall"
        >
          카카오 계정으로 신규가입
        </Button>
        <Button
          fullWidth
          icon={<Icon name="social/naver" size="18px" />}
          onClick={() => onSelect(methodById.get('naver')!.id)}
          style={naverStyle}
          variant="primary"
          size="tall"
        >
          네이버 계정으로 신규가입
        </Button>
        <Button
          fullWidth
          onClick={() => onSelect(methodById.get('local')!.id)}
          style={localStyle}
          variant="primary"
          size="tall"
        >
          만 14세 이상 회원가입
        </Button>
      </Stack>
      <Box mt="4" textAlign="center">
        <Typography as="p" variant="body5">
          만 14세 미만은 회원가입 및 이용이 불가합니다.
        </Typography>
      </Box>
    </section>
  );
}
