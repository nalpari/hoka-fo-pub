import { useState } from 'react';
import { css } from 'styled-system/css';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { Select } from '@/shared/components/atoms/Select/Select';
import { SegmentedControl } from '@/shared/components/atoms/SegmentedControl/SegmentedControl';

const styles = {
  page: css({ minH: '760px', '--support-padding-bottom': '130px', _mobile: { minH: 0 } }),
  content: css({
    '--support-content-title-gap': '37px',
    '& > select': {
      display: 'block',
      w: '175px',
      h: '37px',
      my: '48px',
      ml: 'auto',
      px: '12px',
      border: '1px solid #ddd',
      bg: '#fff',
      fontSize: '12px',
    },
    _mobile: { '& > select': { mt: '28px' } },
  }),
  tabs: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    borderBottom: '2px solid #333',
    '& button': {
      h: '48px',
      border: '1px solid #ddd',
      borderBottom: 0,
      bg: '#fff',
      fontSize: '13px',
      fontWeight: 700,
    },
    '& .active': { border: '2px solid #333', borderBottom: '2px solid #fff' },
  }),
  document: css({
    overflow: 'auto',
    h: '575px',
    p: '34px 31px',
    border: '1px solid #ddd',
    fontSize: '12px',
    lineHeight: 1.45,
    '& h3': { mt: 0, mb: '25px', color: '#e60032', fontSize: '14px' },
    '& h4': { my: '18px', fontSize: '13px' },
    '& p': { m: 0 },
    '& table': { w: '100%', mt: '18px', borderCollapse: 'collapse', textAlign: 'center' },
    '& th, & td': { p: '12px 6px', border: '1px solid #555' },
    '& th': { bg: '#bad3eb', fontWeight: 400 },
    _mobile: { h: '490px', p: '22px 16px', fontSize: '11px' },
  }),
};

const terms = (
  <>
    <h3>제 1 장 총칙</h3>
    <h4>제 1조 (목적)</h4>
    <p>
      이 약관은 호카가 운영하는 웹사이트 및 모바일 페이지에서 제공하는 인터넷 관련 서비스의 이용
      조건과 절차, 회원과 회사의 권리 및 의무를 규정함을 목적으로 합니다.
    </p>
    <h4>제 2조 (약관의 효력 및 변경)</h4>
    <p>
      회사는 이용자가 쉽게 알 수 있도록 서비스 화면에 게시합니다. 회사는 관련 법령을 위배하지 않는
      범위에서 이 약관을 변경할 수 있으며, 변경된 약관은 공지한 날부터 효력이 발생합니다.
    </p>
    <h4>제 3조 (약관 외 준칙)</h4>
    <p>
      이 약관에 명시되지 않은 사항에 대해서는 관계 법령 및 회사가 정한 서비스의 세부 이용지침에
      따릅니다.
    </p>
    <h4>제 4조 (용어의 정의)</h4>
    <p>
      회원이란 이 약관에 동의하고 개인정보를 제공하여 아이디와 비밀번호를 발급 받아 회원 등록을
      완료한 자를 말합니다. 서비스란 회사가 회원에게 제공하는 온라인 쇼핑 및 관련 서비스를
      의미합니다.
    </p>
  </>
);
const privacy = (
  <>
    <h3>[ 호카 개인정보 처리방침 ]</h3>
    <p>
      호카는 이용자의 자유와 권리 보호를 위해 개인정보보호법 등 관련 법령을 준수합니다. 개인정보
      처리방침을 통해 수집하는 개인정보의 항목과 이용 목적을 안내드립니다.
    </p>
    <h4>개인정보 처리방침의 주요 내용</h4>
    <p>
      제 1조 개인정보 처리 목적, 항목, 보유 및 이용기간
      <br />제 2조 개인정보의 제3자 제공
      <br />제 3조 개인정보의 처리위탁
      <br />제 4조 개인정보 파기 절차 및 방법
      <br />제 5조 개인정보 보호조치
    </p>
    <h4>제 1조 (개인정보 처리 목적, 항목, 보유 및 이용기간)</h4>
    <p>
      회사는 서비스 제공을 위해 필요한 최소한의 범위에서 개인정보를 수집하고 이용합니다. 수집된
      정보는 회원 가입, 주문 및 배송, 고객 상담과 서비스 개선을 위해 사용됩니다.
    </p>
    <table>
      <thead>
        <tr>
          <th>법적 근거</th>
          <th>업무 및 수집목적</th>
          <th>수집 항목</th>
          <th>보유 및 이용기간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>개인정보보호법</td>
          <td>회원가입 및 관리</td>
          <td>아이디, 비밀번호, 성명, 연락처</td>
          <td>회원 탈퇴 시까지</td>
        </tr>
      </tbody>
    </table>
  </>
);
export function TermsPage() {
  const [tab, setTab] = useState<'terms' | 'privacy'>('terms');
  const [date, setDate] = useState('2025-06-02');
  return (
    <SidebarNavigationLayout
      activePath="/support/terms"
      className={styles.page}
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={styles.content}>
        <PageHeader title="약관" />
        <SegmentedControl
          ariaLabel="약관 종류"
          className={styles.tabs}
          onValueChange={setTab}
          options={[
            { value: 'terms', label: '이용약관' },
            { value: 'privacy', label: '개인정보 처리방침' },
          ]}
          value={tab}
        />
        <Select
          aria-label="시행일 선택"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        >
          <option>2025-06-02</option>
          <option>2026-05-04</option>
        </Select>
        <article className={styles.document}>{tab === 'terms' ? terms : privacy}</article>
      </section>
    </SidebarNavigationLayout>
  );
}
