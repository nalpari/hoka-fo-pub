'use client';

/**
 * [ 개발팀 바인딩 ]
 * 연락처 표시 데이터와 tel 링크는 @/data/supportContacts의 고정 안내를 푸터와 공유합니다.
 * 운영정보 연동 시 해당 데이터 소유자에서 표시값과 링크를 함께 갱신합니다. 아래 링크는 기존 문의 작성·FAQ 경로로 이동합니다.
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
      className={css({ '--line-heights-body': '1.5', _mobile: { pb: '16!' } })}
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          mb={{ base: '10', _mobile: '8' }}
          title="고객센터"
          titleAs="h1"
          titleProps={{
            web: 'heading6',
            mo: 'heading4',
            className: css({ _mobile: { h: '32px' } }),
          }}
          description="문의 유형에 따라 상담 채널을 선택해 주세요. "
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
      <Stack gap="2">
        <SupportContacts />
        <SupportQuickLinks />
      </Stack>
    </CustomerCenterLayout>
  );
}
