import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from '@/components/common/layouts/AppLayout/AppLayout';
import { PlatformProvider } from '@/context/platform';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Layouts/App Layout',
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { cart: 2, children: <main style={{ minHeight: 280, padding: 32 }}>페이지 콘텐츠</main> },
};

export const Mobile: Story = {
  args: { cart: 2, children: <main style={{ minHeight: 280, padding: 32 }}>페이지 콘텐츠</main> },
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'hokaMobile' } },
  render: (args) => (
    <div className="mobile">
      <AppLayout {...args} />
    </div>
  ),
};

export const MenuDismissal: Story = {
  parameters: { layout: 'fullscreen' },
  args: Default.args,
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '전체 메뉴' }));
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog', { name: '전체 메뉴' });
    await expect(dialog).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(dialog).not.toBeVisible();
  },
};
