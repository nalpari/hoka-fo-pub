import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/3. 1:1문의/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiriesDesktop, name: 'Default' };

export const Pending: Story = { ...scenarios.InquiryPendingDesktop, name: '답변 대기' };

export const Answered: Story = { ...scenarios.InquiryAnsweredDesktop, name: '답변 완료' };

export const Attachments: Story = {
  ...scenarios.InquiryAttachmentsDesktop,
  name: '첨부파일',
};

export const AttachmentPreview: Story = {
  ...scenarios.InquiryAttachmentPreviewDesktop,
  name: '첨부파일 미리보기',
};

export const New: Story = { ...scenarios.InquiryNewDesktop, name: '문의 작성' };

export const RequiredErrors: Story = {
  ...scenarios.InquiryNewRequiredErrorsDesktop,
  name: '필수 항목 오류',
};

export const AllValidationErrors: Story = {
  ...scenarios.InquiryNewAllValidationErrorsDesktop,
  name: '전체 입력 오류',
};

export const AttachmentInvalidType: Story = {
  ...scenarios.InquiryAttachmentInvalidTypeDesktop,
  name: '첨부파일 형식 오류',
};

export const AttachmentTooLarge: Story = {
  ...scenarios.InquiryAttachmentTooLargeDesktop,
  name: '첨부파일 용량 오류',
};

export const AttachmentCountExceeded: Story = {
  ...scenarios.InquiryAttachmentCountExceededDesktop,
  name: '첨부파일 개수 오류',
};
