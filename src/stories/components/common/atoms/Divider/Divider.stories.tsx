import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from '@/components/common/atoms/Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Subtle: Story = {};

export const Strong: Story = { args: { variant: 'strong' } };

export const Heading: Story = { args: { variant: 'heading' } };

export const Responsive: Story = {
  args: { variant: 'heading', mo: 'subtle' },
};
