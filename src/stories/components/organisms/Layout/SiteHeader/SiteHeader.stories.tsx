import type { Meta, StoryObj } from '@storybook/react';
import { SiteHeader } from '@/shared/components/organisms/Layout/SiteHeader/SiteHeader';
import { PlatformProvider } from '@/shared/context/platform';
import { expect, userEvent, within } from 'storybook/test';
import { megaMenus } from '@/shared/components/organisms/Layout/SiteHeader/megaMenu';

const meta = {
  title: 'Organisms/Layout/SiteHeader',
  component: SiteHeader,
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Web: Story = {
  args: { cart: 2, onMenu: () => undefined },
  render: (args) => (
    <div className="platform-web">
      <PlatformProvider platform="web">
        <SiteHeader {...args} />
      </PlatformProvider>
    </div>
  ),
};

export const Mobile: Story = {
  globals: { viewport: 'hoka375' },
  args: { cart: 2, onMenu: () => undefined },
  render: (args) => (
    <div className="platform-mobile">
      <PlatformProvider platform="mobile">
        <SiteHeader {...args} />
      </PlatformProvider>
    </div>
  ),
};

export const MenuComposition: Story = {
  ...Web,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: megaMenus[0].label });
    await userEvent.hover(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('region', { name: `${megaMenus[0].label} 메뉴` })).toBeVisible();
    await userEvent.unhover(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    trigger.focus();
    await userEvent.tab();
    await expect(canvas.getByRole('link', { name: 'Best' })).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(trigger).toHaveFocus();
  },
};
