import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SignupTermsPage.scenarios';

const meta = {
  ...base,
  title: 'PAGES/회원가입/3. 약관동의/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.Mobile, name: 'Default' };

export const Detail: Story = { ...scenarios.MobileDetail, name: '약관 상세' };

export const PreviousPicker: Story = { ...scenarios.MobilePreviousPicker, name: '이전 약관 선택' };

export const DetailInteraction: Story = {
  ...scenarios.MobileDetailInteraction,
  name: '약관 상세 확인',
};
