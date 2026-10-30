'use client';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import type { InquiryOrderSelection } from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
import { InquiryCautions } from '@/components/support/InquiryCautions';

import {
  InquiryAttachments,
  InquiryCategoryFields,
  InquiryCustomerInfo,
  InquiryFormActions,
  InquiryMessageFields,
  InquiryOrderProducts,
} from './InquiryFormContent';
import { InquiryFormLayout } from './InquiryFormLayout';

/**
 * [ 개발팀 바인딩 ] 고정 필수값/주문선택/첨부 오류이며 제출·복원·저장·이동은 실행하지 않습니다.
 * 운영 category/detailCategory/제목/본문/파일/선택 주문·상품 ID와 요청 상태·목록 갱신은 InquiryDataContext.form 소유자가 연결합니다.
 */
/** 문의 폼과 첨부·주문 선택 오류를 직접 표시합니다. (Displays fixed inquiry form, attachment and order-selection errors.) */
export function InquiryFormStatePreview({
  state,
}: {
  state: 'error' | 'order-required' | 'attachment-type' | 'attachment-size' | 'attachment-count';
}) {
  const [category, setCategory] = useState(state === 'order-required' ? '주문/배송' : '');
  const [detailCategory, setDetailCategory] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [selection, setSelection] = useState<InquiryOrderSelection>(null);
  const [open, setOpen] = useState(state === 'order-required');
  const invalid = state === 'error' || state === 'order-required';
  const attachmentError =
    state === 'attachment-type'
      ? 'type'
      : state === 'attachment-size'
        ? 'size'
        : state === 'attachment-count'
          ? 'count'
          : undefined;
  return (
    <InquiryFormLayout>
      <form
        className={css({ mt: { base: '10', _mobile: '6' } })}
        noValidate
        onSubmit={(event) => event.preventDefault()}
      >
        <Stack gap="6">
          <InquiryCustomerInfo />
          <Stack gap="4">
            <InquiryCategoryFields
              fixedErrors={state === 'error'}
              category={category}
              detailCategory={detailCategory}
              invalid={invalid}
              onCategoryChange={setCategory}
              onDetailCategoryChange={setDetailCategory}
            />
            {state === 'order-required' && (
              <InquiryOrderProducts
                invalid
                selection={selection}
                onSelectionChange={setSelection}
                onLookup={() => setOpen(true)}
              />
            )}
            <InquiryMessageFields
              fixedErrors={state === 'error'}
              title={title}
              body={body}
              invalid={invalid}
              onTitleChange={setTitle}
              onBodyChange={setBody}
            />
          </Stack>
          <InquiryAttachments
            files={files}
            onFilesChange={setFiles}
            previewError={attachmentError}
          />
          <InquiryCautions />
          <InquiryFormActions onCancel={() => {}} />
        </Stack>
      </form>
      <ModalDialog
        open={open}
        onOpenChange={setOpen}
        title="1:1 문의등록"
        closeLabel="주문번호 안내 닫기"
        actions={{ kind: 'single', onConfirm: () => setOpen(false) }}
      >
        <Typography as="p" variant="body3">
          주문번호를 선택해주세요.
        </Typography>
      </ModalDialog>
    </InquiryFormLayout>
  );
}
