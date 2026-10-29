/**
 * [개발팀 바인딩]
 * guideCategories는 품목별 사이즈 표 표시 데이터입니다. BO 값을 category/value/label과 SizeGuidePanel이 받는 표 모델로 변환합니다.
 * 선택 사이즈의 실제 재고는 이 안내표가 아니라 Product.colorOptions의 옵션 데이터에 연결합니다.
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
      activePath="/support/size-guide"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '사이즈 가이드' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt="6">
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
