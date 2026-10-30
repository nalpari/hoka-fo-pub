'use client';

import { Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';

import { InquiryCautions } from '@/components/support/InquiryCautions';

import { InquiryListItem } from './InquiryListContent';
import { InquiryListLayout } from './InquiryListLayout';

/**
 * [ 개발팀 바인딩 ] 답변 유무를 고정한 인계 fixture입니다. 답변 대기는 네트워크 pending이 아닙니다.
 * 운영 문의 ID·질문·답변·첨부와 조회/갱신·실패·재시도는 InquiryDataContext.list 소유자가 연결합니다.
 */
/** 문의의 답변 전후 상태를 직접 표시합니다. (Displays inquiry states before and after an answer.) */
export function InquiryStatePreview({ answered = false }: { answered?: boolean }) {
  return (
    <InquiryListLayout>
      <Divider variant="heading" mo="subtle" />
      <Stack gap="0" pt="6" pb={{ base: '48px', _mobile: '8' }}>
        <InquiryListItem
          item={{
            id: 'preview-inquiry',
            title: '문의하기 타이틀 노출 영역',
            answered,
            body: '문의 내용이 노출되는 영역입니다.',
            answer: answered ? '문의하신 내용에 대한 답변입니다.' : undefined,
          }}
        />
      </Stack>
      <InquiryCautions />
    </InquiryListLayout>
  );
}
