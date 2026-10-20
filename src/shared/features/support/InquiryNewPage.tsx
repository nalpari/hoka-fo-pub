'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { InquiryCautions } from '@/shared/features/support/InquiryCautions';
import { InquiryAttachments } from '@/shared/features/support/InquiryAttachments';
import { ConfirmDialog } from '@/shared/components/molecules/ConfirmDialog/ConfirmDialog';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { InquiryCustomerInfo } from './InquiryCustomerInfo';
import { InquiryCategoryFields } from './InquiryCategoryFields';
import { InquiryMessageFields } from './InquiryMessageFields';
import { InquiryFormActions } from './InquiryFormActions';

export function InquiryNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const invalid = submitted && (!title.trim() || !body.trim());

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (title.trim() && body.trim()) router.push('/support/inquiries');
  };

  return (
    <CustomerCenterLayout
      title="1:1 문의"
      description="궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다."
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의하기', href: '/support/inquiries' },
        { label: '1:1 문의등록' },
      ]}
      groups={supportNavigation}
    >
      <form noValidate onSubmit={submit}>
        <Stack gap="6">
          <InquiryCustomerInfo />
          <InquiryCategoryFields />
          <InquiryMessageFields
            title={title}
            body={body}
            invalid={invalid}
            onTitleChange={setTitle}
            onBodyChange={setBody}
          />
          <InquiryAttachments files={files} onFilesChange={setFiles} />
          <InquiryCautions />
          <InquiryFormActions onCancel={() => setCancelOpen(true)} />
        </Stack>
      </form>
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
    </CustomerCenterLayout>
  );
}
