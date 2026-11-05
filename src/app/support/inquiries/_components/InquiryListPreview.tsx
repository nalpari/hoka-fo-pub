'use client';

import { usePlatform } from '@/context/platform';

import { Box, Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';

import { InquiryCautions } from '@/components/support/InquiryCautions';

import {
  desktopPreviewAttachments,
  InquiryListItem,
  type InquiryListItemProps,
  mobilePreviewAttachments,
} from './InquiryListContent';
import { InquiryListLayout } from './InquiryListLayout';

const previewInquiries: readonly InquiryListItemProps['item'][] = [
  {
    id: 'preview-inquiry-unanswered',
    title: '배송 일정 문의',
    answered: false,
    body: '문의한 내용에 대한 답변을 기다리고 있습니다.',
  },
  {
    id: 'preview-inquiry-answered',
    title: '상품 사이즈 문의',
    answered: true,
    body: '상품 사이즈에 대해 문의합니다.',
    answer: '문의하신 내용에 대한 답변입니다.',
  },
];

/**
 * [ 개발팀 바인딩 ] items는 ID별 질문을 누적한 표시 목록이며 대기/완료 상태를 항목별로 전달합니다.
 * 기본 데이터는 고정 인계 fixture입니다. 요청·저장·답변 상태 전환은 실행하지 않습니다.
 * 운영 문의 ID·질문·답변·첨부와 조회/갱신·실패·재시도는 통합 소유자가 연결합니다. 현재 연결 Context·요청은 없습니다.
 */
/** 여러 문의의 답변 대기와 완료 상태를 한 목록에 표시합니다. (Displays pending and answered inquiries together in one list.) */
export function InquiryListPreview({
  items = previewInquiries,
  state,
}: {
  items?: readonly InquiryListItemProps['item'][];
  state?:
    'empty' | 'pending' | 'answered' | 'attachments' | 'pending-attachments' | 'attachment-preview';
}) {
  const platform = usePlatform();
  const empty = state === 'empty';
  const attachments = state?.includes('attachment')
    ? platform === 'web'
      ? desktopPreviewAttachments
      : mobilePreviewAttachments
    : [];
  const displayed = state
    ? empty
      ? []
      : [
          {
            id: 'design-inquiry-primary',
            title: '문의하기 타이틀 노출 영역',
            answered: state !== 'pending' && state !== 'pending-attachments',
            body: '문의 내용 노출 영역 '.repeat(12),
            answer: '답변 내용 노출 영역 '.repeat(6),
            attachments,
          },
        ]
    : items;
  const listItems: readonly InquiryListItemProps['item'][] =
    state === 'answered'
      ? [
          ...displayed,
          ...Array.from({ length: 4 }, (_, index) => ({
            id: `design-inquiry-pending-${index}`,
            title: '문의하기 타이틀 노출 영역',
            answered: false,
            body: '문의 내용 노출 영역 '.repeat(6),
          })),
        ]
      : displayed;
  return (
    <InquiryListLayout empty={empty} mobileTitleSize={state === 'attachments' ? '22px' : '24px'}>
      <Divider variant="heading" mo="subtle" />
      <Stack gap="0" pt={{ base: '8', _mobile: '6' }} pb="8">
        {empty && (
          <Stack
            minH={{ base: '427px', _mobile: '190px' }}
            alignItems="center"
            justifyContent="center"
            gap="4"
          >
            <Box w="80px" h="80px" bg="black.10" />
            <EmptyState
              variant="plain"
              title="등록된 문의사항이 없습니다."
              titleProps={{ web: 'body3', mo: 'body4', tone: 'tertiary' }}
            />
          </Stack>
        )}
        {listItems.map((item) => (
          <InquiryListItem
            key={item.id}
            item={item}
            attachments={item.attachments}
            initialAttachmentIndex={state === 'attachment-preview' ? 0 : undefined}
          />
        ))}
      </Stack>
      <InquiryCautions />
    </InquiryListLayout>
  );
}
