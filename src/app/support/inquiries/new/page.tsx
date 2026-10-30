'use client';

/**
 * [개발팀 바인딩]
 * InquiryDataContext.form에 customer/categories/resolveSelection/submit을 연결합니다.
 * submit은 File[]와 실제 orderId/productIds를 포함합니다. 업로드·등록이 성공한 뒤 resolve하며 오류는 reject해 입력을 보존합니다.
 * 주문 선택 화면에서 돌아온 ID는 resolveSelection으로 복원합니다. 실제 주문이 목 데이터에 없다는 이유로 선택을 버리지 않습니다.
 */

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { type FormEvent, useEffect, useState } from 'react';
import { InquiryDataContext } from '@/context/InquiryDataContext';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  consumeInquiryOrderSelection,
  restoreInquiryOrderSelection,
} from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
import {
  type InquiryOrderSelection,
  readInquiryOrderResult,
  saveInquiryOrderDraft,
} from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
import { InquiryCautions } from '@/components/support/InquiryCautions';

import {
  InquiryAttachments,
  InquiryCategoryFields,
  InquiryCustomerInfo,
  InquiryFormActions,
  InquiryMessageFields,
  InquiryOrderProducts,
} from './_components/InquiryFormContent';
import { InquiryFormLayout } from './_components/InquiryFormLayout';

/** 1:1 문의 작성·검증과 취소 흐름을 구성합니다. (Composes inquiry entry, validation, and cancellation.) */
export default function Page() {
  const binding = useContext(InquiryDataContext).form;
  const request = useRequestAction();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [detailCategory, setDetailCategory] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [orderSelection, setOrderSelection] = useState<InquiryOrderSelection>(null);
  const [orderRequiredOpen, setOrderRequiredOpen] = useState(false);
  const invalid = submitted;
  const requiresOrder = binding
    ? (binding.categories.find((item) => item.value === category)?.requiresOrder ?? false)
    : ['주문/결제', '주문/배송', '반품'].includes(category);

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    setDetailCategory('');
    if (
      binding
        ? !binding.categories.find((item) => item.value === nextCategory)?.requiresOrder
        : !['주문/결제', '주문/배송', '반품'].includes(nextCategory)
    ) {
      setOrderSelection(null);
    }
  };

  const resolveSelection = binding?.resolveSelection;
  const [restoreError, setRestoreError] = useState('');
  useEffect(() => {
    let active = true;
    const restoreSelection = () => {
      if (!resolveSelection) {
        const result = readInquiryOrderResult();
        if (result) setOrderSelection(result);
        return;
      }
      void restoreInquiryOrderSelection('result', resolveSelection)
        .then((result) => {
          if (active && result !== undefined) {
            setOrderSelection(result);
            consumeInquiryOrderSelection('result');
            setRestoreError('');
          }
        })
        .catch((cause: unknown) => {
          if (active)
            setRestoreError(
              cause instanceof Error ? cause.message : '선택 상품을 복원하지 못했습니다.',
            );
        });
    };
    restoreSelection();
    window.addEventListener('hoka-inquiry-order-selection-result', restoreSelection);
    return () => {
      active = false;
      window.removeEventListener('hoka-inquiry-order-selection-result', restoreSelection);
    };
  }, [resolveSelection]);

  const openOrderLookup = () => {
    saveInquiryOrderDraft(orderSelection);
    router.push('/support/inquiries/new/order-products');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (request.pending || binding?.pending) return;
    setSubmitted(true);
    if (requiresOrder && !orderSelection) {
      setOrderRequiredOpen(true);
      return;
    }
    if (category && detailCategory && title.trim() && body.trim()) {
      void request.run(async () => {
        if (binding)
          await binding.submit({
            title,
            body,
            category,
            detailCategory,
            files,
            selection: orderSelection
              ? {
                  orderId: orderSelection.order.id,
                  productIds: orderSelection.products.map((item) => item.id),
                }
              : null,
          });
        router.push('/support/inquiries');
      });
    }
  };

  return (
    /* 고객센터 제목·경로와 메뉴를 제공하는 페이지 레이아웃 (Customer center page layout with heading, paths, and navigation). */
    <InquiryFormLayout>
      <BindingFeedback
        {...binding}
        pending={binding?.pending || request.pending}
        error={binding?.error || request.error || restoreError}
        onRetry={() => {
          if (resolveSelection)
            void request.run(async () => {
              const result = await restoreInquiryOrderSelection('result', resolveSelection);
              if (result !== undefined) {
                setOrderSelection(result);
                consumeInquiryOrderSelection('result');
                setRestoreError('');
              }
            });
        }}
      />
      <form className={css({ mt: { base: '10', _mobile: '6' } })} noValidate onSubmit={submit}>
        <fieldset
          disabled={request.pending || binding?.pending}
          className={css({ border: 0, p: 0, m: 0, minW: 0 })}
        >
          <Stack gap="6">
            {/* 신청인 기본 정보 (Submitter's basic information). */}
            <InquiryCustomerInfo />
            <Stack gap="4">
              {/* 문의 유형 선택 (Inquiry category selection). */}
              {requiresOrder ? (
                <Stack gap="6">
                  <InquiryCategoryFields
                    category={category}
                    detailCategory={detailCategory}
                    invalid={invalid}
                    onCategoryChange={handleCategoryChange}
                    onDetailCategoryChange={setDetailCategory}
                  />
                  <InquiryOrderProducts
                    invalid={invalid}
                    selection={orderSelection}
                    onSelectionChange={setOrderSelection}
                    onLookup={openOrderLookup}
                  />
                </Stack>
              ) : (
                <InquiryCategoryFields
                  category={category}
                  detailCategory={detailCategory}
                  invalid={invalid}
                  onCategoryChange={handleCategoryChange}
                  onDetailCategoryChange={setDetailCategory}
                />
              )}
              {/* 문의 제목·내용 입력과 필수값 오류 표시 (Inquiry subject/body input and required-field errors). */}
              <InquiryMessageFields
                title={title}
                body={body}
                invalid={invalid}
                onTitleChange={setTitle}
                onBodyChange={setBody}
              />
            </Stack>
            {/* 문의에 첨부할 파일 관리 (Manage files attached to the inquiry). */}
            <InquiryAttachments files={files} onFilesChange={setFiles} />
            {/* 문의 전 확인할 유의사항 (Inquiry submission cautions). */}
            <InquiryCautions />
            {/* 취소 및 문의 등록 액션 (Cancel and submit actions). */}
            <InquiryFormActions onCancel={() => setCancelOpen(true)} />
          </Stack>
        </fieldset>
      </form>
      {/* 취소 확인 다이얼로그 (Cancellation confirmation dialog). */}
      <ModalDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="1:1 문의등록"
        closeLabel="문의 취소 안내 닫기"
        size="sm"
        actions={{ kind: 'confirm', onConfirm: () => router.push('/support/inquiries') }}
      >
        <Typography as="p" variant="body3">
          문의 작성을 취소하시겠습니까?
        </Typography>
      </ModalDialog>
      <ModalDialog
        open={orderRequiredOpen}
        onOpenChange={setOrderRequiredOpen}
        title="1:1 문의등록"
        closeLabel="주문번호 안내 닫기"
        actions={{ kind: 'single', onConfirm: () => setOrderRequiredOpen(false) }}
      >
        <Typography as="p" variant="body3">
          주문번호를 선택해주세요.
        </Typography>
      </ModalDialog>
    </InquiryFormLayout>
  );
}
