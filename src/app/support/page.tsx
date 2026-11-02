'use client';

/**
 * [ 개발팀 바인딩 ]
 * 연락처 표시 데이터와 tel 링크는 _components/SupportContacts에서 관리하는 고정 안내입니다.
 * 운영정보 연동 시 해당 소유자에서 표시값과 링크를 함께 갱신합니다. 아래 링크는 기존 문의 작성·FAQ 경로로 이동합니다.
 */

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';

import { SupportContacts } from './_components/SupportContacts';
import { SupportQuickLinks } from './_components/SupportQuickLinks';

/** 고객센터의 주요 문의와 안내 영역을 구성합니다. (Composes the main customer support and information sections.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '4', _mobile: '6' }}
          mb={{ base: '14', _mobile: '10' }}
          title="고객센터"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading4' }}
          description="HOKA와 함께하는 모든 순간, 더 나은 경험을 위해 항상 도와드리겠습니다."
          descriptionProps={{
            variant: 'body3',
            web: 'body2',
            mo: 'body3',
            className: css({ _mobile: { color: 'black.70' } }),
          }}
        />
      }
      activePath="/support"
      groups={supportNavigation}
      breadcrumbItems={[{ label: 'Home', href: '/' }, { label: '고객센터' }]}
    >
      <Stack gap={{ base: '8', _mobile: '2' }} _mobile={{ pb: '6' }}>
        <SupportContacts />
        <SupportQuickLinks />
      </Stack>
    </CustomerCenterLayout>
  );
}
