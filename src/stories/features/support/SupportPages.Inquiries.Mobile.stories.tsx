import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/3. 1:1문의/Mobile',
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

export const New: Story = { ...scenarios.InquiryNewMobile375, name: '문의 작성' };
