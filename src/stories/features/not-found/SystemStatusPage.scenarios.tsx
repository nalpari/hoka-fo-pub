import { type Meta, type StoryObj } from '@storybook/react';
import { AppLayout } from '@/context/ShopShell';
import { PlatformProvider } from '@/context/platform';
import { SystemStatusPage } from '@/components/not-found/SystemStatusPage';

const meta = {
  component: SystemStatusPage,
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/maintenance' } } },
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';

      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <AppLayout cart={1}>
              <Story />
            </AppLayout>
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof SystemStatusPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Maintenance: Story = {
  args: {
    status: 'maintenance',
    maintenance: { schedule: 'YYYY.MM.DD (요일) HH:MM–HH:MM (예정)', reason: '시스템 정기점검' },
  },
};

export const Unavailable: Story = { args: { status: 'unavailable' } };
