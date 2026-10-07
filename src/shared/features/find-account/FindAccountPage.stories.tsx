import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { FindAccountPage } from './FindAccountPage';

const withPlatform = (platform: 'web' | 'mobile', width?: number) =>
  (Story: React.ComponentType) => (
    <PlatformProvider platform={platform}>
      <div className={`platform-${platform}`} style={width ? { width } : undefined}>
        <Story />
      </div>
    </PlatformProvider>
  );

const meta = {
  title: 'Pages/AUTH/FindAccount',
  component: FindAccountPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <PlatformProvider platform="web">
          <div className="platform-web">
            <Story />
          </div>
        </PlatformProvider>
      </MemoryRouter>
    ),
  ],
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

export const CodeEntry: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 이름'), '홍길동');
    await userEvent.type(canvas.getByLabelText('* 휴대폰번호'), '01012345678');
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
  },
};

export const MobileError: Story = {
  ...Mobile,
  name: 'Mobile Error',
  play: Error.play,
};
