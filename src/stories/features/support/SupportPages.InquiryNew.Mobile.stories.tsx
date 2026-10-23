import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/SUPPORT/InquiryNew/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiryNewMobile375, name: 'Default' };

export const RequiredErrors: Story = {
  ...scenarios.InquiryNewRequiredErrorsMobile375,
  name: 'Required field errors',
};

export const AllValidationErrors: Story = {
  ...scenarios.InquiryNewAllValidationErrorsMobile375,
  name: 'All validation errors',
};

export const AttachmentInvalidType: Story = {
  ...scenarios.InquiryAttachmentInvalidTypeMobile375,
  name: 'Attachment type error',
};

export const AttachmentTooLarge: Story = {
  ...scenarios.InquiryAttachmentTooLargeMobile375,
  name: 'Attachment size error',
};

export const AttachmentCountExceeded: Story = {
  ...scenarios.InquiryAttachmentCountExceededMobile375,
  name: 'Attachment count error',
};
