import { expect, userEvent, within } from 'storybook/test';

import { InquiryFormStatePreview } from '@/app/support/inquiries/new/_components/InquiryFormStatePreview';

import type { AuditStory as Story } from './shared';
export const Inquiry: Story = {
  render: () => <InquiryFormStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: /문의 내용/ });
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
