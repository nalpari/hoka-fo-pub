import { Box } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const styles = {
  page: css({ minH: '800px', '--support-padding-bottom': '130px', _mobile: { minH: '0' } }),
  content: css({ '--support-content-title-gap': '37px' }),
  hero: css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    h: '300px',
    overflow: 'hidden',
    bg: 'linear-gradient(var(--color-black-20) 0 50%, var(--color-black-50) 51% 72%, var(--color-black-40) 73%)',
    _mobile: { h: '215px' },
    '&::after': {
      position: 'absolute',
      inset: '0',
      bg: 'linear-gradient(90deg, color-mix(in srgb, var(--color-black-100) 20%, transparent), transparent 52%, color-mix(in srgb, var(--color-black-100) 15%, transparent))',
      content: "''",
    },
  }),
  personOne: css({
    position: 'absolute',
    bottom: '-44px',
    left: '160px',
    w: '185px',
    h: '300px',
    borderRadius: '48% 48% 10% 10%',
    bg: 'linear-gradient(90deg, var(--color-black-40) 0 28%, var(--color-black-60) 29% 75%, var(--color-black-40) 76%)',
    transform: 'rotate(7deg)',
    _mobile: { left: '45px', transform: 'scale(0.72)', transformOrigin: 'bottom' },
  }),
  personTwo: css({
    position: 'absolute',
    bottom: '-44px',
    right: '55px',
    w: '170px',
    h: '300px',
    borderRadius: '48% 48% 10% 10%',
    bg: 'linear-gradient(90deg, var(--color-black-60), var(--color-black-100) 55%, var(--color-black-50))',
    transform: 'rotate(-8deg)',
    _mobile: { right: '-20px', transform: 'scale(0.72)', transformOrigin: 'bottom' },
  }),
  heroCopy: css({
    position: 'relative',
    zIndex: '1',
    color: 'var(--color-white-000)',
    textAlign: 'center',
    textShadow: '0 1px 2px var(--color-black-60)',
    '& h2': {
      m: '0',
      fontSize: '24',
      fontWeight: 'var(--font-weights-normal)',
      _mobile: { fontSize: '20' /* 기존 19px */ },
    },
    '& p': {
      fontSize: '12' /* 기존: 11px */,
      _mobile: { px: '4.5', fontSize: '12' /* 기존: 9px */ },
    },
  }),
  channels: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1.1fr',
    gap: '0 10',
    pt: '62px',
    _mobile: { gridTemplateColumns: '1fr', gap: '0', pt: '38px' },
    '& article': {
      minH: '218px',
      py: '7',
      borderTop: '2px solid var(--color-black-60)',
      _mobile: { minH: '155px', py: '22px' },
    },
    '& strong': { fontSize: '12', lineHeight: 'var(--line-heights-body)' },
    '& p': { m: '6px 0', fontSize: '12' /* 기존: 11px */ },
    '& hr': { m: '6 0 4.5', border: '0', borderTop: '1px solid var(--color-black-20)' },
    '& b': { display: 'block', mb: '2', fontSize: '12' },
    '& small': { color: 'var(--color-black-50)', fontSize: '12' /* 기존: 11px */ },
  }),
  label: css({
    minH: '218px',
    _mobile: { minH: '100px' },
    '& h2': {
      m: '0 0 var(--spacing-2)',
      fontFamily: 'var(--font-family-base)',
      fontSize: '32' /* 기존 34px */,
      fontWeight: 'var(--font-weights-normal)',
      letterSpacing: 'var(--letter-spacings-korean)',
      _mobile: { fontSize: '28' },
    },
    '& p': { m: '0', color: 'var(--color-black-40)' },
  }),
  note: css({
    m: '0',
    py: '6',
    borderTop: '1px solid var(--color-black-20)',
    color: 'var(--color-black-50)',
    fontSize: '12' /* 기존: 11px */,
    _mobile: { mt: '4', lineHeight: 'var(--line-heights-body)' },
  }),
};

export function TeamwearPage() {
  return (
    <SidebarNavigationLayout
      activePath="/support/teamwear"
      className={styles.page}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={styles.content}>
        <PageHeader title="팀/단체복 주문 안내" />
        <section className={styles.hero}>
          <Box className={styles.personOne} />
          <Box className={styles.personTwo} />
          <Box className={styles.heroCopy}>
            <h2>TEAM WEAR ORDER</h2>
            <p>호카와 하나가 되는 순간, 호카 팀/단체복으로 엑설런트를 함께 느껴 보세요!</p>
          </Box>
        </section>
        <section className={styles.channels}>
          <Box className={styles.label}>
            <h2>ONLINE STORE</h2>
            <p>온라인 스토어</p>
          </Box>
          <article>
            <strong>
              호카 온라인 스토어 고객센터
              <br />
              TEL. 1566-0086
            </strong>
            <p>* 아래 1:1 문의를 이용하시면 조금 더 빠르게 답변 받으실 수 있습니다.</p>
            <hr />
            <b>운영시간</b>
            <small>평일 10:00 ~ 17:00 (점심시간 12:00 ~ 13:00) / 토,일,공휴일 휴무</small>
          </article>
          <Box className={styles.label}>
            <h2>OFFLINE STORE</h2>
            <p>오프라인 스토어</p>
          </Box>
          <article>
            <strong>
              호카 명동직영점
              <br />
              TEL. 02-318-1906
            </strong>
            <hr />
            <small>연중무휴 11:00 ~ 22:00</small>
          </article>
        </section>
        <p className={styles.note}>
          ▸ 팀/단체복 주문 시 B2B, Team 제품 공급은 고객의 주문에 따라 납품가 납기의 변동 될 수
          있으니 담당자와 상담 후 주문 바랍니다.
        </p>
      </section>
    </SidebarNavigationLayout>
  );
}
