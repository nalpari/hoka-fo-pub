import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from '@/shared/components/layouts/AppLayout/AppLayout';
import { PlatformProvider } from '@/shared/context/platform';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';

const meta = {
  title: 'PAGES/공통/1. 404에러페이지',
  component: NotFoundPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';

      return (
        <PlatformProvider platform={platform}>
          <div
            className={`platform-${platform}`}
            style={{ width: platform === 'mobile' ? 375 : '100%', maxWidth: '100%' }}
          >
            <AppLayout cart={1}>
              <Story />
            </AppLayout>
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof NotFoundPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
