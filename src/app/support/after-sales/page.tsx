'use client';

/**
 * [ 개발팀 바인딩 ]
 * 정책·반품처·바로가기 표시는 _components/AfterSalesContent의 고정 안내입니다.
 * 운영정보 연결 시 해당 소유자의 문구·전화·주소를 함께 갱신합니다. 이 화면에는 요청·접수·금액 계산이 없습니다.
 * 반품 요청과 pending/실패/성공 처리는 기존 주문 화면의 연결 소유자가 담당하며 안내 탭은 로컬 선택만 바꿉니다.
 */

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { tabs } from './_components/AfterSalesContent';

/** 배송과 반품의 세 안내 탭을 구성합니다. (Composes the three shipping and returns information tabs.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      className={css({ color: 'black.100' })}
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
      <Stack mt={{ base: '10', _mobile: '6' }} minH={{ base: '677px', _mobile: '546px' }}>
        <SupportTabs
          ariaLabel="배송 및 반품 안내 항목"
          defaultValue="shipping"
          tabs={tabs}
          variant="shipping-returns"
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
