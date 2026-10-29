'use client';

/**
 * [개발팀 바인딩]
 * 현재 본문은 디자인 작업 중인 안내입니다. 아직 회원등급 정책 조회/본문 계약이 구현되지 않았습니다.
 * BO 정책을 붙일 때 이 라우트 본문 소유자에 안전한 문서/표 데이터와 로딩/실패 상태를 연결합니다. 실제 개인 등급은 MyPageDataContext.overview의 별도 데이터입니다.
 */

import { Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';
import { Typography } from '@/components/common/atoms/Typography';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 온라인 회원등급 안내 화면을 구성합니다. (Composes the customer benefit information screen.) */
export default function Page() {
  const path = '/support/member-benefits';
  const title = '온라인 회원등급 안내';

  return (
    <CustomerCenterLayout
      title={title}
      mobileTitleVariant="heading5"
      activePath={path}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: title },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6" mt="6">
        <Divider variant="heading" display={{ base: 'block', _mobile: 'none' }} />
        <Stack as="section">
          <Typography as="p" web="body3" mo="body4" tone="subtle">
            디자인 작업 중입니다.
          </Typography>
        </Stack>
      </Stack>
    </CustomerCenterLayout>
  );
}
