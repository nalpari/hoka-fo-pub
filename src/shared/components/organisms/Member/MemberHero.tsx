import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';

export type MemberHeroData = {
  name: string;
  tier: string;
  rewardPoints: number;
  coupons: number;
  nextTierAmount?: number;
  nextTierOrderCount?: number;
};

type Props = { member: MemberHeroData };

const hero = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '30px',
  p: '36px 40px',
  bg: 'var(--color-black-100)',
  color: 'var(--color-white-000)',
  _mobile: { display: 'block', p: '28px 22px' },
});

const eyebrow = css({ fontSize: '12' /* 기존: 11px */, letterSpacing: 'mono' });

const name = css({ m: '8px 0', fontSize: '28' /* 기존 30px */ });

const description = css({ m: '0', color: 'var(--color-black-20)', fontSize: '14' /* 기존 13px */ });

const progressDescription = css({
  mt: '4',
  mb: '0',
  color: 'var(--color-black-20)',
  fontSize: '12',
  lineHeight: 'body',
});

const stats = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))',
  borderLeft: '1px solid var(--color-black-60)',
  _mobile: { mt: '25px', borderTop: '1px solid var(--color-black-60)', borderLeft: '0' },
});

const stat = css({
  display: 'grid',
  alignContent: 'center',
  gap: '9px',
  px: '6',
  borderRight: '1px solid var(--color-black-60)',
  _mobile: { pt: '18px', pr: '3', pl: '0', borderRight: '0' },
});

const statLabel = css({ color: 'var(--color-black-40)', fontSize: '12' });

const statValue = css({ fontSize: '28' /* 기존 27px */ });

const statUnit = css({ ml: '3px', fontSize: '14' /* 기존 13px */, letterSpacing: 'normal' });

export function MemberHero({ member }: Props) {
  return (
    <section className={hero} aria-label="멤버십 요약">
      <div>
        <small className={eyebrow}>WELCOME BACK</small>
        <h1 className={name}>{member.name}님</h1>
        <p className={description}>
          <b>{member.tier}</b> 등급의 멤버 혜택을 이용하고 있어요.
        </p>
        {member.nextTierAmount && member.nextTierOrderCount ? (
          <p className={progressDescription}>
            다음 등급까지 {member.nextTierAmount.toLocaleString()}원 · {member.nextTierOrderCount}회
            남았어요.
          </p>
        ) : null}
      </div>
      <div className={stats}>
        <Link to="/mypage/rewards" className={stat}>
          <span className={statLabel}>HOKA 리워드</span>
          <strong className={statValue}>
            {member.rewardPoints.toLocaleString()}
            <small className={statUnit}>P</small>
          </strong>
        </Link>
        <Link to="/mypage/coupons" className={stat}>
          <span className={statLabel}>사용 가능 쿠폰</span>
          <strong className={statValue}>
            {member.coupons}
            <small className={statUnit}>장</small>
          </strong>
        </Link>
      </div>
    </section>
  );
}
