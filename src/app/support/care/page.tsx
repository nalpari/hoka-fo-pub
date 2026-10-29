'use client';

/**
 * [개발팀 바인딩]
 * shoeCareSections/apparelCareSections는 고정 손질 안내 데이터입니다. BO 연결 시 CareInstructions.sections의 표시 모델로 변환합니다.
 * 카테고리 탭 값은 안정적으로 유지하고 본문만 기존 제목/목록 구조에 전달합니다. 현재 이 페이지에는 원격 조회 함수가 없습니다.
 */

import { Stack } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { supportNavigation } from '@/app/support/support.navigation';
import { apparelCareSections, shoeCareSections } from '@/components/care-guide/care.data';
import { CareInstructions } from '@/components/care-guide/CareInstructions';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

const tabs = [
  { value: 'shoes', label: '신발', content: <CareInstructions sections={shoeCareSections} /> },
  {
    value: 'apparel',
    label: '의류/용품',
    content: <CareInstructions sections={apparelCareSections} />,
  },
] as const;

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="세탁 및 손질 방법 안내"
      mobileTitleVariant="heading5"
      activePath="/support/care"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '세탁 및 손질 방법 안내' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt="6">
        <SupportTabs ariaLabel="세탁 및 손질 방법" defaultValue="shoes" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
