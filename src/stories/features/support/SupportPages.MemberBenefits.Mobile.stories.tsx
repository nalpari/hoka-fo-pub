import type { StoryObj } from '@storybook/react';
import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/5. 온라인 회원 등급 안내/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.MemberBenefitsMobile375, name: 'Default' };

export const Mileage: Story = { ...scenarios.MileageMobile375, name: '마일리지' };
