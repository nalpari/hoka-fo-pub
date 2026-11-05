'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { inquiryOrders } from '@/app/support/inquiries/new/inquiryOrders.data';
import type { InquiryOrderSelection } from '@/app/support/inquiries/new/inquiryOrders.data';
import { InquiryCautions } from '@/components/support/InquiryCautions';

import {
  inquiryAlertPresentation,
  InquiryAttachments,
  InquiryCategoryFields,
  InquiryCustomerInfo,
  InquiryFormActions,
  InquiryMessageFields,
  InquiryOrderProducts,
} from './InquiryFormContent';
import { InquiryFormLayout } from './InquiryFormLayout';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 문의 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 문의 폼과 첨부·주문 선택 오류를 직접 표시합니다. (Displays fixed inquiry form, attachment and order-selection errors.) */
export function InquiryFormStatePreview({
  state,
}: {
  state:
    | 'form'
    | 'cancel'
    | 'order-lookup'
    | 'order-selected'
    | 'error'
    | 'order-required'
    | 'attachment-type'
    | 'attachment-size'
    | 'attachment-count';
}) {
  const router = useRouter();
  const orderState =
    state === 'order-required' || state === 'order-lookup' || state === 'order-selected';
  const [category, setCategory] = useState(
    state === 'order-required' ? '주문/배송' : orderState ? '반품' : '',
  );
  const [detailCategory, setDetailCategory] = useState(
    orderState && state !== 'order-required' ? '신청/취소 문의' : '',
  );
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>(() =>
    orderState && state !== 'order-required'
      ? ['IMG_7899.JPG', 'IMG_55559KKKKK.JPG', 'IMG_ekkefei003.JPG', 'IMG_55559KKKKK.JPG'].map(
          (name) => new File([], name, { type: 'image/jpeg' }),
        )
      : [],
  );
  const [selection, setSelection] = useState<InquiryOrderSelection>(
    state === 'order-selected'
      ? { order: inquiryOrders[0], products: inquiryOrders[0].products.slice(0, 4) }
      : null,
  );
  const [open, setOpen] = useState(state === 'order-required' || state === 'cancel');
  const [cancelDialog, setCancelDialog] = useState(state === 'cancel');
  const invalid = state === 'error' || state === 'order-required';
  const attachmentError =
    state === 'error'
      ? 'size'
      : state === 'attachment-type'
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
            {(orderState || ['주문/결제', '주문/배송', '반품'].includes(category)) && (
              <InquiryOrderProducts
                invalid={state === 'order-required'}
                selection={selection}
                onSelectionChange={setSelection}
                onLookup={() => router.push('/support/inquiries/new/order-products')}
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
          <InquiryFormActions
            onCancel={() => {
              setCancelDialog(true);
              setOpen(true);
            }}
          />
        </Stack>
      </form>
      <ModalDialog
        {...inquiryAlertPresentation}
        open={open}
        onOpenChange={setOpen}
        title="1:1 문의등록"
        closeLabel="주문번호 안내 닫기"
        actions={
          cancelDialog
            ? { kind: 'confirm', fullWidth: false, onConfirm: () => setOpen(false) }
            : { kind: 'single', onConfirm: () => setOpen(false) }
        }
      >
        <Typography as="p" variant="body2">
          {cancelDialog ? '문의 작성을 취소하시겠습니까?' : '주문번호를 선택해주세요.'}
        </Typography>
      </ModalDialog>
    </InquiryFormLayout>
  );
}
