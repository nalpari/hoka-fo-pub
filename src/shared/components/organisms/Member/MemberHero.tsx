'use client';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Flex, Grid } from 'styled-system/jsx';

export type MemberHeroData = {
  name: string;
  tier: string;
  rewardPoints: number;
  coupons: number;
  nextTierAmount?: number;
  nextTierOrderCount?: number;
};

type Props = { member: MemberHeroData };

const eyebrow = css({ fontSize: '12' /* 기존: 11px */, letterSpacing: 'mono' });

const name = css({ m: '8px 0', fontSize: '28' /* 기존 30px */ });

const description = css({ m: '0' });

const progressDescription = css({
  mt: '4',
  mb: '0',
});

const stat = css({
  display: 'grid',
  alignContent: 'center',
  gap: '9px',
  px: '6',
  borderRight: '1px solid var(--color-black-60)',
  _mobile: { pt: '18px', pr: '3', pl: '0', borderRight: '0' },
});

const statValue = css({ fontSize: '28' /* 기존 27px */ });

const statUnit = css({ ml: '3px', fontSize: '14' /* 기존 13px */, letterSpacing: 'normal' });

export function MemberHero({ member }: Props) {
  return (
    <Flex
      as="section"
      justifyContent="space-between"
      gap="30px"
      p="36px 40px"
      bg="var(--color-black-100)"
      color="var(--color-text-inverse)"
      _mobile={{ display: 'block', p: '28px 22px' }}
      aria-label="멤버십 요약"
    >
      <div>
        <small className={eyebrow}>WELCOME BACK</small>
        <Typography as="h1" className={name}>
          {member.name}님
        </Typography>
        <Typography as="p" variant="body4" tone="black20" className={description}>
          <b>{member.tier}</b> 등급의 멤버 혜택을 이용하고 있어요.
        </Typography>
        {member.nextTierAmount && member.nextTierOrderCount ? (
          <Typography as="p" variant="body5" tone="black20" className={progressDescription}>
            다음 등급까지 {member.nextTierAmount.toLocaleString()}원 · {member.nextTierOrderCount}회
            남았어요.
          </Typography>
        ) : null}
      </div>
      <Grid
        gap="normal"
        gridTemplateColumns="repeat(2, minmax(130px, 1fr))"
        borderLeft="1px solid var(--color-black-60)"
        _mobile={{ mt: '25px', borderTop: '1px solid var(--color-black-60)', borderLeft: '0' }}
      >
        <Link href="/mypage/rewards" className={stat}>
          <Typography variant="body5" tone="black40">
            HOKA 리워드
          </Typography>
          <strong className={statValue}>
            {member.rewardPoints.toLocaleString()}
            <small className={statUnit}>P</small>
          </strong>
        </Link>
        <Link href="/mypage/coupons" className={stat}>
          <Typography variant="body5" tone="black40">
            사용 가능 쿠폰
          </Typography>
          <strong className={statValue}>
            {member.coupons}
            <small className={statUnit}>장</small>
          </strong>
        </Link>
      </Grid>
    </Flex>
  );
}
