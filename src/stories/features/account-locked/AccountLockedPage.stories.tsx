import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { PlatformProvider } from '@/shared/context/platform';
import { AccountLockedPage } from '@/shared/features/account-locked/AccountLockedPage';

const withRouter = (Story: React.ComponentType) => (
  <>
    <Story />
  </>
);

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
  title: 'Pages/Login/FindAccount/AccountLockedModal',
  component: AccountLockedPage,
  decorators: [withRouter, withPlatform('web')],
} satisfies Meta<typeof AccountLockedPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile')],
  globals: { viewport: 'hoka375' },
};

export const ConfirmNavigation: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await within(canvasElement.ownerDocument.body).findByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/login/account-locked/verification');
  },
};

export const CloseNavigation: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await within(canvasElement.ownerDocument.body).findByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: '안내 닫기' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/login');
  },
};

export const EscapeNavigation: Story = {
  play: async ({ canvasElement }) => {
    await within(canvasElement.ownerDocument.body).findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    await expect(getRouter().push).toHaveBeenCalledWith('/login');
  },
};
