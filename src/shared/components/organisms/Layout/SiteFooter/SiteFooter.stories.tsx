import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteFooter } from '@/shared/components/organisms/Layout/SiteFooter/SiteFooter';
import { PlatformProvider } from '@/shared/context/platform';

const meta = { title: 'Organisms/Layout/SiteFooter', component: SiteFooter } satisfies Meta<
  typeof SiteFooter
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Web: Story = {
  render: () => (
    <div className="platform-web">
      <MemoryRouter>
        <PlatformProvider platform="web">
          <SiteFooter />
        </PlatformProvider>
      </MemoryRouter>
    </div>
  ),
};

export const Mobile: Story = {
  render: () => (
    <div className="platform-mobile">
      <MemoryRouter>
        <PlatformProvider platform="mobile">
          <SiteFooter />
        </PlatformProvider>
      </MemoryRouter>
    </div>
  ),
};
