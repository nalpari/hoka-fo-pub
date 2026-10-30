import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/context/ShopShell';

import { RouteContent } from '@/app/mypage/coupons/_components/CouponManagement';

type Args = { employee: boolean; platform: 'web' | 'mobile' };

const meta = {
  title: 'PAGES/마이페이지/6. 쿠폰/WEB',
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka1920' },
  args: { employee: false, platform: 'web' },
  render: ({ employee, platform }) => (
    <ShopShell platform={platform}>
      <RouteContent employee={employee} />
    </ShopShell>
  ),
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Coupons: Story = { name: 'Default' };

export const Employee: Story = { name: '임직원', args: { employee: true } };
