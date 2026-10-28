import { LogoutDialog } from '@/stories/route-previews/mypagePreview';
import { useState } from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';
import { Button } from '@/components/common/atoms/Button/Button';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

function LogoutPreview() {
  const [open, setOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>로그아웃 열기</Button>
      <output>{loggedOut ? '로그아웃 완료' : '로그인 상태'}</output>
      <LogoutDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          setLoggedOut(true);
          setOpen(false);
        }}
      />
    </>
  );
}

const meta = {
  title: 'Organisms/Account/LogoutDialog',
  component: LogoutDialog,
  args: { open: true, onOpenChange: () => {}, onConfirm: () => {} },
  decorators: [withPlatform('web')],
  render: () => <LogoutPreview />,
} satisfies Meta<typeof LogoutDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '로그아웃 열기' }));
    await userEvent.click(
      within(await body.findByRole('dialog')).getByRole('button', { name: '확인' }),
    );
    await expect(canvas.getByText('로그아웃 완료')).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...Interactive,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
