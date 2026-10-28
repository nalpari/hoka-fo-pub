'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { InquiryCautions } from '@/components/features/support/InquiryCautions';
import { InquiryAttachments } from '@/components/features/support/InquiryAttachments';
import { ConfirmDialog } from '@/components/common/molecules/ConfirmDialog/ConfirmDialog';
import { supportNavigation } from '@/components/features/support/support.navigation';
import { InquiryCustomerInfo } from '@/components/features/support/InquiryCustomerInfo';
import { InquiryCategoryFields } from '@/components/features/support/InquiryCategoryFields';
import { InquiryMessageFields } from '@/components/features/support/InquiryMessageFields';
import { InquiryFormActions } from '@/components/features/support/InquiryFormActions';
import { InquiryOrderProducts } from '@/components/features/support/InquiryOrderProducts';
import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';
import {
  readInquiryOrderResult,
  saveInquiryOrderDraft,
  type InquiryOrderSelection,
} from '@/components/features/support/inquiryOrderSelection.storage';

/** 1:1 문의 작성·검증과 취소 흐름을 구성합니다. (Composes inquiry entry, validation, and cancellation.) */
export default function Page() {
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
  const requiresOrder = ['주문/결제', '주문/배송', '반품'].includes(category);

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    if (!['주문/결제', '주문/배송', '반품'].includes(nextCategory)) {
      setOrderSelection(null);
    }
  };

  useEffect(() => {
    const restoreSelection = () => {
      const result = readInquiryOrderResult();
      if (result) setOrderSelection(result);
    };

    restoreSelection();
    window.addEventListener('hoka-inquiry-order-selection-result', restoreSelection);
    return () =>
      window.removeEventListener('hoka-inquiry-order-selection-result', restoreSelection);
  }, []);

  const openOrderLookup = () => {
    saveInquiryOrderDraft(orderSelection);
    router.push('/support/inquiries/new/order-products');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (requiresOrder && !orderSelection) {
      setOrderRequiredOpen(true);
      return;
    }
    if (category && detailCategory && title.trim() && body.trim()) {
      router.push('/support/inquiries');
    }
  };

  return (
    /* 고객센터 제목·경로와 메뉴를 제공하는 페이지 레이아웃 (Customer center page layout with heading, paths, and navigation). */
    <CustomerCenterLayout
      header={
        /* 문의 등록 제목과 안내 문구 (Inquiry submission heading and guidance). */
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="1:1 문의등록"
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
        { label: '1:1 문의하기', href: '/support/inquiries' },
        { label: '1:1 문의등록' },
      ]}
      groups={supportNavigation}
    >
      <form className={css({ mt: { base: '10', _mobile: '6' } })} noValidate onSubmit={submit}>
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
      </form>
      {/* 취소 확인 다이얼로그 (Cancellation confirmation dialog). */}
      <ConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="1:1 문의등록"
        closeLabel="문의 취소 안내 닫기"
        onConfirm={() => router.push('/support/inquiries')}
      >
        <Typography as="p" variant="body3">
          문의 작성을 취소하시겠습니까?
        </Typography>
      </ConfirmDialog>
      <SingleActionDialog
        open={orderRequiredOpen}
        onOpenChange={setOrderRequiredOpen}
        title="1:1 문의등록"
        closeLabel="주문번호 안내 닫기"
        onConfirm={() => setOrderRequiredOpen(false)}
      >
        <Typography as="p" variant="body3">
          주문번호를 선택해주세요.
        </Typography>
      </SingleActionDialog>
    </CustomerCenterLayout>
  );
}
