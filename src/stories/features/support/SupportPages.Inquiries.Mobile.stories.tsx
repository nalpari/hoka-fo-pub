import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/SUPPORT/Inquiries/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiriesMobile375, name: 'Default' };

export const Pending: Story = { ...scenarios.InquiryPendingMobile375, name: 'Pending' };

export const Answered: Story = { ...scenarios.InquiryAnsweredMobile375, name: 'Answered' };

export const AttachmentPreview: Story = {
  ...scenarios.InquiryAttachmentPreviewMobile375,
  name: 'Attachment preview',
};
