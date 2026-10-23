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
  name: 'Attachments',
};

export const AttachmentPreview: Story = {
  ...scenarios.InquiryAttachmentPreviewDesktop,
  name: 'Attachment preview',
};
