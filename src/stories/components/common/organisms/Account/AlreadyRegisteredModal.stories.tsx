import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PlatformProvider } from '@/context/platform';

import { Button } from '@/components/common/atoms/Button/Button';

import { AlreadyRegisteredModal } from '@/stories/route-previews/signup-verify-phonePreview';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div
      className={`platform-${platform}`}
      style={platform === 'mobile' ? { maxWidth: '100%', width: 375, minHeight: 812 } : undefined}
    >
      <Story />
    </div>
  </PlatformProvider>
);

const meta = {
  title: 'Organisms/Account/AlreadyRegisteredModal',
  component: AlreadyRegisteredModal,
  args: { onOpenChange: () => {}, onConfirm: () => {} },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AlreadyRegisteredModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

function AlreadyRegisteredPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>가입 안내 열기</Button>
      {open ? (
        <AlreadyRegisteredModal onOpenChange={setOpen} onConfirm={() => setOpen(false)} />
      ) : null}
    </>
  );
}

export const Interactive: Story = {
  decorators: [withPlatform('web')],
  render: () => <AlreadyRegisteredPreview />,
};
