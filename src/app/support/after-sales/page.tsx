'use client';

/**
 * [개발팀 바인딩]
 * shippingItems 등은 현재 고정 정책 안내입니다. BO 문구를 연결할 경우 기존 번호/불릿 패널에 같은 ReactNode 항목 구조로 변환합니다.
 * 이 안내문은 반품비 계산/접수 권한의 근거가 아닙니다. 실제 반품은 OrdersContext.quoteClaim/submitClaim의 서버 결과를 사용합니다.
 */

import { Stack } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { tabs } from './_components/AfterSalesContent';

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="배송 및 반품안내"
      mobileTitleVariant="heading5"
      activePath="/support/after-sales"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '배송 및 반품안내' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt="6">
        <SupportTabs ariaLabel="배송 및 반품 안내 항목" defaultValue="shipping" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
