import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './Collapsible';

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
