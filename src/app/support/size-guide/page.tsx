import { Stack } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout';

import { SizeGuidePanel } from '@/app/support/size-guide/_components/SizeGuidePanel';
import { guideCategories } from '@/components/size-guide/size-guide.data';
import { supportNavigation } from '@/components/support/support.navigation';

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
