import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { SupportTabs } from '@/shared/components/molecules/SupportTabs/SupportTabs';
import { guideCategories } from './size-guide.data';
import { SizeGuidePanel } from './SizeGuidePanel';

const tabs = guideCategories.map((category) => ({
  value: category.value,
  label: category.label,
  content: <SizeGuidePanel category={category} />,
}));

export function SizeGuidePage() {
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
      <SupportTabs
        ariaLabel="사이즈 가이드 품목"
        defaultValue="shoes"
        variant="guide"
        tabs={tabs}
      />
    </CustomerCenterLayout>
  );
}
