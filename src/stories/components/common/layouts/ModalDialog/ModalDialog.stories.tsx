import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';

import { Button } from '@/components/common/atoms/Button';
import { TextInput } from '@/components/common/atoms/TextInput';

import { ModalDialog, type ModalDialogActions } from '@/components/common/layouts/ModalDialog';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'Layouts/ModalDialog',
  component: ModalDialog,
  decorators: [withPlatform('web')],
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

export const Tablet: Story = {
  args: { size: 'md', title: '태블릿 모달' },
  globals: { viewport: 'hoka768' },
};

export const DesktopLarge: Story = {
  args: { size: 'md', title: '데스크톱 Large 모달' },
  globals: { viewport: 'hoka1600' },
};

export const DesktopSmall: Story = {
  args: { size: 'md', title: '데스크톱 Small 모달' },
  globals: { viewport: 'hoka1200' },
};

export const LightOverlay: Story = { args: { overlayTone: 'light', title: 'Light overlay' } };

export const MobilePopup: Story = {
  parameters: { layout: 'fullscreen' },
  args: { mobilePresentation: 'popup', title: '모바일 팝업' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

export const MobileFullscreen: Story = {
  parameters: { layout: 'fullscreen' },
  args: { mobilePresentation: 'fullscreen', title: '모바일 전체화면' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

export const MobileStyledSlots: Story = {
  ...MobileFullscreen,
  args: {
    mobilePresentation: 'fullscreen',
    title: '모바일 헤더·푸터 슬롯',
    headerProps: {
      css: css.raw({
        _mobile: { bg: 'white', flexShrink: '0', borderBottom: '1px solid var(--colors-black-20)' },
      }),
    },
    footerProps: {
      css: css.raw({
        _mobile: {
          borderTop: '1px solid var(--colors-black-20)',
          pt: '4',
          pb: 'max(32px, env(safe-area-inset-bottom))',
        },
      }),
    },
    footer: (
      <Button variant="primary" fullWidth>
        확인
      </Button>
    ),
  },
};

export const MobileBottomSheet: Story = {
  parameters: { layout: 'fullscreen' },
  args: {
    children: <Button variant="primary">확인</Button>,
    mobilePresentation: 'bottomSheet',
    title: '모바일 바텀시트',
  },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

function InteractiveModal({ withFooter = false }: { withFooter?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <ModalDialog
        closeLabel="안내 닫기"
        onOpenChange={setOpen}
        open={open}
        title="인터랙티브 모달"
        scrollFade={withFooter}
        footer={
          withFooter ? (
            <Button variant="primary" onClick={() => setOpen(false)}>
              확인
            </Button>
          ) : undefined
        }
      >
        {withFooter ? (
          Array.from({ length: 40 }, (_, index) => (
            <p key={index}>스크롤 가능한 안내 내용 {index + 1}</p>
          ))
        ) : (
          <p>닫기 버튼이나 바깥 영역을 눌러 닫을 수 있어요.</p>
        )}
      </ModalDialog>
    </>
  );
}

export const Interactive: Story = { render: () => <InteractiveModal /> };

export const HeaderDismissal: Story = {
  ...Interactive,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));
    const dialog = await body.findByRole('dialog', { name: '인터랙티브 모달' });
    await expect(dialog).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '안내 닫기' }));
    await waitFor(() => expect(dialog).not.toBeVisible());
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
  },
};

export const ScrollFooter: Story = {
  render: () => <InteractiveModal withFooter />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));
    const dialog = await body.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(within(dialog).getByRole('button', { name: '확인' })).toBeVisible();
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await waitFor(() => expect(dialog).not.toBeVisible());
  },
};

