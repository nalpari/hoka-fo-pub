import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './PasswordResetCompleteModal.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/4. 비밀번호 재설정 완료/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };
