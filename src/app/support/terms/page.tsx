'use client';

/**
 * [ 개발팀 바인딩 ]
 * terms/privacy 각각의 versions/document와 조회 연결은 통합 소유자가 추가합니다. 현재 연결 Context·요청은 없습니다.
 * 시행일 선택은 versionId, 탭은 URL tab 값으로 조회합니다. 이전/다음 탐색에서도 같은 조건을 반영하고 BO 본문은 어댑터에서 안전하게 렌더링합니다.
 */

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { TermsDocument } from './_components/TermsDocument';

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export default function Page() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tab = searchParams.get('tab') === 'privacy' ? 'privacy' : 'terms';

  const tabs = [
    { value: 'terms', label: '이용 약관', content: <TermsDocument privacy={false} /> },
    { value: 'privacy', label: '개인정보 처리방침', content: <TermsDocument privacy /> },
  ];

  return (
    <CustomerCenterLayout
      className={css({ '&&': { _mobile: { pb: '16' } } })}
      title="약관"
      mobileTitleVariant="heading5"
      activePath="/support/terms"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '약관' },
      ]}
      groups={supportNavigation}
    >
      <Stack mt={{ base: '10', _mobile: '6' }}>
        <SupportTabs
          ariaLabel="약관 종류"
          variant="terms"
          defaultValue="terms"
          value={tab}
          onValueChange={(value) => {
            const next = new URLSearchParams(searchParams.toString());
            if (value === 'privacy') next.set('tab', 'privacy');
            else next.delete('tab');
            router.push(`${pathname}${next.size ? `?${next.toString()}` : ''}`, { scroll: false });
          }}
          tabs={tabs}
        />
      </Stack>
    </CustomerCenterLayout>
  );
}
