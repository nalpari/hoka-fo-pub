import type { Meta, StoryObj } from '@storybook/react';
import { StepIndicator } from './StepIndicator';

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
export const MobileHidden: Story = { args: { mobileHidden: true } };
