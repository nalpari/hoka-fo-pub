import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { LocalesPage } from '@/shared/features/locales/LocalesPage';

const meta = {
  title: 'Pages/Locales',
  component: LocalesPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Choose your shipping country' }),
    ).toBeVisible();
    await expect(canvas.getByRole('region', { name: 'Asia Pacific' })).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Australia' })).toHaveAttribute(
      'href',
      'https://au.hoka.com/',
    );
  },
} satisfies Meta<typeof LocalesPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
