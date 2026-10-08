import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { PlatformProvider } from '@/shared/context/platform';
import { PasswordResetPage } from './PasswordResetPage';

const withPlatform =
  (platform: 'web' | 'mobile', width?: number) => (Story: React.ComponentType) => (
    <PlatformProvider platform={platform}>
      <div className={`platform-${platform}`} style={width ? { width } : undefined}>
        <Story />
      </div>
    </PlatformProvider>
  );

const withRouter = (Story: React.ComponentType) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

const meta = {
  title: 'Pages/AUTH/FindAccount/PasswordResetPage',
  component: PasswordResetPage,
  decorators: [withRouter],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PasswordResetPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  decorators: [withPlatform('mobile', 375)],
  globals: { viewport: 'hoka375' },
};

export const RequiredFieldsError: Story = {
  decorators: [withPlatform('web')],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
  },
};

export const ConfirmationMismatch: Story = {
  decorators: [withPlatform('web')],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 새로운 비밀번호'), 'Hoka1234567!');
    await userEvent.type(canvas.getByLabelText('* 비밀번호 재입력'), 'Hoka1234567?');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
  },
};

export const Complete: Story = {
  decorators: [withPlatform('web')],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 새로운 비밀번호'), 'Hoka1234567!');
    await userEvent.type(canvas.getByLabelText('* 비밀번호 재입력'), 'Hoka1234567!');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
  },
};

export const MobileError: Story = {
  decorators: [withPlatform('mobile', 375)],
  globals: { viewport: 'hoka375' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 새로운 비밀번호'), 'Hoka123!');
    await userEvent.type(canvas.getByLabelText('* 비밀번호 재입력'), 'Hoka456!');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
  },
};
