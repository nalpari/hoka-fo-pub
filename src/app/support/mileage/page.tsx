'use client';

/**
 * [개발팀 바인딩]
 * 현재 본문은 디자인 작업 중인 안내이며 실제 마일리지 조회 계약은 없습니다.
 * BO 안내 본문을 연결할 때 기존 레이아웃 안에서 안전한 문서 데이터를 렌더링합니다. 개인 잔액/적립내역 데이터와 공통 정책 안내를 혼합하지 않습니다.
 */

import { Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';
import { Typography } from '@/components/common/atoms/Typography';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 통합 마일리지 안내 화면을 구성합니다. (Composes the customer benefit information screen.) */
export default function Page() {
  const path = '/support/mileage';
  const title = '통합 마일리지 안내';

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
