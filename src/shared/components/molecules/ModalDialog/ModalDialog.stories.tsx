import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const meta = {
  title: 'Molecules/ModalDialog',
  component: ModalDialog,
  args: {
    children: <p>상품 선택에 필요한 정보를 확인해 주세요.</p>,
    closeLabel: '닫기',
    onOpenChange: () => {},
    open: true,
    title: '상품 안내',
  },
} satisfies Meta<typeof ModalDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Centered: Story = {};

export const BottomOnMobile: Story = {
  args: {
    children: <Button variant="primary">확인</Button>,
    placement: 'centerToBottom',
    title: '사이즈 가이드',
  },
};
