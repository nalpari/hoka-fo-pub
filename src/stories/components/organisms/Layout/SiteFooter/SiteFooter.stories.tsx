import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter } from '@/shared/components/organisms/Layout/SiteFooter/SiteFooter';
import { PlatformProvider } from '@/shared/context/platform';

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
