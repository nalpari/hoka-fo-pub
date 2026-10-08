import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  id: SignupMethod;
  label: string;
  description: string;
};

const styles = {
  choice: css({}),
  title: css({
    m: 0,
    fontSize: '20' /* 기존 22px */,
    fontWeight: 'var(--font-weights-black)',
    lineHeight: 'var(--line-heights-body)',
    letterSpacing: 'var(--letter-spacings-korean)',
  }),
  description: css({
    mt: '3',
    mb: 0,
    color: 'var(--color-black-50)',
    fontSize: '16',
    lineHeight: 'var(--line-heights-body)',
  }),
  benefits: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '1.5',
    mt: '6',
  }),
  benefit: css({
    display: 'grid',
    alignContent: 'center',
    justifyItems: 'center',
    gap: '3',
    minH: '108px',
    p: '3 1',
    border: '1px solid var(--color-black-20)',
    borderRadius: 'full',
    color: 'var(--color-black-100)',
    textAlign: 'center',
    '& svg': { w: '20px', h: '20px' },
    '& span': { fontSize: '14', lineHeight: 'var(--line-heights-body)' },
  }),
  benefitsLink: css({
    display: 'block',
    w: 'fit-content',
    mx: 'auto',
    mt: '6',
    color: 'var(--color-black-100)',
    fontSize: '12',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
  }),
  methods: css({ display: 'grid', gap: '2', mt: '9' }),
  methodButton: css({
    w: '100%',
    minH: '48px',
    borderRadius: 'full',
    '--button-border-width': '0px',
    '& > span': { borderRadius: 'full' },
    '& > span > span': { h: '48px', minH: '48px', maxH: '48px', gap: '3' },
    '& > span > span > span:first-child': {
      fontSize: '16',
      fontWeight: 'var(--font-weights-semibold)',
    },
  }),
  kakaoIcon: css({ w: '16px', h: '16px' }),
  naverIcon: css({
    fontSize: '16',
    fontWeight: 'var(--font-weights-black)',
    fontStyle: 'normal',
  }),
  ageNote: css({
    mt: '4',
    mb: 0,
    color: 'var(--color-black-100)',
    fontSize: '12',
    lineHeight: 'var(--line-heights-body)',
    textAlign: 'center',
  }),
};

const kakaoStyle = {
  '--button-height': '48px',
  '--button-bg': 'var(--color-citrus-100)',
  '--button-color': 'var(--color-black-100)',
  '--button-border-color': 'var(--color-citrus-100)',
  '--button-border-width': '0px',
} as CSSProperties;

const naverStyle = {
  '--button-height': '48px',
  '--button-bg': 'var(--color-black-60)',
  '--button-color': 'var(--color-white-000)',
  '--button-border-color': 'var(--color-black-60)',
  '--button-border-width': '0px',
} as CSSProperties;

const localStyle = {
  '--button-height': '48px',
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
    <section className={styles.choice} aria-labelledby="signup-title">
      <h1 className={styles.title} id="signup-title">
        가입과 동시에 시작되는 혜택!
      </h1>
      <p className={styles.description}>HOKA Korea 온라인 회원만을 위한 특별한 혜택!</p>

      <div className={styles.benefits} aria-label="회원가입 혜택">
        <div className={styles.benefit}>
          <Icon name="gift" size="18px" />
          <span>
            신규가입
            <br />
            1만원 쿠폰
          </span>
        </div>
        <div className={styles.benefit}>
          <Icon name="partyHorn" size="18px" />
          <span>
            기념일
            <br />
            축하 쿠폰
          </span>
        </div>
        <div className={styles.benefit}>
          <Icon name="medal" size="18px" />
          <span>
            회원 등급별
            <br />
            혜택
          </span>
        </div>
      </div>

      <Link className={styles.benefitsLink} to="/support/member-benefits">
        회원 등급별 혜택 더 보기
      </Link>

      <div className={styles.methods}>
        <Button
          className={styles.methodButton}
          fullWidth
          icon={
            <svg aria-hidden="true" className={styles.kakaoIcon} viewBox="0 0 24 24">
              <path
                d="M12 3C6.8 3 2.5 6.2 2.5 10.1c0 2.5 1.7 4.7 4.2 5.9l-1 4.2 4.8-2.5c.5.1 1 .1 1.5.1 5.2 0 9.5-3.2 9.5-7.7S17.2 3 12 3Z"
                fill="currentColor"
              />
            </svg>
          }
          onClick={() => onSelect(methodById.get('kakao')!.id)}
          style={kakaoStyle}
          variant="primary"
        >
          카카오 계정으로 신규가입
        </Button>
        <Button
          className={styles.methodButton}
          fullWidth
          icon={
            <i aria-hidden="true" className={styles.naverIcon}>
              N
            </i>
          }
          onClick={() => onSelect(methodById.get('naver')!.id)}
          style={naverStyle}
          variant="primary"
        >
          네이버 계정으로 신규가입
        </Button>
        <Button
          className={styles.methodButton}
          fullWidth
          onClick={() => onSelect(methodById.get('local')!.id)}
          style={localStyle}
          variant="primary"
        >
          만 14세 이상 회원가입
        </Button>
      </div>
      <p className={styles.ageNote}>만 14세 미만은 회원가입 및 이용이 불가합니다.</p>
    </section>
  );
}
