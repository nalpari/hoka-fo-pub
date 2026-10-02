import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
const styles = {
  page: css({ minH: '750px', '--support-padding-bottom': '130px', _mobile: { minH: '0' } }),
  content: css({ '--support-content-title-gap': '37px' }),
  service: css({ display: 'grid', gridTemplateColumns: '1fr 1.08fr', borderTop: '2px solid #555', _mobile: { gridTemplateColumns: '1fr' } }),
  labels: css({ display: 'grid', gridTemplateRows: '1fr 1fr', _mobile: { display: 'block' }, '& article': { minH: '214px', p: '43px 0 0 3', _mobile: { minH: '0', p: '30px 0 3' } }, '& h2': { m: '0 0 9px', fontFamily: 'var(--font-family-base)', fontSize: '35px', fontWeight: '400', _mobile: { fontSize: '29px' } }, '& p': { m: '0', color: '#777', fontSize: '12px' } }),
  details: css({ '& article': { minH: '214px', p: '47px 0 5', borderBottom: '1px solid #ddd', _mobile: { minH: '0', py: '6' } }, '& strong, & b': { fontSize: '12px' }, '& strong': { lineHeight: '1.6' }, '& hr': { m: '42px 0 21px', border: '0', borderTop: '1px solid #ddd', _mobile: { m: '25px 0 15px' } }, '& p': { m: '5px 0 0', color: '#888', fontSize: '11px', lineHeight: '1.6' } }),
  notice: css({ color: '#222!' }),
  actions: css({ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', mt: '78px', border: '1px solid #ddd', _mobile: { gridTemplateColumns: '1fr', mt: '45px' }, '& a': { display: 'flex', alignItems: 'center', gap: '3', minH: '124px', p: '18px 26px', borderRight: '1px solid #ddd', _mobile: { minH: '85px', p: '15px', borderRight: '0', borderBottom: '1px solid #ddd' } }, '& a:last-child': { border: '0' }, '& b': { fontSize: '31px', fontWeight: '400' }, '& span': { display: 'grid', gap: '1.5' }, '& strong': { fontSize: '14px' }, '& small': { color: '#888', fontSize: '10px', lineHeight: '1.4' } }),
};

const sections: [string, string[]][] = [
  ['NEED HELP', ['고객센터', 'FAQs', '공지사항', '1:1 문의', '매장 찾기', 'App 다운로드']],
  [
    'INFORMATION',
    [
      '온라인 회원 등급 안내',
      '통합 마일리지 안내',
      '팀/단체복 주문 안내',
      '배송 및 반품 안내',
      '세탁 및 손질 방법 안내',
      '약관',
    ],
  ],
  [
    'MEMBERS ONLY SERVICE',
    ['회원 전용 쿠폰 혜택', '회원 전용 서비스 제공', '회원 전용 이벤트 참여'],
  ],
];

export function SupportPage() {
  void sections;
  return (
    <SidebarNavigationLayout
      activePath="/support"
      className={styles.page}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={styles.content}>
        <PageHeader title="고객센터" />
        <Grid className={styles.service}>
          <Box className={styles.labels}>
            <article>
              <h2>고객상담실</h2>
              <p>A/S 및 오프라인 매장 관련 문의</p>
            </article>
            <article>
              <h2>온라인 스토어</h2>
              <p>주문/배송 및 반품 관련 문의</p>
            </article>
          </Box>
          <Box className={styles.details}>
            <article>
              <strong>
                호카 고객상담실
                <br />
                TEL. 080-999-0456
              </strong>
              <hr />
              <b>운영시간</b>
              <p>평일 : 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00) / 토, 일, 공휴일 휴무</p>
            </article>
            <article>
              <strong>
                호카 온라인 스토어
                <br />
                TEL. 1566-0086
              </strong>
              <p className={styles.notice}>
                * 아래 1:1 문의를 이용하시면 조금 더 빠르게 답변 받으실 수 있습니다.
              </p>
              <hr />
              <b>운영시간</b>
              <p>
                - 일반 유선상담 : 평일 10:00~17:00 (점심시간 12:00~13:00)
                <br />- 채팅, 카카오톡 : 휴무
                <br />- A/S상담예약 : 점심시간 및 토요일/일요일/공휴일 운영
              </p>
            </article>
          </Box>
        </Grid>
        <section className={styles.actions}>
          {[
            [
              '✉',
              '1:1 문의',
              '1:1 문의를 남겨 주시면 빠른 시간 내에 도와드리겠습니다.',
              '/support/inquiries',
            ],
            ['▱', 'FAQs', '가장 자주 묻는 질문과 답변을 찾아보세요.', '/support/faq'],
            ['●', 'A/S 처리현황', 'A/S 접수 후 처리 상황을 확인해 보세요.', '/support/after-sales'],
          ].map(([icon, title, description, to]) => (
            <Link to={to} key={title}>
              <b>{icon}</b>
              <span>
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
            </Link>
          ))}
        </section>
      </section>
    </SidebarNavigationLayout>
  );
}
