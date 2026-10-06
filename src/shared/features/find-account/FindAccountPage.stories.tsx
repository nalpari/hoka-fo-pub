import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { FindAccountPage } from './FindAccountPage';

const withPlatform = (platform: 'web' | 'mobile', width?: number) =>
  (Story: React.ComponentType) => (
    <MemoryRouter>
      <PlatformProvider platform={platform}>
        <div className={`platform-${platform}`} style={width ? { width } : undefined}>
          <Story />
        </div>
      </PlatformProvider>
    </MemoryRouter>
  );

const meta = {
  title: 'Pages/Auth/FindAccount',
  component: FindAccountPage,
  decorators: [withPlatform('web')],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FindAccountPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [withPlatform('mobile', 375)],
  globals: { viewport: 'hoka375' },
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
  },
};

export const MobileError: Story = {
  ...Mobile,
  name: 'Mobile Error',
  play: Error.play,
};
