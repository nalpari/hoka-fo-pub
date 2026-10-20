import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/Signup/Signup/Web',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Default, name: 'Default' };

export const KakaoUnavailable: Story = { ...scenarios.KakaoUnavailable, name: 'Kakao Unavailable' };
