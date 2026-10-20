import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { PlatformProvider } from '@/shared/context/platform';
import { PasswordResetPage } from '@/shared/features/find-account/PasswordResetPage';

const withPlatform =
  (platform: 'web' | 'mobile', width?: number) => (Story: React.ComponentType) => (
    <PlatformProvider platform={platform}>
      <div className={`platform-${platform}`} style={width ? { width } : undefined}>
        <Story />
      </div>
    </PlatformProvider>
  );

const withRouter = (Story: React.ComponentType) => (
  <>
    <Story />
  </>
);

const meta = {
  title: 'Pages/Login/FindAccount/PasswordResetPage',
  tags: ['form-audit', 'password-policy'],
  component: PasswordResetPage,
  decorators: [withRouter],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PasswordResetPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { decorators: [withPlatform('web')] };

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile', 375)],
  globals: { viewport: 'hoka375' },
};

export const RequiredFieldsError: Story = {
  decorators: [withPlatform('web')],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
    await expect(canvas.getByLabelText('* 새로운 비밀번호')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await expect(canvas.getByLabelText('* 비밀번호 확인')).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getAllByRole('alert')).toHaveLength(2);
    await expect(canvas.getByLabelText('* 새로운 비밀번호')).toHaveAccessibleDescription(
      '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요',
    );
    await expect(canvas.getByLabelText('* 비밀번호 확인')).toHaveAccessibleDescription(
      '비밀번호를 다시 입력해 주세요.',
    );
    for (const message of canvas.getAllByRole('alert')) {
      await expect(message).toHaveStyle({ color: 'rgb(166, 0, 0)' });
    }
  },
};

export const ConfirmationMismatch: Story = {
  decorators: [withPlatform('web')],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 새로운 비밀번호'), 'Hoka1234567!');
    await userEvent.type(canvas.getByLabelText('* 비밀번호 확인'), 'Hoka1234567?');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent(
      '동일한 비밀번호가 입력되었는지 확인해주세요.',
    );
  },
};

export const Complete: Story = {
  decorators: [withPlatform('web')],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 새로운 비밀번호'), 'Hoka12345!');
    await userEvent.type(canvas.getByLabelText('* 비밀번호 확인'), 'Hoka12345!');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
    const dialog = within(canvasElement.ownerDocument.body).getByRole('dialog');
    await expect(dialog).toHaveTextContent('비밀번호 변경이 완료되었습니다.');
    await userEvent.click(within(dialog).getByRole('button', { name: '확인' }));
    await expect(getRouter().push).toHaveBeenCalledWith('/login');
  },
};

export const MobileRequiredFieldsError: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  play: RequiredFieldsError.play,
};

export const MobileComplete: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  play: Complete.play,
};

export const MobileError: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [withPlatform('mobile', 375)],
  globals: { viewport: 'hoka375' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('* 새로운 비밀번호'), 'Hoka123!');
    await expect(canvas.getByLabelText('* 비밀번호 확인')).not.toHaveAttribute(
      'aria-invalid',
      'true',
    );
    await userEvent.type(canvas.getByLabelText('* 비밀번호 확인'), 'Hoka456!');
    await userEvent.click(canvas.getByRole('button', { name: '비밀번호 변경' }));
    await expect(canvas.getAllByRole('alert')).toHaveLength(2);
  },
};
