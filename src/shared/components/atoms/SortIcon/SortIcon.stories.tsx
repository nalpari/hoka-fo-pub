import type { Meta, StoryObj } from '@storybook/react';
import { HStack } from 'styled-system/jsx';
import { SortIcon } from './SortIcon';

const meta = {
  title: 'Atoms/SortIcon',
  component: SortIcon,
  tags: ['autodocs'],
  args: {
    direction: 'desc',
  },
} satisfies Meta<typeof SortIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Directions: Story = {
  render: () => (
    <HStack gap="4">
      <SortIcon aria-label="오름차순" direction="asc" />
      <SortIcon aria-label="내림차순" direction="desc" />
      <SortIcon aria-label="비활성 내림차순" direction="desc" disabled />
    </HStack>
  ),
};
