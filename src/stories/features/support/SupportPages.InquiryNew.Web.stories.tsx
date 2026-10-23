import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/SUPPORT/InquiryNew/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiryNewDesktop, name: 'Default' };

export const RequiredErrors: Story = {
  ...scenarios.InquiryNewRequiredErrorsDesktop,
  name: 'Required field errors',
};

export const AllValidationErrors: Story = {
  ...scenarios.InquiryNewAllValidationErrorsDesktop,
  name: 'All validation errors',
};

export const AttachmentInvalidType: Story = {
  ...scenarios.InquiryAttachmentInvalidTypeDesktop,
  name: 'Attachment type error',
};

export const AttachmentTooLarge: Story = {
  ...scenarios.InquiryAttachmentTooLargeDesktop,
  name: 'Attachment size error',
};

export const AttachmentCountExceeded: Story = {
  ...scenarios.InquiryAttachmentCountExceededDesktop,
  name: 'Attachment count error',
};
