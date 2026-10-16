import { ConfirmDialog } from '@/shared/components/molecules/ConfirmDialog/ConfirmDialog';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { Button } from '@/shared/components/atoms/Button/Button';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ConfirmDialog,
  decorators: [withPlatform('web')],
  args: {
    open: true,
    title: '삭제 확인',
    closeLabel: '확인창 닫기',
    children: <p>선택한 항목을 삭제하시겠습니까?</p>,
    onOpenChange: () => {},
    onConfirm: () => {},
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = { args: { fullWidthActions: false } };

export const CustomLabels: Story = { args: { confirmLabel: '삭제', cancelLabel: '돌아가기' } };

function InteractiveConfirm() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setOpen(true)}>확인창 열기</Button>
      <output aria-label="실행 횟수">{count}</output>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          setCount((value) => value + 1);
          setOpen(false);
        }}
        title="삭제 확인"
        closeLabel="확인창 닫기"
      >
        <p>선택한 항목을 삭제하시겠습니까?</p>
      </ConfirmDialog>
    </>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveConfirm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('button', { name: '확인창 열기' });
    await userEvent.click(trigger);
    await userEvent.click(
      within(await body.findByRole('dialog')).getByRole('button', { name: '취소' }),
    );
    await expect(canvas.getByLabelText('실행 횟수')).toHaveTextContent('0');
    await expect(trigger).toHaveFocus();
    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');
    await expect(canvas.getByLabelText('실행 횟수')).toHaveTextContent('0');
    await userEvent.click(trigger);
    await userEvent.click(
      within(await body.findByRole('dialog')).getByRole('button', { name: '확인' }),
    );
    await expect(canvas.getByLabelText('실행 횟수')).toHaveTextContent('1');
  },
};

export const Mobile: Story = {
  ...Interactive,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
