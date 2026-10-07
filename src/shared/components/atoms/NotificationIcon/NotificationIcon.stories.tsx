import type { Meta, StoryObj } from '@storybook/react';
import { HStack } from 'styled-system/jsx';
import { NotificationIcon } from './NotificationIcon';

const meta = {
  title: 'Atoms/NotificationIcon',
  component: NotificationIcon,
  tags: ['autodocs'],
  args: {
    variant: 'basket',
    count: 3,
  },
} satisfies Meta<typeof NotificationIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <HStack gap="6">
      <NotificationIcon variant="basket" count={3} />
      <NotificationIcon variant="bag" count={99} />
      <NotificationIcon variant="user" count={0} />
    </HStack>
  ),
};

export const BrandNotification: Story = {
  args: {
    variant: 'bag',
    count: 1,
    color: 'var(--color-blue-100)',
  },
};
