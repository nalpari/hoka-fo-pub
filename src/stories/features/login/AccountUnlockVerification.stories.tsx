import type { StoryObj } from '@storybook/react';
import base, * as scenarios from '@/stories/features/phone-verification/PhoneVerificationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/6. 계정 잠금 해제 인증/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.AccountUnlock, name: '계정 잠금 해제' };

export const Completion: Story = { ...scenarios.AccountUnlockCompletion, name: '인증 완료 흐름' };
