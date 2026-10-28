import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { css } from 'styled-system/css';

import { Button } from '@/components/common/atoms/Button';

import { ModalDialog } from '@/components/common/molecules/ModalDialog';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'Molecules/ModalDialog',
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
    await expect(dialog).not.toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: '모달 열기' }));
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
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
    await expect(dialog).not.toBeVisible();
  },
};

export const MobileScrollFooter: Story = {
  parameters: { layout: 'fullscreen' },
  ...ScrollFooter,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
