'use client';

import { Divider, Stack } from 'styled-system/jsx';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { InquiryCautions } from '@/shared/features/support/InquiryCautions';
import { InquiryEmptyState } from './InquiryEmptyState';
import { InquiryListItem } from './InquiryListItem';

type InquiryPreview = 'empty' | 'pending' | 'answered';

export function InquiryPage({ preview = 'empty' }: { preview?: InquiryPreview }) {
  const inquiries =
    preview === 'empty'
      ? []
      : [{ id: '1', title: '문의하기 타이틀 노출 영역', answered: preview === 'answered' }];

  return (
    <CustomerCenterLayout
      title="1:1 문의"
      description="궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다."
      headingProps={{ _mobile: { mb: '4' } }}
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의' },
      ]}
      groups={supportNavigation}
      footer={
        <PageActionButton href="/support/inquiries/new" variant="primary" width="compact">
          1:1 문의하기
        </PageActionButton>
      }
    >
      <Divider
        aria-hidden="true"
        orientation="horizontal"
        h={{ base: '2px', _mobile: '1px' }}
        bg={{ base: 'black.100', _mobile: 'black.20' }}
      />
      <Stack gap="0" py="6" _mobile={{ py: '6' }}>
        {inquiries.length === 0 ? (
          <InquiryEmptyState />
        ) : (
          inquiries.map((item) => <InquiryListItem key={item.id} item={item} />)
        )}
      </Stack>
      <InquiryCautions />
    </CustomerCenterLayout>
  );
}
