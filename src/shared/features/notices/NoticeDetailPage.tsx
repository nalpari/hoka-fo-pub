import { Link } from 'react-router-dom';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
const styles = {
  noticeHead: css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minH: '77px', px: '5', borderTop: '2px solid #555', borderBottom: '1px solid #ddd', _mobile: { display: 'block', p: '4.5 1.25' }, '& h2': { m: '0', fontSize: '14px', _mobile: { lineHeight: '1.5' } }, '& span': { color: '#888', fontSize: '11px', _mobile: { display: 'block', mt: '2.5' } } }),
  poster: css({ w: '565px', minH: '1110px', mt: '30px', p: '55px 7', border: '8px solid #ddd', borderTop: '8px solid #e60032', _mobile: { w: '100%', minH: '0', p: '8 19px', borderWidth: '5px' }, '& > h2': { m: '0', fontSize: '34px', lineHeight: '1.45', _mobile: { fontSize: '26px' } }, '& em': { fontStyle: 'normal' }, '& section': { mt: '43px' }, '& h3': { m: '29px 0 2', fontSize: '20px', _mobile: { fontSize: '17px' } }, '& p': { m: '0', fontSize: '17px', lineHeight: '1.75', _mobile: { fontSize: '14px' } }, '& strong': { color: '#e60032', fontSize: '16px', fontWeight: '400' } }),
  brand: css({ mb: '38px', color: '#e60032', fontSize: '48px', fontStyle: 'italic', fontWeight: '900', letterSpacing: '-0.2em' }),
  back: css({ mt: '180px', pt: '6', borderTop: '1px solid #ddd', textAlign: 'right', _mobile: { mt: '65px' }, '& a': { display: 'inline-block', p: '2.5 7', border: '1px solid #222', fontSize: '12px' } }),
};

export function NoticeDetailPage() {
  return (
    <SidebarNavigationLayout
      activePath="/support/notices"
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section>
        <PageHeader title="공지사항" />
        <header className={styles.noticeHead}>
          <h2>[공통] 네이버페이 9월 프로모션 안내 (9/1 00:00 ~ 9/14 9:59)</h2>
          <span>2026-08-31 | 5054</span>
        </header>
        <article className={styles.poster}>
          <Box className={styles.brand}>NB</Box>
          <h2>
            네이버페이 결제 혜택
            <br />
            <em>
              10만원 이상 결제 시<br />
              7천원 즉시할인
            </em>
          </h2>
          <section>
            <h3>1. 이벤트 진행기간</h3>
            <p>
              - 9/1 00:00 - 9/14 09:59
              <br />
              <strong>
                ※해당 이벤트는 당사 사정(예산 소진 등)에 의해 조기 종료될 수 있습니다.
              </strong>
            </p>
            <h3>2. 이벤트 적용 조건</h3>
            <p>- 네이버페이로 결제 시</p>
            <h3>3. 대상 상품</h3>
            <p>- 호카 공식 홈페이지 내 전 상품</p>
            <h3>4. 유의 사항</h3>
            <p>
              - 이벤트 기간 내 1회 한정으로 진행됩니다.
              <br />- 할인 금액 및 적용 여부는 네이버페이 결제창 및 결제 상세에서 확인 부탁드립니다.
              <br />- 해당 이벤트는 당사 사정에 의해 조기 종료될 수 있습니다.
              <br />- 즉시 할인 금액은 네이버페이 포인트 적립 및 현금영수증 발급 대상 금액에
              포함되지 않습니다.
              <br />- 결제 취소 시 할인 금액이 회수될 수 있습니다.
            </p>
          </section>
        </article>
        <Box className={styles.back}>
          <Link to="/support/notices">목록보기</Link>
        </Box>
      </section>
    </SidebarNavigationLayout>
  );
}
