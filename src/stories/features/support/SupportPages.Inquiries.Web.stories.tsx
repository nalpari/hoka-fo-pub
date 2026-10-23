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

export const NewRequiredErrors: Story = {
  ...scenarios.InquiryNewRequiredErrorsDesktop,
  name: '문의 작성 / 필수 항목 오류',
};

export const NewAllValidationErrors: Story = {
  ...scenarios.InquiryNewAllValidationErrorsDesktop,
  name: '문의 작성 / 전체 오류',
};

export const NewAttachmentInvalidType: Story = {
  ...scenarios.InquiryAttachmentInvalidTypeDesktop,
  name: '문의 작성 / 첨부 형식 오류',
};

export const NewAttachmentTooLarge: Story = {
  ...scenarios.InquiryAttachmentTooLargeDesktop,
  name: '문의 작성 / 첨부 용량 초과',
};

export const NewAttachmentCountExceeded: Story = {
  ...scenarios.InquiryAttachmentCountExceededDesktop,
  name: '문의 작성 / 첨부 개수 초과',
};
