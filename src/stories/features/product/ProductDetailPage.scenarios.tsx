import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { ShopShell } from '@/context/ShopShell';

import ProductPage from '@/app/products/[id]/page';

const meta = {
  title: 'PAGES/상품/1. 상품상세',
  component: ShopShell,
  args: { children: <ProductPage /> },
  parameters: {
    nextjs: { navigation: { pathname: '/products/shoe-1', segments: [['id', 'shoe-1']] } },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ShopShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Width3840: Story = {
  name: '3840px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka3840' },
};

export const Width2560: Story = {
  name: '2560px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka2560' },
};

export const Width1920: Story = {
  name: '1920px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1920' },
};

export const Width1600: Story = {
  name: '1600px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1600' },
};

export const Width1200: Story = {
  name: '1200px',
  args: { platform: 'web' },
  globals: { viewport: 'hoka1200' },
};

export const Width768: Story = {
  parameters: { layout: 'fullscreen' },
  name: '768px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka768' },
};

export const Width375: Story = {
  parameters: { layout: 'fullscreen' },
  name: '375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const AccumulatedOptions: Story = {
  name: '옵션 누적 선택',
  args: { platform: 'web' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sizes = within(canvas.getByRole('radiogroup', { name: '사이즈 선택' }));
    const available = sizes
      .getAllByRole('radio')
      .filter((option) => option.getAttribute('aria-disabled') !== 'true');
    await userEvent.click(available[0]);
    await userEvent.click(available[1]);
    await userEvent.click(available[0]);
    const selected = within(canvas.getByLabelText('선택한 상품 옵션'));
    await expect(selected.getAllByRole('listitem')).toHaveLength(2);
    const first = within(selected.getAllByRole('listitem')[0]);
    await expect(first.getByRole('textbox')).toHaveValue('2');
    await userEvent.click(first.getByRole('button', { name: '증가' }));
    await expect(first.getByRole('textbox')).toHaveValue('3');
  },
};
