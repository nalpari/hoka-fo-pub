import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import { Button } from '@/components/common/atoms/Button';

import { TermsDialog } from '@/stories/route-previews/signup-termsPreview';

const withPlatform = (platform: 'web' | 'mobile') => (Story: React.ComponentType) => (
  <PlatformProvider platform={platform}>
    <div className={`platform-${platform}`}>
      <Story />
    </div>
  </PlatformProvider>
);

function TermsPreview({ versions = true }: { versions?: boolean }) {
  const [open, setOpen] = useState(true);
  const [previous, setPrevious] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>약관 열기</Button>
      <TermsDialog
        open={open}
        onOpenChange={setOpen}
        title="서비스 이용약관"
        label="서비스 이용약관"
        dates="시행일자 : 2026년 10월 16일"
        version={
          versions ? { previous, onChange: () => setPrevious((value) => !value) } : undefined
        }
      >
        <p>{previous ? '이전 약관 내용' : '현재 약관 내용'}</p>
      </TermsDialog>
    </>
  );
}

const meta = {
  title: 'Organisms/Terms/TermsDialog',
  component: TermsDialog,
  args: {
    open: true,
    onOpenChange: () => {},
    title: '서비스 이용약관',
    label: '서비스 이용약관',
    children: <p>약관 내용</p>,
  },
  decorators: [withPlatform('web')],
  render: () => <TermsPreview />,
} satisfies Meta<typeof TermsDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(await body.findByRole('dialog'));
    await userEvent.click(dialog.getByRole('button', { name: '이전 약관 보기' }));
    await expect(dialog.getByText('이전 약관 내용')).toBeVisible();
    await userEvent.click(dialog.getByRole('button', { name: '현재 약관 보기' }));
    await expect(dialog.getByText('현재 약관 내용')).toBeVisible();
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const WithoutVersionHistory: Story = { render: () => <TermsPreview versions={false} /> };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  ...Default,
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};
