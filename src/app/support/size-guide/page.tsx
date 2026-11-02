/**
 * [ 개발팀 바인딩 ]
 * 이 라우트는 설계서에서 준비한 guideCategories 표시 데이터를 SizeGuidePanel에 전달합니다.
 * 연동 담당자는 value/label/image/steps/genders/units/charts를 승인된 안내 데이터로 갱신합니다.
 * 요청·저장·재고 판정은 없는 정적 안내이며, 실제 상품 재고는 상품 옵션 데이터 소유자가 연결합니다.
 */

import { Stack } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { SizeGuidePanel } from '@/app/support/size-guide/_components/SizeGuidePanel';
import { guideCategories } from '@/app/support/size-guide/size-guide.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

const tabs = guideCategories.map((category) => ({
  value: category.value,
  label: category.label,
  content: <SizeGuidePanel category={category} />,
}));

/** 상품 사이즈 선택을 위한 안내를 표시합니다. (Displays guidance for selecting product sizes.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="사이즈 가이드"
      mobileTitleVariant="heading5"
      activePath="/support/size-guide"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '사이즈 가이드' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt={{ base: '10', _mobile: '4' }}>
        <SupportTabs
          ariaLabel="사이즈 가이드 품목"
          defaultValue="shoes"
          variant="guide"
          tabs={tabs}
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
