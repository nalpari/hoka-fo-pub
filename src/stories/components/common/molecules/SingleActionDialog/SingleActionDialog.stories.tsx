import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { Button } from '@/components/common/atoms/Button/Button';
import { TextInput } from '@/components/common/atoms/TextInput/TextInput';

import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'Molecules/SingleActionDialog',
  component: SingleActionDialog,
  decorators: [withPlatform('web')],
  args: {
    open: true,
    onOpenChange: () => {},
    onConfirm: () => {},
    title: '안내',
    closeLabel: '안내 닫기',
    children: <p>내용을 확인해주세요.</p>,
  },
} satisfies Meta<typeof SingleActionDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortFullWidth: Story = {};

export const ContentWidth: Story = {
  args: { confirmButtonProps: { fullWidth: false } },
};

export const MobileDefault: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: { value: 'hoka375', isRotated: false } },
};

export const CustomLabel: Story = { args: { confirmLabel: '계속하기' } };

export const Disabled: Story = { args: { confirmButtonProps: { disabled: true } } };

function FormSubmitExample() {
  const [count, setCount] = useState(0);

  return (
    <>
      <output aria-label="제출 횟수">{count}</output>
      <SingleActionDialog
        open
        onOpenChange={() => {}}
        title="폼 제출"
        closeLabel="폼 제출 닫기"
        confirmLabel="저장"
        confirmButtonProps={{ type: 'submit', form: 'dialog-example-form', size: 'tall' }}
      >
        <form
          id="dialog-example-form"
          onSubmit={(event) => {
            event.preventDefault();
            setCount((value) => value + 1);
          }}
        >
          <TextInput aria-label="이름" name="name" defaultValue="홍길동" />
        </form>
      </SingleActionDialog>
    </>
  );
}

export const FormSubmit: Story = {
  render: () => <FormSubmitExample />,
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog', { name: '폼 제출' }));
    await expect(dialog.getByRole('button', { name: '저장' })).toHaveAttribute('type', 'submit');
    await expect(dialog.getByRole('button', { name: '저장' })).toHaveAttribute(
      'form',
      'dialog-example-form',
    );
    await userEvent.click(dialog.getByRole('button', { name: '저장' }));
    await expect(within(canvasElement).getByLabelText('제출 횟수')).toHaveTextContent('1');
  },
};

export const MobileFormSubmit: Story = {
  ...FormSubmit,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

function InteractiveSingleAction() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setOpen(true)}>안내 열기</Button>
      <output aria-label="확인 횟수">{count}</output>
      <SingleActionDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => setCount((value) => value + 1)}
        title="안내"
        closeLabel="안내 닫기"
      >
        <p>확인 후 닫기 여부는 호출부에서 결정합니다.</p>
      </SingleActionDialog>
    </>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveSingleAction />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '안내 열기' }));
    const dialog = await body.findByRole('dialog', { name: '안내' });
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await expect(canvas.getByLabelText('확인 횟수')).toHaveTextContent('1');
    await expect(dialog).toBeVisible();
    await userEvent.click(within(dialog).getByRole('button', { name: '안내 닫기' }));
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    await expect(canvas.getByLabelText('확인 횟수')).toHaveTextContent('1');
    await userEvent.click(canvas.getByRole('button', { name: '안내 열기' }));
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    await expect(canvas.getByLabelText('확인 횟수')).toHaveTextContent('1');
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...Interactive,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
