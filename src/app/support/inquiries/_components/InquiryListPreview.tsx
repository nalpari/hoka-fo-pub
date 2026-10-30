import { Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';

import { InquiryCautions } from '@/components/support/InquiryCautions';

import { InquiryListItem, type InquiryListItemProps } from './InquiryListContent';
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
 * 운영 문의 ID·질문·답변·첨부와 조회/갱신·실패·재시도는 InquiryDataContext.list 소유자가 연결합니다.
 */
/** 여러 문의의 답변 대기와 완료 상태를 한 목록에 표시합니다. (Displays pending and answered inquiries together in one list.) */
export function InquiryListPreview({
  items = previewInquiries,
}: {
  items?: readonly InquiryListItemProps['item'][];
}) {
  return (
    <InquiryListLayout>
      <Divider variant="heading" mo="subtle" />
      <Stack gap="0" pt="6" pb={{ base: '48px', _mobile: '8' }}>
        {items.map((item) => (
          <InquiryListItem key={item.id} item={item} attachments={item.attachments} />
        ))}
      </Stack>
      <InquiryCautions />
    </InquiryListLayout>
  );
}
