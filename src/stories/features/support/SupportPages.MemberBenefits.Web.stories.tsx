import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/5. 온라인 회원 등급 안내/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.MemberBenefitsDesktop, name: 'Default' };

export const Mileage: Story = { ...scenarios.MileageDesktop, name: '마일리지' };
