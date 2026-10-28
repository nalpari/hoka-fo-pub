import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './SignupPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/0. 회원가입 안내/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const KakaoUnavailable: Story = {
  ...scenarios.KakaoUnavailable,
  parameters: scenarios.Mobile.parameters,
  name: '카카오 가입 안내',
};
