import { expect, userEvent, within } from 'storybook/test';

import InquiryNewPage from '@/app/support/inquiries/new/page';

import type { AuditStory as Story } from './shared';

export const Inquiry: Story = {
  render: () => <InquiryNewPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: /등록/ }));
    await expect(c.getByRole('textbox', { name: /제목/ })).toHaveAttribute('aria-invalid', 'true');
    await expect(c.getByRole('textbox', { name: /문의 내용/ })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(c.getByRole('textbox', { name: /제목/ }), '문의 제목');
    await userEvent.type(c.getByRole('textbox', { name: /문의 내용/ }), '문의 내용');
    await expect(c.getByRole('textbox', { name: /제목/ })).not.toHaveAttribute('aria-invalid');
    await expect(c.getByRole('textbox', { name: /문의 내용/ })).not.toHaveAttribute('aria-invalid');
  },
};
