import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './MyPageDesign.scenarios';

const meta = {
  ...base,
  title: 'PAGES/마이페이지/7. 회원정보확인 및 수정/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Profile: Story = { ...scenarios.Profile, name: 'Default' };
