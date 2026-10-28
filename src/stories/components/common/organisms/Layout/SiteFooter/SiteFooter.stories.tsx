import { type Meta, type StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';
import { SiteFooter } from '@/context/ShopShell';

const meta = {
  title: 'Organisms/Layout/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Web: Story = {
  render: () => (
    <div className="platform-web">
      <>
        <PlatformProvider platform="web">
          <SiteFooter />
        </PlatformProvider>
      </>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="platform-mobile">
      <>
        <PlatformProvider platform="mobile">
          <SiteFooter />
        </PlatformProvider>
      </>
    </div>
  ),
};
