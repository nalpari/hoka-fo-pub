/**
 * [ 개발팀 바인딩 ]
 * 라우트가 guideCategories의 품목·성별·단위별 표시 데이터와 측정 안내를 SizeGuidePanel에 전달합니다.
 * 연동 담당자가 승인된 치수표와 이미지로 갱신합니다. 선택은 화면 표시만 바꾸며 요청·저장·재고 판정은 없습니다.
 * 용품처럼 measurement가 없는 품목은 선택 영역과 차트만 표시합니다.
 */

import { SizeGuidePanel } from '@/app/support/size-guide/_components/SizeGuidePanel';
import { guideCategories } from '@/app/support/size-guide/size-guide.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

/** 상품 사이즈 선택을 위한 안내를 표시합니다. (Displays guidance for selecting product sizes.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="사이즈 가이드"
      mobileTitleVariant="h7"
      activePath="/support/size-guide"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '사이즈 가이드' },
      ]}
      groups={supportNavigation}
    >
      <SizeGuidePanel categories={guideCategories} />
    </CustomerCenterLayout>
  );
}
