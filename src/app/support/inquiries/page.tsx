'use client';

/**
 * [개발팀 바인딩]
 * InquiryDataContext.list의 실제 id/title/body/answer/answered/attachments를 사용합니다. 첨부 previewUrl은 접근 권한이 있는 URL로 전달합니다.
 * hasMore/onLoadMore는 서버 추가 조회이고 목록 재조회/등록 후 갱신은 어댑터가 담당합니다. InquiryPreviewContext는 Storybook 상태 예시입니다.
 */

import { useContext } from 'react';
import { InquiryDataContext, type InquiryView } from '@/context/InquiryDataContext';
import { InquiryPreviewContext } from '@/context/InquiryPreviewContext';
import { usePlatform } from '@/context/platform';
import { useBindingQuery } from '@/hooks/useBindingQuery';
import { useRequestAction } from '@/hooks/useRequestAction';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { InquiryCautions } from '@/components/support/InquiryCautions';

import {
  desktopPreviewAttachments,
  InquiryEmptyState,
  InquiryListItem,
  type InquiryListItemProps,
  mobilePreviewAttachments,
} from './_components/InquiryListContent';
import { InquiryListLayout } from './_components/InquiryListLayout';

/** 1:1 문의 목록과 빈 상태를 구성하고 문의 등록으로 연결합니다. (Composes the inquiry list and empty state, with a link to submit an inquiry.) */
export default function Page() {
  const binding = useContext(InquiryDataContext).list;
  const request = useRequestAction();
  useBindingQuery(binding?.onQueryChange, {});
  const preview = useContext(InquiryPreviewContext);
  const platform = usePlatform();
  const inquiries: InquiryListItemProps['item'][] | readonly InquiryView[] = binding
    ? binding.items
    : preview === 'empty'
      ? []
      : [
          {
            id: '1',
            title: '문의하기 타이틀 노출 영역',
            answered: preview === 'answered' || preview === 'attachmentPreview',
          },
        ];

  return (
    <InquiryListLayout>
      <BindingFeedback
        pending={binding?.pending || request.pending}
        error={binding?.error || request.error}
        onRetry={binding?.onRetry}
      />
      <Divider variant="heading" mo="subtle" />
      <Stack gap="0" pt="6" pb={{ base: '48px', _mobile: '8' }}>
        {inquiries.length === 0 && !binding?.pending && !binding?.error ? (
          <InquiryEmptyState />
        ) : (
          inquiries.map((item) => (
            <InquiryListItem
              key={item.id}
              item={item}
              attachments={
                binding
                  ? (item.attachments ?? [])
                  : preview === 'attachmentPreview'
                    ? platform === 'mobile'
                      ? mobilePreviewAttachments
                      : desktopPreviewAttachments
                    : []
              }
            />
          ))
        )}
      </Stack>

      <>
        {binding?.hasMore && (
          <Button
            disabled={binding.pending || request.pending}
            onClick={() => void request.run(binding.onLoadMore)}
          >
            더보기
          </Button>
        )}
      </>
      {/* 문의 유의사항 영역 (Inquiry cautions section). */}
      <InquiryCautions />
    </InquiryListLayout>
  );
}
