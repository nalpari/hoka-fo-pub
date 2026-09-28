import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';

const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
  args: {
    items: [
      { value: 'shipping', title: '배송 안내', content: '영업일 기준 3일 이내에 배송됩니다.' },
      { value: 'returns', title: '반품 안내', content: '수령 후 30일 이내 반품할 수 있습니다.' },
    ],
    indicator: '⌄',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyOpen: Story = { args: { defaultValue: ['shipping'] } };
