import { Box } from 'styled-system/jsx';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import styles from '@/shared/features/teamwear/TeamwearPage.module.scss';
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
