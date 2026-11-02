import { expect, userEvent, within } from 'storybook/test';

import { RouteContent } from '@/app/products/[id]/_components/ProductDetailContent';

import type { AuditStory as Story } from './shared';
export const Product: Story = {
  render: () => <RouteContent preview="selection-required" />,
  play: async ({ canvasElement }) => {
    const sizes = within(canvasElement).getByRole('radiogroup', { name: '사이즈 선택' });
    await expect(sizes).toHaveAttribute('aria-invalid', 'true');
    const enabled = within(sizes)
      .getAllByRole('radio')
      .find((option) => option.getAttribute('aria-disabled') !== 'true');
    if (enabled) await userEvent.click(enabled);
    await expect(sizes).toHaveAttribute('aria-invalid', 'true');
  },
};
