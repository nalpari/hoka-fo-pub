import { expect, userEvent, within } from 'storybook/test';

import { AddressStatePreview } from '@/app/mypage/addresses/_components/AddressStatePreview';
import { RouteContent as CouponContent } from '@/app/mypage/coupons/_components/CouponManagement';
import { ProfileStatePreview } from '@/app/mypage/profile/_components/ProfileStatePreview';
import { ReviewStatePreview } from '@/app/mypage/reviews/_components/ReviewStatePreview';

import type { AuditStory as Story } from './shared';
export const Addresses: Story = {
  render: () => <AddressStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('#address-recipient') as HTMLInputElement;
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
export const Profile: Story = {
  render: () => <ProfileStatePreview errors />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('#profile-email') as HTMLInputElement;
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
export const Reviews: Story = {
  render: () => <ReviewStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement.ownerDocument.body).getByRole('textbox', {
      name: '리뷰 내용',
    });
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
export const Coupon: Story = {
  render: () => <CouponContent preview="error" />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: '쿠폰 일련번호' });
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
