import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator } from '@/shared/components/molecules/StepIndicator/StepIndicator';

const meta = {
  title: 'Molecules/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  args: {
    ariaLabel: '주문 진행 단계',
    current: 2,
    items: [{ label: '장바구니' }, { label: '주문/결제' }, { label: '주문완료' }],
  },
} satisfies Meta<typeof StepIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Connected: Story = {
  args: {
    variant: 'connected',
    ariaLabel: '배송 진행 단계',
    items: [
      { label: '배송예약' },
      { label: '상품이동중' },
      { label: '배송중' },
      { label: '배송완료' },
    ],
  },
};

export const MobileHidden: Story = {
  parameters: { layout: 'fullscreen' },
  args: { mobileHidden: true },
};
