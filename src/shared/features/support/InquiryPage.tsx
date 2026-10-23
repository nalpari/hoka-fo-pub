'use client';

import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';
import { usePlatform } from '@/shared/context/platform';
import { Box, Stack } from 'styled-system/jsx';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { InquiryCautions } from '@/shared/features/support/InquiryCautions';
import { InquiryEmptyState } from './InquiryEmptyState';
import { InquiryListItem } from './InquiryListItem';
import type { InquiryAttachment } from './InquiryAttachmentPreview';

const desktopPreviewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_7899.JPG', kind: 'image' },
  { name: 'IMG_ekkefei003.JPG', kind: 'image' },
  { name: 'IMG_55559KKKKK.PDF', kind: 'document' },
  { name: 'IMG_55559KKKKK.JPG', kind: 'image' },
];

const mobilePreviewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_78901.JPG', kind: 'image' },
  { name: 'IMG_78902.JPG', kind: 'image' },
  { name: 'IMG_78903.JPG', kind: 'image' },
  { name: 'IMG_78904.JPG', kind: 'image' },
  { name: 'IMG_78905.JPG', kind: 'image' },
  { name: 'IMG_78906.JPG', kind: 'image' },
  { name: 'IMG_78907.JPG', kind: 'image' },
  { name: 'IMG_78908.JPG', kind: 'image' },
];

type InquiryPreview = 'empty' | 'pending' | 'answered' | 'attachmentPreview';

/** 1:1 문의 목록과 빈 상태를 구성하고 문의 등록으로 연결합니다. (Composes the inquiry list and empty state, with a link to submit an inquiry.) */
export function InquiryPage({ preview = 'empty' }: { preview?: InquiryPreview }) {
  const platform = usePlatform();
  const inquiries =
    preview === 'empty'
      ? []
      : [
          {
            id: '1',
            title: '문의하기 타이틀 노출 영역',
            answered: preview === 'answered' || preview === 'attachmentPreview',
          },
        ];

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
            containerProps={{ pt: '6' }}
          >
            1:1 문의하기
          </PageActionButton>
        </Box>
      }
    >
      <Stack gap="0" mt={{ base: '10', _mobile: '4' }}>
        <Divider variant="heading" mo="subtle" />
        <Stack gap="0" pt="6" pb={{ base: '48px', _mobile: '8' }}>
          {inquiries.length === 0 ? (
            <InquiryEmptyState />
          ) : (
            inquiries.map((item) => (
              <InquiryListItem
                key={item.id}
                item={item}
                attachments={
                  preview === 'attachmentPreview'
                    ? platform === 'mobile'
                      ? mobilePreviewAttachments
                      : desktopPreviewAttachments
                    : []
                }
              />
            ))
          )}
        </Stack>

        {/* 문의 유의사항 영역 (Inquiry cautions section). */}
        <InquiryCautions />
      </Stack>
    </CustomerCenterLayout>
  );
}
