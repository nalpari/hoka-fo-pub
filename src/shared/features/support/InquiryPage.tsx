'use client';

import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';

import { Box, Stack } from 'styled-system/jsx';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { InquiryCautions } from '@/shared/features/support/InquiryCautions';
import { InquiryEmptyState } from './InquiryEmptyState';
import { InquiryListItem } from './InquiryListItem';
import type { InquiryAttachment } from './InquiryAttachmentPreview';

const previewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_7899.JPG', kind: 'image' },
  { name: 'IMG_eklefej003.JPG', kind: 'image' },
  { name: 'IMG_55559KKKK.PDF', kind: 'document' },
  { name: 'IMG_55559KKKK.JPG', kind: 'image' },
];

type InquiryPreview = 'empty' | 'pending' | 'answered';

export function InquiryPage({ preview = 'empty' }: { preview?: InquiryPreview }) {
  const inquiries =
    preview === 'empty'
      ? []
      : [{ id: '1', title: '문의하기 타이틀 노출 영역', answered: preview === 'answered' }];

  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="1:1 문의"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          description="궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다."
          descriptionProps={{
            variant: 'body3',
            className: css({ color: 'black.100', _mobile: { color: 'black.60' } }),
          }}
        />
      }
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의' },
      ]}
      groups={supportNavigation}
      footer={
        <Box pb={{ base: '0', _mobile: '16' }}>
          <PageActionButton
            href="/support/inquiries/new"
            variant="primary"
            size="tall"
            width="compact"
            containerProps={{ pt: '2' }}
          >
            1:1 문의하기
          </PageActionButton>
        </Box>
      }
    >
      <Stack gap="0" mt={{ base: '10', _mobile: '4' }}>
        <Divider variant="heading" _mobile={{ h: '1px', bg: 'black.20' }} />
        <Stack gap="0" py="6" _mobile={{ py: '6' }}>
          {inquiries.length === 0 ? (
            <InquiryEmptyState />
          ) : (
            inquiries.map((item) => (
              <InquiryListItem key={item.id} item={item} attachments={previewAttachments} />
            ))
          )}
        </Stack>
        <InquiryCautions />
      </Stack>
    </CustomerCenterLayout>
  );
}
