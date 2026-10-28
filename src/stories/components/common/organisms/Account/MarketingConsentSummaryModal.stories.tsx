import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { Button } from '@/components/common/atoms/Button/Button';

import { MarketingConsentSummaryModal } from '@/stories/route-previews/signup-informationPreview';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

function ConsentPreview({ splitChannels = false }: { splitChannels?: boolean }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setOpen(true)}>수신내역 열기</Button>
      <MarketingConsentSummaryModal
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => setOpen(false)}
        items={
          splitChannels
            ? [
                { label: '이메일 수신', value: '수신안함' },
                { label: 'SMS 수신', value: '수신' },
                { label: '카카오톡 수신', value: '수신안함' },
              ]
            : [
                { label: '이메일 수신', value: '수신' },
                { label: '모바일 쿠폰북', value: '수신안함' },
                { label: '문자,카카오톡 수신', value: '수신' },
              ]
        }
      />
    </>
  );
}

const meta = {
  title: 'Organisms/Account/MarketingConsentSummaryModal',
  component: MarketingConsentSummaryModal,
  args: { open: true, items: [], onOpenChange: () => {}, onConfirm: () => {} },
  decorators: [withPlatform('web')],
  render: () => <ConsentPreview />,
} satisfies Meta<typeof MarketingConsentSummaryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(
      within(await body.findByRole('dialog')).getByRole('button', { name: '확인' }),
    );
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const SeparateChannels: Story = { render: () => <ConsentPreview splitChannels /> };

export const Empty: Story = {
  render: (args) => <MarketingConsentSummaryModal {...args} />,
  args: { open: true, items: [], onOpenChange: () => {}, onConfirm: () => {} },
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...Default,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
