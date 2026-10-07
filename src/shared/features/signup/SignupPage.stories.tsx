import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { SignupPage } from './SignupPage';

const meta = {
  title: 'Pages/Auth/Join',
  component: SignupPage,
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';

      return (
        <MemoryRouter initialEntries={['/signup']}>
          <PlatformProvider platform={platform}>
            <div className={`platform-${platform}`}>
              <Story />
            </div>
          </PlatformProvider>
        </MemoryRouter>
      );
    },
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SignupPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const Terms: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '만 14세 이상 회원가입' }));
  },
};
