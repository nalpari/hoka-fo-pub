import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './PasswordResetPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/3. 비밀번호 재설정/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const RequiredFieldsError: Story = {
  ...scenarios.RequiredFieldsError,
  name: '필수항목 오류',
};

export const ConfirmationMismatch: Story = {
  ...scenarios.ConfirmationMismatch,
  name: '비밀번호 확인 불일치',
};

export const Complete: Story = { ...scenarios.Complete, name: '완료' };
