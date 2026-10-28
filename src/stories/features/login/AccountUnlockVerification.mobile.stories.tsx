import type { StoryObj } from '@storybook/react';

import base, * as scenarios from '@/stories/features/phone-verification/PhoneVerificationPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/로그인/6. 계정 잠금 해제 인증/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.MobileAccountUnlock, name: '계정 잠금 해제' };

export const Completion: Story = {
  ...scenarios.AccountUnlockCompletion,
  name: '인증 완료 흐름',
  decorators: scenarios.Mobile.decorators,
};
