import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

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
  args: { mobilePresentation: 'popup', title: '모바일 팝업' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

export const MobileFullscreen: Story = {
  args: { mobilePresentation: 'fullscreen', title: '모바일 전체화면' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

export const MobileBottomSheet: Story = {
  args: {
    children: <Button variant="primary">확인</Button>,
    mobilePresentation: 'bottomSheet',
    title: '모바일 바텀시트',
  },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

function InteractiveModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <ModalDialog
        closeLabel="안내 닫기"
        onOpenChange={setOpen}
        open={open}
        title="인터랙티브 모달"
      >
        <p>닫기 버튼이나 바깥 영역을 눌러 닫을 수 있어요.</p>
      </ModalDialog>
    </>
  );
}

export const Interactive: Story = { render: () => <InteractiveModal /> };
