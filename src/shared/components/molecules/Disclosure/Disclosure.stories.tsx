import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Disclosure } from './Disclosure';

function DisclosureStory() {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure onOpenChange={setOpen} open={open} title="배송은 언제 받을 수 있나요?">
      평균 3일 이내에 받아보실 수 있습니다.
    </Disclosure>
  );
}

function PanelDisclosureStory() {
  const [open, setOpen] = useState(false);

  return (
    <Disclosure onOpenChange={setOpen} open={open} title="정렬기준" variant="panel">
      베스트순
    </Disclosure>
  );
}

const meta = {
  title: 'Molecules/Disclosure',
  component: DisclosureStory,
  tags: ['autodocs'],
} satisfies Meta<typeof DisclosureStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Panel: Story = {
  render: () => <PanelDisclosureStory />,
};
