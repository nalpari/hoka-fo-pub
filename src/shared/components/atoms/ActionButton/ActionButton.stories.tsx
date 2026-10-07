import type { Meta, StoryObj } from '@storybook/react';
import { HStack, Stack } from 'styled-system/jsx';
import { ActionButton } from './ActionButton';

const meta = {
  title: 'Atoms/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  args: { 'aria-label': '추가', type: 'plus' },
} satisfies Meta<typeof ActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FigmaStates: Story = {
  render: () => (
    <Stack gap="4">
      <HStack gap="4">
        <ActionButton aria-label="추가" type="plus" />
        <ActionButton aria-label="빼기" type="minus" />
        <ActionButton aria-label="닫기" type="close" />
      </HStack>
      <HStack gap="4">
        <ActionButton aria-label="비활성 추가" state="disabled" type="plus" />
        <ActionButton aria-label="비활성 빼기" disabled type="minus" />
        <ActionButton aria-label="동그란 닫기" state="circled" type="close" />
      </HStack>
    </Stack>
  ),
};
