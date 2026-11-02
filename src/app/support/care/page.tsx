'use client';

/**
 * [ 개발팀 바인딩 ]
 * CareContent는 care.data의 소개·요약·관리 목록을 표시하는 고정 안내 화면입니다.
 * BO 연결은 이 라우트의 통합 담당자가 표시 데이터를 준비해 CareInstructions.sections에 전달합니다.
 * shoes/apparel 탭은 로컬 표시 상태이며 원격 요청·저장·성공/실패 처리는 구현하지 않았습니다.
 */

import { usePlatform } from '@/context/platform';

import { Box } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { CareContent } from './_components/CareContent';

const tabs = [
  { value: 'shoes', label: '신발', content: <CareContent category="shoes" /> },
  {
    value: 'apparel',
    label: '의류/용품',
    content: <CareContent category="apparel" />,
  },
] as const;

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  const platform = usePlatform();
  return (
    <CustomerCenterLayout
      title={platform === 'mobile' ? '세탁 및 손질 방법 안내' : '세탁 및 손질 방법'}
      mobileTitleVariant="heading5"
      activePath="/support/care"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '세탁 및 손질 방법 안내' },
      ]}
      groups={supportNavigation}
    >
      <Box mt={{ base: '10', _mobile: '6' }}>
        <SupportTabs
          syncQuery
          ariaLabel="세탁 및 손질 방법"
          defaultValue="shoes"
          tabs={tabs}
          variant="care"
        />
      </Box>
    </CustomerCenterLayout>
  );
}