export const MobileScrollFooter: Story = {
  parameters: { layout: 'fullscreen' },
  ...ScrollFooter,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

const singleActions = { kind: 'single', onConfirm: () => {} } satisfies ModalDialogActions;

function FormSubmitExample() {
  const [count, setCount] = useState(0);
  return (
    <>
      <output aria-label="제출 횟수">{count}</output>
      <ModalDialog
        open
        onOpenChange={() => {}}
        title="폼 제출"
        closeLabel="폼 제출 닫기"
        actions={{
          kind: 'single',
          label: '저장',
          buttonProps: { type: 'submit', form: 'dialog-example-form', size: 'tall' },
        }}
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
      </ModalDialog>
    </>
  );
}

function InteractiveSingleAction() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <Button onClick={() => setOpen(true)}>안내 열기</Button>
      <output aria-label="확인 횟수">{count}</output>
      <ModalDialog
        open={open}
        onOpenChange={setOpen}
        actions={{ kind: 'single', onConfirm: () => setCount((value) => value + 1) }}
        title="안내"
        closeLabel="안내 닫기"
      >
        <p>확인 후 닫기 여부는 호출부에서 결정합니다.</p>
      </ModalDialog>
    </>
  );
}

const singleActionArgs = {
  open: true,
  onOpenChange: () => {},
  actions: singleActions,
  title: '안내',
  closeLabel: '안내 닫기',
  children: <p>내용을 확인해주세요.</p>,
} satisfies NonNullable<Story['args']>;

export const SingleActionDefault: Story = {
  args: { ...singleActionArgs },
};

export const SingleActionShortFullWidth: Story = {
  args: { ...singleActionArgs },
};

export const SingleActionContentWidth: Story = {
  args: { ...singleActionArgs, actions: { ...singleActions, buttonProps: { fullWidth: false } } },
};

export const SingleActionMobileDefault: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: { value: 'hoka375', isRotated: false } },
  args: { ...singleActionArgs },
};

export const SingleActionCustomLabel: Story = {
  args: { ...singleActionArgs, actions: { ...singleActions, label: '계속하기' } },
};

export const SingleActionDisabled: Story = {
  args: { ...singleActionArgs, actions: { ...singleActions, buttonProps: { disabled: true } } },
};

export const SingleActionFormSubmit: Story = {
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
  args: { ...singleActionArgs },
};

export const SingleActionMobileFormSubmit: Story = {
  ...SingleActionFormSubmit,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
  args: { ...singleActionArgs },
};

export const SingleActionInteractive: Story = {
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
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(canvas.getByLabelText('확인 횟수')).toHaveTextContent('1');
    await userEvent.click(canvas.getByRole('button', { name: '안내 열기' }));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(canvas.getByLabelText('확인 횟수')).toHaveTextContent('1');
  },
  args: { ...singleActionArgs },
};

export const SingleActionMobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...SingleActionInteractive,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
  args: { ...singleActionArgs },
};

const confirmActions = { kind: 'confirm', onConfirm: () => {} } satisfies ModalDialogActions;

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

const confirmArgs = {
  open: true,
  title: '삭제 확인',
  closeLabel: '확인창 닫기',
  children: <p>선택한 항목을 삭제하시겠습니까?</p>,
  onOpenChange: () => {},
  size: 'sm',
  actions: confirmActions,
} satisfies NonNullable<Story['args']>;

export const ConfirmDefault: Story = {
  args: { ...confirmArgs },
};

export const ConfirmCompact: Story = {
  args: { ...confirmArgs, actions: { ...confirmActions, fullWidth: false } },
};

export const ConfirmCustomLabels: Story = {
  args: {
    ...confirmArgs,
    actions: { ...confirmActions, confirmLabel: '삭제', cancelLabel: '돌아가기' },
  },
};

export const ConfirmInteractive: Story = {
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
  args: { ...confirmArgs },
};

export const ConfirmMobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...ConfirmInteractive,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
  args: { ...confirmArgs },
};

export const ConfirmDisabledConfirm: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog'));
    await expect(dialog.getByRole('button', { name: '변경' })).toBeDisabled();
    await expect(dialog.getByRole('button', { name: '취소' })).toBeEnabled();
  },
  args: {
    ...confirmArgs,
    actions: { ...confirmActions, confirmLabel: '변경', confirmDisabled: true },
  },
};

export const ConfirmVertical = {
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
  args: {
    ...confirmArgs,
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
} satisfies Story;

export const ConfirmVerticalMobile: Story = {
  ...ConfirmVertical,
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
  args: { ...confirmArgs, ...ConfirmVertical.args, mobilePresentation: 'fullscreen' },
};
