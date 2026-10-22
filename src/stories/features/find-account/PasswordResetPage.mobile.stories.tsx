import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PasswordResetPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/3. 비밀번호 재설정/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const RequiredFieldsError: Story = {
  ...scenarios.MobileRequiredFieldsError,
  name: '필수항목 오류',
};

export const Complete: Story = { ...scenarios.MobileComplete, name: '완료' };

export const Error: Story = { ...scenarios.MobileError, name: '오류' };
