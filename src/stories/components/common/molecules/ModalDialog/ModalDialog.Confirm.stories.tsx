import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { Button } from '@/components/common/atoms/Button/Button';

import {
  ModalDialog,
  type ModalDialogActions,
} from '@/components/common/molecules/ModalDialog/ModalDialog';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

const confirmActions = { kind: 'confirm', onConfirm: () => {} } satisfies ModalDialogActions;

const meta = {
  title: 'Molecules/ConfirmDialog',
  component: ModalDialog,
  decorators: [withPlatform('web')],
  args: {
    open: true,
    title: '삭제 확인',
    closeLabel: '확인창 닫기',
    children: <p>선택한 항목을 삭제하시겠습니까?</p>,
    onOpenChange: () => {},
    size: 'sm',
    actions: confirmActions,
  },
} satisfies Meta<typeof ModalDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = { args: { actions: { ...confirmActions, fullWidth: false } } };

export const CustomLabels: Story = {
  args: { actions: { ...confirmActions, confirmLabel: '삭제', cancelLabel: '돌아가기' } },
};

function InteractiveConfirm() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setOpen(true)}>확인창 열기</Button>
      <output aria-label="실행 횟수">{count}</output>
      <ModalDialog
        size="sm"
        open={open}
        onOpenChange={setOpen}
        actions={{
          kind: 'confirm',
          onConfirm: () => {
            setCount((value) => value + 1);
            setOpen(false);
          },
        }}
        title="삭제 확인"
        closeLabel="확인창 닫기"
      >
        <p>선택한 항목을 삭제하시겠습니까?</p>
      </ModalDialog>
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
    await waitFor(() => expect(trigger).toHaveFocus());
    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(canvas.getByLabelText('실행 횟수')).toHaveTextContent('0');
    await userEvent.click(trigger);
    await userEvent.click(
      within(await body.findByRole('dialog')).getByRole('button', { name: '확인' }),
    );
    await expect(canvas.getByLabelText('실행 횟수')).toHaveTextContent('1');
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...Interactive,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

export const DisabledConfirm: Story = {
  args: { actions: { ...confirmActions, confirmLabel: '변경', confirmDisabled: true } },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog'));
    await expect(dialog.getByRole('button', { name: '변경' })).toBeDisabled();
    await expect(dialog.getByRole('button', { name: '취소' })).toBeEnabled();
  },
};

export const Vertical: Story = {
  args: {
    actions: {
      kind: 'confirm',
      direction: 'vertical',
      fullWidth: false,
      cancelLabel: '비밀번호 재설정',
      onCancel: fn(),
      onConfirm: fn(),
    },
    onOpenChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const actions = args.actions;
    if (actions?.kind !== 'confirm') throw new Error('Expected confirmation actions');
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog'));
    await userEvent.click(dialog.getByRole('button', { name: '비밀번호 재설정' }));
    await expect(actions.onCancel).toHaveBeenCalledTimes(1);
    await expect(args.onOpenChange).not.toHaveBeenCalled();
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(actions.onConfirm).toHaveBeenCalledTimes(1);
  },
};

export const VerticalMobile: Story = {
  ...Vertical,
  args: { ...Vertical.args, mobilePresentation: 'fullscreen' },
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
