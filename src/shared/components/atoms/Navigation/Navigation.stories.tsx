import type { Meta, StoryObj } from '@storybook/react';
import { HStack, Stack } from 'styled-system/jsx';
import { Navigation } from './Navigation';

const meta = {
  title: 'Atoms/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  args: {
    'aria-label': '다음 항목',
  },
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Directions: Story = {
  render: () => (
    <HStack gap="4">
      <Navigation aria-label="오른쪽" direction="right" />
      <Navigation aria-label="왼쪽" direction="left" />
      <Navigation aria-label="위" direction="up" />
      <Navigation aria-label="아래" direction="down" />
    </HStack>
  ),
};

export const WhiteBackground: Story = {
  render: () => (
    <Stack gap="4">
      <HStack gap="4">
        <Navigation aria-label="다음 항목" direction="right" whiteBg />
        <Navigation aria-label="이전 항목" direction="left" whiteBg />
      </HStack>
      <Navigation aria-label="비활성 다음 항목" disabled whiteBg />
    </Stack>
  ),
};
