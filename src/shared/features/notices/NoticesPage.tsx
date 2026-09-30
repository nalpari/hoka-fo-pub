import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { LoadMoreButton } from '@/shared/components/atoms/LoadMoreButton/LoadMoreButton';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';

const styles = {
  table: css({
    borderTop: '2px solid #555',
    '& button': {
      display: 'grid',
      gridTemplateColumns: '1fr 105px 70px',
      alignItems: 'center',
      w: '100%',
      minH: '67px',
      border: 0,
      borderBottom: '1px solid var(--color-border-subtle)',
      bg: '#fff',
      color: '#333',
      fontSize: '11px',
      textAlign: 'left',
    },
    '& button span': { pl: '13px' },
    '& button time, & button small': { color: '#777', fontSize: '11px', textAlign: 'center' },
    _mobile: {
      '& button': { gridTemplateColumns: '1fr 75px 0' },
      '& button small': { display: 'none' },
    },
  }),
  head: css({
    display: 'grid',
    gridTemplateColumns: '1fr 105px 70px',
    alignItems: 'center',
    h: '41px',
    borderBottom: '1px solid var(--color-border-subtle)',
    fontSize: '11px',
    textAlign: 'center',
    _mobile: { gridTemplateColumns: '1fr 75px 0', '& span:last-child': { display: 'none' } },
  }),
  more: css({ display: 'block', m: '30px auto', border: 0, fontSize: '12px' }),
};

const notices = [
  ['[공통] 네이버페이 9월 프로모션 안내', '2026-08-31', '5053'],
  ['[공통] 2026 광복절 고객센터 운영 안내', '2026-08-13', '150'],
  ['[공통] 네이버페이 8월 프로모션 안내', '2026-08-07', '34334'],
  ['[공통] 호카 서비스 전환 안내', '2026-07-31', '2533'],
  ['[호카] 테크 콤포 디자인 상품 관련 공식 입장', '2026-07-24', '1392'],
  ['[호카] 신발 가격 상승관련 안내', '2026-07-23', '1006'],
  ['[공통] 호카 멤버십 혜택 변경 안내', '2026-07-10', '15532'],
  ['[공통] 호카 멤버십 혜택 수정 예정 안내', '2026-07-01', '90202'],
  ['[호카 키즈] 920 프리들 발매 일정 변경 안내', '2026-05-15', '4474'],
  ['[호카 키즈] 래플 접수 및 결제 가이드', '2026-03-23', '1839'],
  ['[공통] 교환 정책 안내', '2026-01-26', '7215'],
  ['[호카 키즈] 프로모션 안내', '2026-01-15', '4116'],
  ['[공통] 추석 연휴 배송 일정 안내', '2025-12-30', '3264'],
  ['[호카] 겨울 러닝 컬렉션 발매 안내', '2025-12-17', '2180'],
  ['[공통] 개인정보처리방침 개정 안내', '2025-12-03', '1987'],
];

export function NoticesPage() {
  const [shown, setShown] = useState(15);
  return (
    <SidebarNavigationLayout
      activePath="/support/notices"
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section>
        <PageHeader title="공지사항" />
        <Box className={styles.table}>
          <Box className={styles.head}>
            <span>제목</span>
            <span>등록일</span>
            <span>조회수</span>
          </Box>
          {notices.slice(0, shown).map(([title, date, views]) => (
            <Button onClick={() => location.assign('/support/notices/1')} key={title}>
              <span>{title}</span>
              <time>{date}</time>
              <small>{views}</small>
            </Button>
          ))}
        </Box>
        {shown < notices.length && (
          <LoadMoreButton
            className={styles.more}
            onClick={() => setShown((count) => count + 15)}
            remaining={notices.length - shown}
          />
        )}
      </section>
    </SidebarNavigationLayout>
  );
}
