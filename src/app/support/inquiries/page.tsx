'use client';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 문의 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
import { useContext } from 'react';
import { InquiryPreviewContext } from '@/context/InquiryPreviewContext';
import { usePlatform } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import { Divider } from '@/components/common/atoms/Divider';
import { EmptyState } from '@/components/common/atoms/EmptyState';

import { type InquiryView } from '@/app/support/inquiries/inquiry.types';
import { InquiryCautions } from '@/components/support/InquiryCautions';

import {
  desktopPreviewAttachments,
  InquiryListItem,
  type InquiryListItemProps,
  mobilePreviewAttachments,
} from './_components/InquiryListContent';
import { InquiryListLayout } from './_components/InquiryListLayout';
/** 1:1 문의 목록과 빈 상태를 구성하고 문의 등록으로 연결합니다. (Composes the inquiry list and empty state, with a link to submit an inquiry.) */
export default function Page() {
  const preview = useContext(InquiryPreviewContext);
  const platform = usePlatform();
  const inquiries: InquiryListItemProps['item'][] | readonly InquiryView[] =
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
    <InquiryListLayout
      empty={inquiries.length === 0}
      mobileTitleSize={preview === 'attachmentPreview' ? '22px' : '24px'}
    >
      <Divider variant="heading" mo="subtle" />
      <Stack gap="0" pt="6" pb={{ base: '6', _mobile: '8' }}>
        {inquiries.length === 0 ? (
          <EmptyState
            variant="plain"
            title="등록된 문의사항이 없습니다."
            titleProps={{ as: 'span', web: 'body3', mo: 'body4', tone: 'tertiary' }}
            layoutProps={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              minH: { base: '427px', _mobile: '190px' },
            }}
          />
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

      <></>
      {/* 문의 유의사항 영역 (Inquiry cautions section). */}
      <InquiryCautions />
    </InquiryListLayout>
  );
}
