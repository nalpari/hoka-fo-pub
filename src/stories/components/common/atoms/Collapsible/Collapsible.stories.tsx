import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '@/components/common/atoms/Button';

import { Collapsible } from '@/components/catalog/ProductListingPage';

function InteractiveCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible onOpenChange={setOpen} open={open} trigger="상세 보기">
      접을 수 있는 콘텐츠입니다.
    </Collapsible>
  );
}

const meta = {
  title: 'Atoms/Collapsible',
  component: Collapsible,
  args: { children: '', trigger: '' },
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <InteractiveCollapsible />,
};

export const InitiallyOpen: Story = {
  args: {
    children: '접을 수 있는 콘텐츠입니다.',
    defaultOpen: true,
    trigger: '상세 보기',
  },
};

export const CustomTrigger: Story = {
  args: {
    trigger: '사용 가능 쿠폰',
    triggerRender: <Button variant="link" size="sm" />,
    indicator: null,
    children: '상품 쿠폰 목록',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: '사용 가능 쿠폰' });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByText('상품 쿠폰 목록')).toBeVisible();
    await userEvent.keyboard('{Enter}');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};
