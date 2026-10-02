import { Link } from 'react-router-dom';
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
      bg: '#111',
      color: '#fff',
      fontSize: '28px',
    },
    '& p': { mt: '3', mb: 0, color: 'var(--color-text-muted)', fontSize: '14px' },
  }),
  primary: css({
    display: 'grid',
    w: '100%',
    maxW: '240px',
    minH: '50px',
    mt: '7',
    placeItems: 'center',
    bg: '#111',
    color: '#fff',
    fontWeight: 700,
  }),
};

export function SignupCompleteStep({ name }: { name: string }) {
  return (
    <section className={styles.complete} aria-labelledby="complete-title">
      <span aria-hidden="true">✓</span>
      <h2 id="complete-title">회원가입이 완료되었습니다.</h2>
      <p>{name}님, HOKA 멤버십에 오신 것을 환영합니다.</p>
      <Link className={styles.primary} to="/login">
        로그인하러 가기
      </Link>
    </section>
  );
}
